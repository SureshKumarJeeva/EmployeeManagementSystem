import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ems-secret-key";
const JWT_EXPIRES_IN = "1h";

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function getUserFromToken(authHeader) {
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");

  try {
    const token = authHeader.replace("Bearer ", "");
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
//   // DEV MODE: allow dummy tokens
//   if (token === "dummy-admin-token") {
//     return {
//       id: "1",
//       role: "admin",
//       name: "Dev Admin",
//     };
//   }

//   if (token === "dummy-employee-token") {
//     return {
//       id: "2",
//       role: "employee",
//       name: "Dev Employee",
//     };
//   }

//   try {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     console.error("JWT verify failed:", err.message);
//     return null;
//   }
}