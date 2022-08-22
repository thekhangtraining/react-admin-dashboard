import React from "react";
import { MdLocalMovies } from "react-icons/md";

const WatchButton = () => {
  return (
    <div className="w-full">
      <button
        type="button"
        className="flex justify-center w-full rounded items-center px-2 bg-sky-500"
      >
        <MdLocalMovies className="text-black mx-1" />
        <p className="font-medium truncate text-black">
          Watch Options
        </p>
      </button>
    </div>
  );
};

export default WatchButton;
