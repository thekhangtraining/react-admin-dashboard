import { showNotification } from "@mantine/notifications";
import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

const LoveButton = ({ title, popularity }) => {
  return (
    <div className="group">
      <button
        type="button"
        // Adhoc styling
        className="flex items-center px-1 py-0.5 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-pink-100 duration-500"
        // Show notification
        onClick={() =>
          showNotification({
            title: (
              <div className="flex items-center">
                <BsFillHeartFill className="text-red-500" />
                <p className="ml-2">You did enjoy the movie, right?</p>
              </div>
            ),
            message: `Thanks for loving the movie ${title}.`,
          })
        }
      >
        <BsFillHeartFill className="text-red-500" />
        <p className="text-sm ml-1 text-white">{Math.round(popularity)}</p>
      </button>
    </div>
  );
};

export default LoveButton;
