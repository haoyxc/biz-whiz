import React, { useState } from "react";

export default function Searchbar({ value, handleQuery, handleSubmit, handleDefault }) {
  return (
    <div>
      <div className="btn-container">
        <button type="button" onClick={handleDefault} className="defaultNewsBtn">
          US Business News
        </button>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          defaultValue="Search for something..."
          value={value}
          onChange={handleQuery}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </div>
  );
}
