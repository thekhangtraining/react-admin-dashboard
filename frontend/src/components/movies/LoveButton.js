import { Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

const LoveButton = ({ title, popularity }) => {
  return (
    <Tooltip
      radius={1}
      position="bottom"
      label="Give this movie a like"
      style={{ paddingX: "0.5rem" }}
      transition="fade"
      transitionDuration={300}
    >
      <div className="group">
        <button
          type="button"
          // Adhoc styling
          className="flex items-center rounded-sm px-1 py-0.5 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-pink-100 duration-500"
          // Show notification
          onClick={() =>
            showNotification({
              title: (
                <p className="flex items-center font-bold">
                  <BsFillHeartFill className="text-red-500 mr-1" />
                  You did enjoy the movie, right?
                </p>
              ),
              message: (
                <p className="text-zinc-700">
                  Thanks for liking the movie
                  <span className="ml-1 font-bold text-zinc-700">{title}</span>
                </p>
              ),
              styles: (theme) => ({
                root: {
                  backgroundColor: theme.colors.gray[1],
                  "&::before": { backgroundColor: theme.colors.red[5] },
                },
              }),
            })
          }
        >
          <BsFillHeartFill className="text-red-500" />
          <p className="text-sm ml-1 text-white">{Math.round(popularity)}</p>
        </button>
      </div>
    </Tooltip>
  );
};

export default LoveButton;
