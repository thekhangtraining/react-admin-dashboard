import React from "react";
import { BsStarFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RatingButton = ({ movieId, movieTitle, voteAvg }) => {
  const RatingNoti = () => (
    <div className="text-skin-strong">
      Thanks for rating the movie{" "}
      <span className="text-[rgb(4,120,87)]">{movieTitle}</span>
    </div>
  );

  const notify = () =>
    toast(RatingNoti, {
      icon: <BsStarFill className="text-yellow-400" size="30px" />,
      toastId: `toast-rating-${movieId}`,
    });

  return (
    <div className="group">
      <button
        type="button"
        // Adhoc styling
        className="flex items-center rounded px-1 md:py-0.5 border border-slate-500 hover:border-black group-hover:[&>p]:text-black group-hover:bg-yellow-100"
        // Show notification
        onClick={notify}
      >
        <BsStarFill className="text-yellow-400" />
        <p className="ml-1 truncate">{Math.round(voteAvg * 10) / 10}</p>
      </button>
    </div>
  );
};

export default RatingButton;
