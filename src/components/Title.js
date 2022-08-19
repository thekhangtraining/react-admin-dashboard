import React from "react";

const Title = ({ surtitle, title }) => {
  return (
    <div className="flex flex-col text-slate-50 font-bold">
      <h2 className="capitalize text-sm">{surtitle}</h2>
      <h1 className="truncate text-2xl mb-2 text-emerald-500 font-[Poppins]">
        {title}
      </h1>
    </div>
  );
};

export default Title;
