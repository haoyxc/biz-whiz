const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema.js");
const cors = require("cors");

const NewsAPI = require("newsapi");
// const newsapi = new NewsAPI('39b2b9fe2f9e401ab0214c340938de85');
const newsapi = process.env.NEWSAPI_KEY;

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
