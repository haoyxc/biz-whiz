import React from "react";

export default function ArticleItem({ article }) {
  return (
    <div className="article">
      <h5 className="articleTitle">{article.title}</h5>

      <p className="artcleDescription">{article.description}</p>
      <div className="articleDetails">
        <p className="articleDate">{article.publishedAt.substring(0, 10)}</p>
        <p className="articleContent">{article.content}</p>
        <a href={article.url} className="articleUrl" target="_blank">
          {article.source.name}'s entire article
        </a>
      </div>
    </div>
  );
}
