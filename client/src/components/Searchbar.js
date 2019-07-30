import React, { useState } from "react";

export default function Searchbar({ value, handleQuery, handleSubmit, handleDefault }) {
  return (
    <div>
      <button type="button" onClick={handleDefault}>
        Default
      </button>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="" id="" value={value} onChange={handleQuery} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
