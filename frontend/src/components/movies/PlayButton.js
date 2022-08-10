import { Tooltip } from "@mantine/core";
import React from "react";
import { IoMdPlay } from "react-icons/io";

const PlayButton = () => {
  return (
    <Tooltip
      radius={1}
      position="bottom"
      label="Watch this movie"
      style={{ paddingX: "0.5rem" }}
      transition="fade"
      transitionDuration={300}
    >
      <div className="group">
        <button
          type="button"
          // Adhoc styling
          className="flex h-full rounded-sm items-center px-2 py-0.5 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-green-100 duration-500"
        >
          <IoMdPlay className="text-emerald-400 icon" />
        </button>
      </div>
    </Tooltip>
  );
};

export default PlayButton;
