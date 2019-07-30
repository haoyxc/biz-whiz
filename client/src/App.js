import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Articles from "./components/Articles";

import logo from "./newslogo.png";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main-container">
        <img src={logo} alt="" className="logoImg" />
        <h3 class="main-title">The news</h3>
        <Articles />
      </div>
    </ApolloProvider>
  );
}

export default App;
