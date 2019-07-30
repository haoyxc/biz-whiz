import React, { useState } from "react";

export default function Searchbar({ handleQuery, handleSubmit }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <div>
        <button type="button">Default</button>
      </div>
      <input type="text" name="" id="" value={query} onChange={handleQuery} />
      <button type="button" onSubmit={handleSubmit}>
        Search
      </button>
    </div>
  );
}
