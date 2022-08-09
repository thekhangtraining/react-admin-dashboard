import { Badge } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React from "react";
import { BsFillHeartFill, BsStarFill } from "react-icons/bs";
import { moviesGenres } from "../../data/data";

const MoviesCard = ({
  title,
  posterPath,
  backdropPath,
  popularity,
  voteAvg,
  voteCount,
  genreIds,
}) => {
  const { hovered, ref } = useHover();
  const visibleLabel =
    "visible absolute my-2 gap-x-0.5 gap-y-1 w-56 flex flex-wrap justify-center z-0";
  const invisibleLabel =
    "invisible absolute my-2 gap-x-0.5 gap-y-1 w-56 flex flex-wrap justify-center z-0";

  var genres = [];
  for (let i = 0; i < genreIds.length; i++) {
    for (let j = 0; j < moviesGenres.length; j++) {
      if (genreIds[i] === moviesGenres[j].id) {
        genres.push(moviesGenres[j].name);
      }
    }
  }

  return (
    <div
      ref={ref}
      className="flex flex-col overflow-hidden w-56 m-2 bg-zinc-200 shadow-lg hover:scale-110 hover:border-cyan-700 hover:border-2 duration-500 hover:z-10"
    >
      {/* Badge over movies card */}
      <div className={hovered ? invisibleLabel : visibleLabel}>
        {genres.map((item) => (
          <Badge
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 40 }}
            radius="xs"
            size="md"
            className="ml-0.5"
            key={item}
          >
            {item}
          </Badge>
        ))}
      </div>
      {/* Movies poster and title */}
      <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="" />
      <div className="flex flex-col p-1 justify-between h-full bg-gray-900">
        <span className="break-normal mt-1 uppercase text-center text-slate-200">
          {title}
        </span>
        <div className="flex my-2 bottom-0 justify-around">
          {/* Group hover */}
          <div className="group">
            <button
              type="button"
              // Adhoc styling
              className="flex items-center px-2 py-1 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-white duration-500"
            >
              <BsFillHeartFill className="text-red-500" />
              <p className="text-sm ml-1 font-bold text-white">
                {Math.round(popularity)}
              </p>
            </button>
          </div>
          {/* Group hover */}
          <div className="group">
            <button
              type="button"
              // Adhoc styling
              className="flex items-center px-2 py-1 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-white duration-500"
            >
              <BsStarFill className="text-yellow-400" />
              <p className="text-sm ml-1 font-bold text-white">
                {Math.round(voteAvg * 10) / 10}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
