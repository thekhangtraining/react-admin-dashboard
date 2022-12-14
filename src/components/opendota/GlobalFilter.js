import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <input
      className="bg-skin-fill-1 mb-1 py-1 px-2 w-1/2 md:w-1/3 lg:w-1/4 outline-0"
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder="Search any column..."
    />
  );
};

export default GlobalFilter;
