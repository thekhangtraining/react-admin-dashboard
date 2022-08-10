import React from "react";
import { IoMdPlay } from "react-icons/io";

const PlayButton = () => {
  return (
    <div className="group">
      <button
        type="button"
        // Adhoc styling
        className="flex h-full items-center px-2 py-0.5 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-green-100 duration-500"
      >
        <IoMdPlay className="text-emerald-400 icon" />
      </button>
    </div>
  );
};

export default PlayButton;
