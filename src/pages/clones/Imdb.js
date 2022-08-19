import axios from "axios";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MoviesSwiper } from "../../components/imdb";
import configs from "../../configs.json";
import "../../styles/swiper.css";
import TheMovieDBLogo from "../../data/img/logos/TheMovieDB.svg";
import IMDbLogo from "../../data/img/logos/IMDb.png";

const Movies = () => {
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
    <div className="flex flex-col py-4 bg-zinc-800">
      <div className="grid grid-cols-12">
        <div className="px-4 col-span-12 md:px-0 md:col-start-2 md:col-span-10">
          <div className="flex justify-center h-10 mb-4 space-x-6 md:h-12 md:space-x-8 lg:h-14 lg:space-x-10">
            <a
              href="https://developers.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={TheMovieDBLogo} className="h-full" alt="" />
            </a>
            <a
              href="https://developer.imdb.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={IMDbLogo} className="h-full" alt="" />
            </a>
          </div>

          <h2 className="text-pink-400 truncate font-[Pacifico]">
            Lu Xinh muốn xem phim gì ạ? 🥰
          </h2>

          <div className="grid grid-cols-2 gap-x-6">
            <div className="col-span-2 lg:col-span-1">
              <h2 className="text-slate-50 truncate mt-4 font-[Poppins] font-bold">
                Weekly Trending Movies
              </h2>
              <MoviesSwiper moviesList={trendingMovies} effect="coverflow" />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <h2 className="text-slate-50 truncate mt-4 font-[Poppins] font-bold">
                Most Viewed Movies Of All Times
              </h2>
              <MoviesSwiper moviesList={mostRatedMovies} effect="coverflow" />
            </div>
          </div>
          <div className="h-screen"></div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
