import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoveButton = ({ movieId, movieTitle, popularity }) => {
  const LoveNoti = () => (
    <div className="text-slate-400">
      I'm glad that you enjoyed the movie{" "}
      <span className="text-[rgb(4,120,87)]">{movieTitle}</span>
    </div>
  );

  const notify = () => {
    toast(LoveNoti, {
      toastId: `toast-love-${movieId}`,
      icon: <BsFillHeartFill className="text-red-500" size="30px" />,
    });
  };

  return (
    <div className="group">
      <button
        data-tip
        data-for="love-tooltip"
        type="button"
        // Adhoc styling
        className="flex items-center rounded px-1 md:py-0.5 border border-slate-200 hover:border-black group-hover:[&>p]:text-black group-hover:bg-pink-100"
        // Show notification
        onClick={notify}
      >
        <BsFillHeartFill className="text-red-500" />
        <p className="ml-1 truncate">{Math.round(popularity)}</p>
      </button>
    </div>
  );
};

export default LoveButton;
