import React, { useState, useEffect, Component } from "react";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Articles from "./components/Articles";
import Searchbar from "./components/Searchbar";

import logo from "./newslogo.png";
import "./App.css";

const client = new ApolloClient({
  uri: "/graphql"
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
      searchInput: "",
      variables: {}
    };
  }

  handleQuery(e) {
    this.setState({
      searchInput: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchInput === "") {
      return;
    }
    this.setState({
      articlesQuery: EVERYTHING_QUERY,
      variables: {
        query: this.state.searchInput
      },
      searchInput: ""
    });
  }

  handleDefault(e) {
    e.preventDefault();
    this.setState({
      articlesQuery: US_BUSINESS_QUERY,
      variables: {}
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main-container">
          <img src={logo} alt="" className="logoImg" />
          {/* <h3 class="main-title">The news</h3> */}
          <Searchbar
            value={this.state.searchInput}
            handleQuery={this.handleQuery.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            handleDefault={this.handleDefault.bind(this)}
          />
          <Articles query={this.state.articlesQuery} variables={this.state.variables} />
          {/* <Articles query={EVERYTHING_QUERY} variables={{ query: "blockchain" }} /> */}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
