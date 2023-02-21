import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SignIn from "./pages/signIn";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

function App() {
  return (
    <ApolloProvider client={client}>
      <SignIn />
    </ApolloProvider>
  );
}

root.render(<App />);
