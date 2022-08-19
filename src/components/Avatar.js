import React from "react";

const Avatar = ({ round }) => {
  return (
    <img
      src="https://avatars.githubusercontent.com/u/96162182?v=4"
      alt="The-Khang Nguyen"
      className={`h-8 border-[1px] shrink-0 border-gray-200 bg-gray-200 ${
        round ? "rounded-full" : "rounded-sm"
      }`}
    />
  );
};

export default Avatar;
