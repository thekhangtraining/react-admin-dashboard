import { Badge } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { BsFillHeartFill, BsStarFill } from "react-icons/bs";
import { IoMdPlay } from "react-icons/io";
import { moviesGenres } from "../../data/data";

const MoviesCard = ({
  id,
  title,
  posterPath,
  backdropPath,
  popularity,
  voteAvg,
  voteCount,
  genreIds,
  releaseYear,
}) => {
  const { hovered, ref } = useHover();
  const visibleLabel =
    "visible absolute my-2 gap-x-0.5 gap-y-1 w-48 flex flex-wrap justify-center z-0";
  const invisibleLabel =
    "invisible absolute my-2 gap-x-0.5 gap-y-1 w-48 flex flex-wrap justify-center z-0";

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
      className="flex flex-col overflow-hidden h-90 w-48 m-1.5 bg-zinc-200 shadow-[6px_2px_6px_rgba(0,0,0,0.95)] hover:scale-110 hover:border-8 hover:shadow-none duration-500 hover:z-10 "
    >
      {/* Badge over movies card */}
      <div className={hovered ? invisibleLabel : visibleLabel}>
        {genres.map((item) => (
          <Badge
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 40 }}
            radius="2"
            size="sm"
            key={`badge-${id}-${item}`}
            style={{ fontFamily: "Roboto" }}
          >
            {item}
          </Badge>
        ))}
      </div>
      {/* Movies poster and title */}
      <button type="button">
        <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="" />
      </button>
      <div className="flex flex-col py-1 px-2 justify-between h-full bg-gray-900">
        {/* Movies title */}
        <span className="truncate mt-1 text-center uppercase text-blue-200">
          {title}
        </span>
        <div className="flex my-2 bottom-0 justify-between">
          {/* Popularity */}
          {/* Group hover */}
          <div className="group">
            <button
              type="button"
              // Adhoc styling
              className="flex items-center px-1 py-0.5 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-pink-100 duration-500"
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
              <p className="text-sm ml-1 text-white">
                {Math.round(popularity)}
              </p>
            </button>
          </div>
          {/* Rating */}
          {/* Group hover */}
          <div className="group">
            <button
              type="button"
              // Adhoc styling
              className="flex items-center px-1 py-0.5 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-yellow-100 duration-500"
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
          {/* Play button */}
          {/* Group hover */}
          <div className="group">
            <button
              type="button"
              // Adhoc styling
              className="flex h-full items-center px-2 py-0.5 border hover:border-black group-hover:[&>p]:text-black group-hover:bg-green-100 duration-500"
            >
              <IoMdPlay className="text-emerald-400 icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
