import React from "react";

const HeroCard = ({ icon, title, description }) => {
  return (
    <div className="bg-skin-fill bg-opacity-70 text-2xs rounded-sm px-1 py-2 md:px-2 w-28 sm:w-32 md:w-44 flex flex-col items-center">
      <div className="text-skin-strong">{icon}</div>{" "}
      <h3 className="uppercase text-skin-primary font-bold sm:text-xs mt-1">
        {title}
      </h3>
      <div className="text-center text-skin-strong sm:text-xs">{description}</div>
    </div>
  );
};

export default HeroCard;
