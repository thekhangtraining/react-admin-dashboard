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
        "linear-gradient(to right, rgba(4, 120, 87, 0.3), rgba(126, 34, 206, 0.3))",
      zIndex: 30,
    },
  };
  Modal.setAppElement("#root");

  return (
    <div className="flex flex-col bg-zinc-900 w-full h-full">
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
      <button className="" onClick={() => setModalIsOpen(true)}>
        <img
          className="object-contain h-full"
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt=""
        />
      </button>

      <div className="p-2 flex flex-col justify-between overflow-hidden text-slate-200 h-full">
        <button
          onClick={() => setModalIsOpen(true)}
          className="flex flex-col text-left"
        >
          <h2 className="font-medium text-sm md:text-lg line-clamp-3 text-amber-400">
            {movieTitle}
          </h2>
          <p className="text-xs md:text-sm line-clamp-3">{overview}</p>
        </button>
        <div className="flex flex-start items-start space-x-1.5 mt-2">
          {genres.slice(0, 2).map((item) => (
            <span
              key={item}
              className="text-xs text-black md:text-sm font-medium bg-slate-100 rounded-sm truncate text-center px-2 border border-slate-200"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-col mt-2 mb-0.5 items-center space-y-2 h-full justify-end">
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
  );
};

export default MovieCard;
