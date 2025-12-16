import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schema/index.js";
import { getUserFromToken } from "./auth/auth.js"; // your JWT auth logic

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function startServer() {
  const app = express();

  // Create Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Middleware for GraphQL endpoint
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Extract user from JWT token
        const user = getUserFromToken(req.headers.authorization);
        console.log("Authenticated User:", user);
        return { user };
      },
    })
  );

  // Path to React build folder
  const reactBuildPath = path.join(__dirname, "../../ems-client/build");

  // Serve React frontend build
  app.use(express.static(reactBuildPath));

  // Fallback to index.html for React routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(reactBuildPath,"index.html"));
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 App running at http://localhost:${PORT}`);
  });
}

// startServer();