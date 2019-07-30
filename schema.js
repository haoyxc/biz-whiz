const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);

const SourceType = new GraphQLObjectType({
  name: "Source",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});
const NewsArticleType = new GraphQLObjectType({
  name: "NewsArticle",
  fields: {
    source: {
      type: SourceType
    },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    url: { type: GraphQLString },
    publishedAt: { type: GraphQLString },
    content: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    articles: {
      type: new GraphQLList(NewsArticleType),
      async resolve(parent, args) {
        try {
          let resp = await newsapi.v2.topHeadlines({
            //   sources: "bbc-news,the-verge",
            //   q: "bitcoin",
            category: "business",
            language: "en",
            country: "us"
          });
          console.log(resp);
          return resp.articles;
        } catch (e) {
          console.log(e);
        }
      }
    },
    articlesByQuery: {
      type: new GraphQLList(NewsArticleType),
      args: {
        query: { type: GraphQLString }
      },
      async resolve(parent, args) {
        try {
          let resp = await newsapi.v2.everything({
            q: `${args.query}`,
            // sources: "bbc-news,the-verge",
            // domains: "bbc.co.uk, techcrunch.com",
            // from: "2017-12-01",
            // to: "2017-12-12",
            language: "en",
            sortBy: "relevancy"
          });
          return resp.articles;
        } catch (e) {
          console.log(e);
        }
      }
    },
    articlesByCategory: {
      type: new GraphQLList(NewsArticleType),
      args: {
        category: { type: GraphQLString }
      },
      async resolve(parent, args) {
        try {
          let resp = await newsapi.v2.topHeadlines({
            //   sources: "bbc-news,the-verge",
            //   q: "bitcoin",
            category: `${args.category}`,
            language: "en",
            country: "us"
          });
          console.log(resp);
          return resp.articles;
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
