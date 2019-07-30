import React, { useState, useEffect, Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Articles from "./components/Articles";
import Searchbar from "./components/Searchbar";

import logo from "./newslogo.png";
import "./App.css";

const { GraphQLString } = require("graphql");

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const US_BUSINESS_QUERY = gql`
  query businessArticlesQuery {
    articles {
      title
      description
      content
      publishedAt
      url
      source {
        name
      }
    }
  }
`;

const EVERYTHING_QUERY = gql`
  query everythingQuery($query: String) {
    articlesByQuery(query: $query) {
      title
      description
      content
      publishedAt
      url
      source {
        name
      }
    }
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesQuery: US_BUSINESS_QUERY,
      searchInput: ""
    };
  }

  handleQuery(e) {
    this.setState({
      searchInput: e.target.value
    });
    console.log("SEARCH", this.state.searchInput);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      articlesQuery: EVERYTHING_QUERY
    });
    console.log("SUBMIT", this.state.articlesQuery);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main-container">
          <img src={logo} alt="" className="logoImg" />
          <h3 class="main-title">The news</h3>
          <Searchbar
            handleQuery={this.handleQuery.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
          />
          <Articles query={US_BUSINESS_QUERY} />
          {/* <Articles query={EVERYTHING_QUERY} variables={{ query: "blockchain" }} /> */}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
