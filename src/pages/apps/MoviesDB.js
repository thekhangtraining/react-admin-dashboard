import axios from "axios";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MoviesSwiper } from "../../components/moviesdb";
import configs from "../../configs.json";
import TheMovieDBLogo from "../../data/images/logos/TheMovieDB.svg";
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
    <div className="text-sm p-4 grid grid-cols-12">
      <div className="col-span-12 md:px-0 md:col-start-2 md:col-span-10">
        <div className="flex justify-center animate-slideAndFadeIn h-10 mb-4 space-x-6 md:h-12 lg:h-14">
          <a
            href="https://developers.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={TheMovieDBLogo} className="h-full" alt="" />
          </a>
        </div>

        <h2 className="text-pink-400 truncate font-[Pacifico]">
          Lu Xinh muốn xem phim gì ạ? 🥰
        </h2>

        <div className="grid grid-cols-2 gap-x-6">
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-slate-200 truncate mt-4 font-bold">
              Weekly Trending Movies
            </h2>
            <MoviesSwiper moviesList={trendingMovies} effect="coverflow" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-slate-200 truncate mt-4 font-bold">
              Most Viewed Movies Of All Times
            </h2>
            <MoviesSwiper moviesList={mostRatedMovies} effect="coverflow" />
          </div>
        </div>
        <div className="h-screen"></div>
      </div>
    </div>
  );
};

export default MoviesDB;
