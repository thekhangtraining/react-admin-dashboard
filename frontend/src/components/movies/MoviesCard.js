import { Badge, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React from "react";
import { moviesGenres } from "../../data/data";
import { LoveButton, RatingButton, PlayButton } from "./";

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
      className="flex flex-col overflow-hidden rounded-sm h-90 w-48 m-1.5 bg-zinc-200 hover:shadow-[6px_2px_6px_rgba(0,0,0,0.95)] duration-500 hover:z-10 "
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
            style={{ fontFamily: "Poppins" }}
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
        <Tooltip
          radius={1}
          position="top"
          label={title}
          style={{ paddingX: "0.5rem" }}
        >
          <span className="truncate mt-1 text-center text-blue-200">
            {title}
          </span>
        </Tooltip>

        <div className="flex my-2 bottom-0 justify-between">
          <LoveButton title={title} popularity={popularity} />
          <RatingButton title={title} voteAvg={voteAvg} />
          <PlayButton />
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
