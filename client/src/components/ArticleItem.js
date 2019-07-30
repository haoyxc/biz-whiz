import React from "react";

export default function ArticleItem({ article }) {
  return (
    <div className="article">
      <h5>{article.title}</h5>
      <p>{article.description}</p>
      <a href="{article.url}">More info here</a>
    </div>
  );
}
