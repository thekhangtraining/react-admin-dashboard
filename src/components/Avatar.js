import React from "react";

const Avatar = ({ isRound }) => {
  const avatar = isRound
    ? "rounded-full h-10 border-[1px] border-slate-100 bg-slate-100"
    : "rounded-sm h-10 border-[1px] border-slate-100 bg-slate-100";
  return (
    <img
      src="https://avatars.githubusercontent.com/u/96162182?v=4"
      alt="The-Khang Nguyen"
      className={avatar}
    />
  );
};

export default Avatar;
