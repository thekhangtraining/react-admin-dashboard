import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillHeartFill, BsStarFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { LoveButton, RatingButton, TrailerButton, WatchButton } from ".";
import configs from "../../configs.json";
import { moviesGenres } from "../../data/data";
import "../../styles/modal.css";
import "../../styles/swiper.css";

// TODO: Revenue graph for each movie, compared to budget
// https://developers.themoviedb.org/3/movies/get-movie-details

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
  releaseDate,
  setIsLoading,
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
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [movieImgs, setMovieImgs] = useState([]);

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "1rem",
      background: "rgba(0, 0, 0, 0.5)",
      borderColor: "rgba(0, 0, 0, 0.5)",
      // Make modal swipable
      maxHeight: "80vh",
      overflowY: "auto",
      width: "95vw",
    },
    overlay: {
      background: "rgba(24, 24, 27, 0.7)",
      zIndex: 30,
    },
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
        params: {
          api_key: configs.apiKeyTMDB,
        },
      })
      .then((response) => {
        setMovieImgs(
          response.data.backdrops.sort((a, b) => b.vote_count - a.vote_count)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [movieId]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        params: {
          api_key: configs.apiKeyTMDB,
        },
      })
      .then((response) => {
        setCast(response.data.cast);
        let directorsTemp = response.data.crew.filter(
          (member) => member.job === "Director"
        );

        // Filter only unique directors
        setDirectors(
          directorsTemp.filter(
            (dir, index, array) =>
              array.findIndex((dir2) => dir2.name === dir.name) === index
          )
        );

        let writersTemp = response.data.crew.filter(
          (member) =>
            member.known_for_department === "Writing" &&
            member.department === "Writing"
        );
        setWriters(
          writersTemp.filter(
            (wri, index, array) =>
              array.findIndex((wri2) => wri2.name === wri.name) === index
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [movieId]);

  Modal.setAppElement("#root");

  return (
    <div className="flex flex-col bg-zinc-900 w-full h-full">
      {/* The modal for the movie card */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyle}
        contentLabel="Movie card modal"
        // Prevent body swiping when modal is open
        onAfterOpen={() => (document.body.style.overflow = "hidden")}
        onAfterClose={() => (document.body.style.overflow = "unset")}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-start-2 md:col-span-10 xl:col-start-3 xl:col-span-8">
            {/* Close modal button */}
            <div className="flex justify-end">
              <button
                onClick={() => setModalIsOpen(!modalIsOpen)}
                className="text-white hover:text-emerald-400"
              >
                <IoCloseSharp className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              {/* Modal title */}
              <h2 className="text-emerald-400 font-medium md:text-xl">
                {movieTitle}
              </h2>
              {/* Modal backdrop */}
              <div className="flex flex-col text-slate-200 justify-center items-center sm:flex-row sm:mr-2 sm:items-start">
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
                    alt=""
                    className="sm:hidden"
                  />
                  <img
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt=""
                    className="hidden sm:inline-flex"
                  />
                  {/* Movie genres */}
                  <div className="flex flex-start items-start space-x-1 mt-2 justify-center">
                    {genres.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="text-xs text-white px-1 font-medium md:text-sm rounded truncate text-center border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col flex-start w-full space-y-2 mt-2 sm:ml-2 sm:mt-0">
                  <div className="grid grid-cols-2 gap-2 w-full border-y border-slate-500 p-2">
                    {/* Rating */}
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
                    {/* Popularity */}
                    <div className="col-span-1 flex flex-col items-center">
                      <h3 className="uppercase text-sm tracking-tight font-bold text-center text-red-500">
                        Weekly
                        <br />
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
                  <p className="text-sm">
                    Release Date:{" "}
                    <span className="text-amber-400 font-bold">
                      {releaseDate}
                    </span>
                  </p>
                  <p className="text-sm tracking-tight text-justify md:text-sm">
                    {overview}
                  </p>
                  <div className="flex space-x-2">
                    <TrailerButton
                      movieTitle={movieTitle}
                      movieId={movieId}
                      posterPath={posterPath}
                    />
                    <WatchButton />
                  </div>
                  <div className="text-white text-sm p-1 flex flex-col lg:flex-row">
                    {/* Cast */}
                    <div className="flex flex-col space-y-2 w-full my-2">
                      <p className="uppercase">Cast</p>
                      {cast.slice(0, 4).map((member) => (
                        <div
                          className="flex items-center space-x-2"
                          key={`cast-${member.id}`}
                        >
                          <img
                            className="rounded-md h-9 w-6.5"
                            src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                            alt=""
                          />
                          <p className="">
                            {member.name}
                            <span className="ml-3 text-emerald-500">
                              {member.character}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col w-full my-2">
                      {/* Directors */}
                      <div className="flex flex-col space-y-2">
                        <p className="uppercase">Director</p>
                        {directors.map((member) => (
                          <div
                            className="flex items-center space-x-2"
                            key={`cast-${member.id}`}
                          >
                            <img
                              className="rounded-md h-9 w-6.5"
                              src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                              alt=""
                            />
                            <p className="">{member.name}</p>
                          </div>
                        ))}
                      </div>
                      {/* Writers */}
                      {writers.length === 0 ? (
                        <></>
                      ) : (
                        <div className="flex flex-col space-y-2 my-2">
                          <p className="uppercase">Writers</p>
                          {writers.slice(0, 1).map((member) => (
                            <div
                              className="flex items-center space-x-2"
                              key={`cast-${member.id}`}
                            >
                              <img
                                className="rounded-md h-9 w-6.5"
                                src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                                alt=""
                              />
                              <p>{member.name}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Swiper inside modal */}
              <Swiper
                slidesPerView={1}
                loop
                initialSlide={1}
                navigation={true}
                pagination={{
                  type: "bullets",
                }}
                modules={[Pagination, Navigation]}
                breakpoints={{
                  350: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  1536: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                }}
              >
                {movieImgs.slice(0, 10).map((img) => (
                  <SwiperSlide key={img.file_path}>
                    <img
                      className="rounded-sm"
                      src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
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
          onLoad={() => setIsLoading(false)}
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
          <p className="text-xs md:text-sm">
            ({releaseDate.slice(0, 4)})
          </p>
          <p className="text-xs md:text-sm line-clamp-2">{overview}</p>
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

          <TrailerButton
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
