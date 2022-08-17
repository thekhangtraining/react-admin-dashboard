import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillHeartFill, BsStarFill } from "react-icons/bs";
import Modal from "react-modal";
import { LoveButton, PlayButton, RatingButton } from ".";
import configs from "../../configs.json";
import { moviesGenres } from "../../data/data";
import { IoCloseSharp } from "react-icons/io5";

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
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "1rem",
      background: "rgba(0, 0, 0, 0.6)",
      borderColor: "rgba(0, 0, 0, 0.6)",
      width: "100%",
      maxHeight: "100vh",
      overflowY: "auto",
    },
    overlay: {
      background: "rgba(24, 24, 27, 0.7)",
      zIndex: 30,
    },
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        params: {
          api_key: configs.apiKeyTMDB,
        },
      })
      .then((response) => {
        setCast(response.data.cast);
        setDirector(
          response.data.crew.filter((member) => member.job === "Director")
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  Modal.setAppElement("#root");

  return (
    <div className="flex flex-col bg-zinc-900 w-full h-full">
      {/* The modal for the movie card */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyle}
        contentLabel="Example Modal"
        // Prevent body swiping when modal is open
        onAfterOpen={() => (document.body.style.overflow = "hidden")}
        onAfterClose={() => (document.body.style.overflow = "unset")}
      >
        <div className="flex justify-end mt-8 lg:mt-2">
          <button
            onClick={() => setModalIsOpen(!modalIsOpen)}
            className="text-white hover:text-emerald-400"
          >
            <IoCloseSharp />
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          {/* Modal title */}
          <h2 className="text-emerald-400 font-medium md:text-xl">
            {movieTitle}
          </h2>
          {/* Modal backdrop */}
          <div className="flex flex-col space-y-2 text-slate-200 md:flex-row justify-center items-center ">
            <img
              src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
              alt=""
            />
            <div className="flex flex-start items-start space-x-1 mt-2 justify-center">
              {genres.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="text-xs text-white px-1 font-medium md:text-sm rounded truncate text-center border border-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 w-full border-y border-slate-500 p-2">
              <div className="col-span-1 flex flex-col items-center">
                <h3 className="uppercase text-sm tracking-tight font-bold text-amber-400">
                  Rating
                </h3>
                <div className="flex items-center space-x-1">
                  <div className="text-xl text-amber-400">
                    <BsStarFill />
                  </div>
                  <div className="flex flex-col justify-center items-center leading-tight tracking-tight text-slate-200">
                    <p className="text-white text-lg font-semibold">
                      {voteAvg}{" "}
                      <span className="text-slate-200 text-base font-normal">
                        /10
                      </span>
                    </p>
                    <p>({voteCount})</p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col items-center">
                <h3 className="uppercase text-sm tracking-tight font-bold text-red-500">
                  Popularity
                </h3>
                <div className="flex items-center space-x-1">
                  <div className="text-xl text-red-500">
                    <BsFillHeartFill />
                  </div>
                  <div className="flex flex-col justify-center items-center leading-tight tracking-tight text-slate-200">
                    <p className="text-white text-lg font-semibold">
                      {Math.round(popularity)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal movie overview */}
            <p className="text-sm tracking-tight text-justify md:text-sm">
              {overview}
            </p>
          </div>
          <PlayButton
            movieTitle={movieTitle}
            movieId={movieId}
            posterPath={posterPath}
          />
          <div className="text-white text-sm">
            <span className="uppercase">Cast</span>
            <div className="flex flex-col space-y-1 mt-1">
              {cast.slice(0, 3).map((item) => (
                <div
                  className="grid grid-cols-11 gap-x-1"
                  key={`cast-${item.id}`}
                >
                  <img
                    className="self-center col-span-2"
                    style={{ height: "50px" }}
                    src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                    alt=""
                  />
                  <p className="self-center col-span-4">{item.name}</p>
                  <p className="self-center col-span-1 text-xs text-slate-200">
                    as
                  </p>
                  <p className="self-center col-span-4 text-blue-400">
                    {item.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* The movie card itself */}
      <button className="" onClick={() => setModalIsOpen(true)}>
        <img
          className="object-contain h-full shrink-0"
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt=""
        />
      </button>
      <div className="p-2 flex flex-col justify-between overflow-hidden text-slate-200 h-full">
        <button
          onClick={() => setModalIsOpen(true)}
          className="flex flex-col text-left"
        >
          <h2 className="font-medium text-sm md:text-lg line-clamp-1 text-amber-400">
            {movieTitle}
          </h2>
          <p className="text-xs md:text-sm line-clamp-3">{overview}</p>
        </button>
        <div className="flex flex-start items-start space-x-1.5 mt-2">
          {genres.slice(0, 2).map((item) => (
            <span
              key={item}
              className="text-xs text-black px-1 md:text-sm font-medium bg-slate-100 rounded-sm truncate text-center border border-slate-200"
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
