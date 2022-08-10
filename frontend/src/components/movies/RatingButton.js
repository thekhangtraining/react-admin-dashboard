import { showNotification } from "@mantine/notifications";
import React from "react";
import { BsStarFill } from "react-icons/bs";

const RatingButton = ({ title, voteAvg }) => {
  return (
    <div className="group">
      <button
        type="button"
        // Adhoc styling
        className="flex items-center px-1 py-0.5 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-yellow-100 duration-500"
        // Show notification
        onClick={() =>
          showNotification({
            title: (
              <div className="flex items-center">
                <BsStarFill className="text-yellow-400" />
                <p className="ml-2">That was kind of you!</p>
              </div>
            ),
            message: `Thanks for rating the movie ${title}.`,
          })
        }
      >
        <BsStarFill className="text-yellow-400" />
        <p className="text-sm ml-1 text-white">
          {Math.round(voteAvg * 10) / 10}
        </p>
      </button>
    </div>
  );
};

export default RatingButton;
