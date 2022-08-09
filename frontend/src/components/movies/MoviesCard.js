import React from "react";
import { BsFillHeartFill, BsStarFill } from "react-icons/bs";

const MoviesCard = ({
  title,
  posterPath,
  backdropPath,
  popularity,
  voteAvg,
  voteCount,
}) => {
  return (
    <div className="flex flex-col w-56 m-3 bg-zinc-200 rounded-md shadow-lg hover:scale-105 hover:border-gray-700 hover:border-4 duration-300">
      <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="" />
      <div className="flex flex-col p-2 justify-between h-full bg-gray-900">
        <span className="break-normal mt-2 uppercase text-center text-slate-200">
          {title}
        </span>
        <div className="flex my-2 bottom-0 justify-around">
          <div className="flex items-center rounded-md px-2 py-1 border">
            <BsFillHeartFill className="text-red-500" />
            <p className="text-sm ml-1 font-bold text-white">
              {Math.round(popularity)}
            </p>
          </div>
          <div className="flex items-center rounded-md px-2 py-1 border">
            <BsStarFill className="text-amber-300" />
            <p className="text-sm ml-1 font-bold text-white">
              {Math.round(voteAvg * 10) / 10}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
