import axios from "axios";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MoviesSwiper } from "../../components/moviesdb";
import configs from "../../configs.json";
import TheMovieDBLogo from "../../media/images/moviesdb/themoviesdb.svg";
import "../../styles/swiper.css";

const MoviesDB = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [mostRatedMovies, setMostRatedMovies] = useState([]);

  // Fetch movies list at startup
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/trending/movie/week", {
        params: {
          api_key: configs.apiKeyTMDB,
        },
      })
      .then((response) => {
        setTrendingMovies(
          response.data.results.sort(function (a, b) {
            return b.popularity - a.popularity;
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          sort_by: "vote_count.desc",
          api_key: configs.apiKeyTMDB,
        },
      })
      .then((response) => {
        setMostRatedMovies(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-4 flex justify-center text-sm">
      <div className="w-full lg:max-w-7xl">
        <div className="grid grid-cols-2 gap-x-6 mb-6">
          <div className="col-span-2 lg:col-span-1">
            <h2 className="truncate mt-4 font-bold">Weekly Trending Movies</h2>
            <MoviesSwiper moviesList={trendingMovies} effect="coverflow" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h2 className="truncate mt-4 font-bold">
              Most Viewed Movies Of All Times
            </h2>
            <MoviesSwiper moviesList={mostRatedMovies} effect="coverflow" />
          </div>
        </div>
        <div className="h-screen"></div>
        <div className="flex flex-col space-y-1 w-full items-center">
          <strong className="text-xs md:text-sm">Powered by</strong>
          <a
            href="https://developers.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={TheMovieDBLogo}
              className="h-10 md:h-14 animate-slideAndFadeIn rounded-sm"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MoviesDB;
