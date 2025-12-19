import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSessionItemWithExpiry, getLocalStorageItemWithExpiry } from "./Utils/Session";

const httpLink = new HttpLink ({
  uri: "http://localhost:4000/graphql", // IMPORTANT: same server, proxy through Express
});

const authLink = setContext((_, { headers }) => {
  const token = getLocalStorageItemWithExpiry("token") || getSessionItemWithExpiry("token")
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