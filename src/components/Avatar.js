import React from "react";

const Avatar = ({ round }) => {
  return (
    <img
      src="https://avatars.githubusercontent.com/u/96162182?v=4"
      alt="The-Khang Nguyen"
      className={`h-10 w-10 p-0.5 shrink-0 border-border-base bg-skin-fill-1 ${
        round ? "rounded-full" : "rounded-sm"
      }`}
    />
  );
};

export default Avatar;
