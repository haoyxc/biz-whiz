import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ArticleItem from "./ArticleItem";

export default class Articles extends Component {
  render() {
    return (
      <div>
        <h5 className="articles-subtitle">Relevant Articles</h5>
        <Query query={this.props.query} variables={this.props.variables}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <h4>
                  <i class="fa fa-sync fa-spin" />
                  Loading...
                </h4>
              );
            }
            if (error) console.log(error);
            // console.log(data);
            // console.log(data.articles);
            return (
              <Fragment>
                {data[Object.keys(data)[0]].map(article => {
                  return <ArticleItem article={article} />;
                })}
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}
