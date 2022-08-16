import React, { useState } from "react";
import Modal from "react-modal";
import { LoveButton, PlayButton, RatingButton } from ".";
import { moviesGenres } from "../../data/data";

const MovieCard = ({
  movieId,
  movieTitle,
  posterPath,
  backdropPath,
  overview,
  popularity,
  voteAvg,
  voteCount,
  genreIds,
  releaseYear,
}) => {
  var genres = [];
  for (let i = 0; i < genreIds.length; i++) {
    for (let j = 0; j < moviesGenres.length; j++) {
      if (genreIds[i] === moviesGenres[j].id) {
        genres.push(moviesGenres[j].name);
      }
    }
  }
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "2rem",
      background: "#f4f4f5",
    },
    overlay: {
      background:
        "linear-gradient(to right, rgba(4, 120, 87, 0.5), rgba(126, 34, 206, 0.5))",
    },
  };
  Modal.setAppElement("#root");

  return (
    <div className="col-span-full sm:col-span-6 2xl:col-span-4 rounded drop-shadow-xl">
      <div className="grid grid-cols-5 bg-zinc-50">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={modalStyle}
          contentLabel="Example Modal"
        >
          <h2 className="text-sm sm:text-md 2xl:text-lg text-slate-400">
            Viewing
            <span className="text-emerald-600 font-medium"> {movieTitle} </span>
            information
          </h2>
        </Modal>
        <button
          className="col-span-2 shrink-0"
          onClick={() => setModalIsOpen(true)}
        >
          <img
            className="shrink-0"
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt=""
          />
        </button>

        <div className="col-span-3 p-2 flex flex-col overflow-hidden">
          <button
            onClick={() => setModalIsOpen(true)}
            className="flex flex-col text-left"
          >
            {/* Movie title */}
            <h2 className="font-medium text-sm md:text-lg line-clamp-1">
              {movieTitle}
            </h2>
            <p className="text-xs md:text-sm line-clamp-3 text-slate-500">
              {overview}
            </p>
          </button>
          <div className="flex flex-start items-start space-x-1.5 mt-2">
            {genres.slice(0, 2).map((item) => (
              <span
                key={item}
                className="text-xs md:text-sm font-medium rounded bg-slate-100 rounded-sm truncate text-center px-2 border border-slate-600"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col mt-2 mb-0.5 bottom-0 justify-end items-center grow space-y-2">
            <div className="flex justify-end space-x-2 w-full text-xs md:text-sm">
              <LoveButton
                movieId={movieId}
                movieTitle={movieTitle}
                popularity={popularity}
              />
              <RatingButton
                movieId={movieId}
                movieTitle={movieTitle}
                voteAvg={voteAvg}
              />
            </div>
            <PlayButton
              movieTitle={movieTitle}
              movieId={movieId}
              posterPath={posterPath}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
