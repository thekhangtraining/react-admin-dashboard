import { Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { BsStarFill } from "react-icons/bs";

const RatingButton = ({ title, voteAvg }) => {
  return (
    <Tooltip
      radius={1}
      position="bottom"
      label="Rate this movie"
      style={{ paddingX: "0.5rem" }}
      transition="fade"
      transitionDuration={300}
    >
      <div className="group">
        <button
          type="button"
          // Adhoc styling
          className="flex items-center rounded-sm px-1 py-0.5 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-yellow-100 duration-500"
          // Show notification
          onClick={() =>
            showNotification({
              title: (
                <p className="flex items-center font-bold">
                  <BsStarFill className="text-yellow-400 mr-1" />
                  That was kind of you!
                </p>
              ),
              message: (
                <p className="text-zinc-700">
                  Thanks for rating the movie
                  <span className="ml-1 font-bold text-zinc-700">{title}</span>
                </p>
              ),
            })
          }
        >
          <BsStarFill className="text-yellow-400" />
          <p className="text-sm ml-1 text-white">
            {Math.round(voteAvg * 10) / 10}
          </p>
        </button>
      </div>
    </Tooltip>
  );
};

export default RatingButton;
