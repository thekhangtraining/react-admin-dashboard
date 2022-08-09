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
  const visibleLabel = "visible absolute my-1 ml-0.5";
  const invisibleLabel = "invisible absolute my-1 ml-0.5";

  var genres = [];
  for (let i = 0; i < genreIds.length; i++) {
    for (let j = 0; j < moviesGenres.length; j++) {
      if (genreIds[i] === moviesGenres[j].id) {
        genres.push(moviesGenres[j].name);
      }
    }
  }
  console.log(genres);

  return (
    <div
      ref={ref}
      className="flex flex-col rounded-sm overflow-hidden w-56 m-3 bg-zinc-200 shadow-lg hover:scale-105 hover:border-cyan-700 hover:border-2 duration-150"
    >
      {/* Badge over movies card */}
      <div className={hovered ? visibleLabel : invisibleLabel}>
        {genres.map((item) => (
          <Badge
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 40 }}
            radius="xs"
            size="md"
            className="ml-0.5"
          >
            {item}
          </Badge>
        ))}
      </div>
      <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="" />
      <div className="flex flex-col p-2 justify-between h-full bg-gray-900">
        <span className="break-normal mt-2 uppercase text-center text-slate-200">
          {title}
        </span>
        <div className="flex my-2 bottom-0 justify-around">
          <div className="flex items-center rounded-sm px-2 py-1 border">
            <BsFillHeartFill className="text-red-500" />
            <p className="text-sm ml-1 font-bold text-white">
              {Math.round(popularity)}
            </p>
          </div>
          <div className="flex items-center rounded-sm px-2 py-1 border">
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
