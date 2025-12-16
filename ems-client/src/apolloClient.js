import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink ({
  uri: "https://ems-backend-x7gp.onrender.com/graphql", // IMPORTANT: same server, proxy through Express
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token"); // or hardcode for now
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;