import React from "react";

const HeroCard = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-900/50 text-2xs rounded px-1 py-2 md:px-2 w-36 sm:w-40 md:w-52 flex flex-col items-center">
      <div>{icon}</div>{" "}
      <h3 className="uppercase text-sky-500 font-bold sm:text-xs md:text-sm mt-1">
        {title}
      </h3>
      <div className="text-center sm:text-xs md:text-sm">{description}</div>
    </div>
  );
};

export default HeroCard;
