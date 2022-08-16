import React from "react";

const Title = ({ surtitle, title }) => {
  return (
    <div className="flex items-center text-slate-50 font-bold">
      <h2 className="capitalize">{surtitle} > </h2>
      <h1 className="truncate text-2xl pl-1 mb-2 text-emerald-500">
        {title}
      </h1>
    </div>
  );
};

export default Title;
