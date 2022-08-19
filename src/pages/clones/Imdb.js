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
    <div className="flex flex-col p-4 bg-zinc-800">
      <div className="flex justify-center h-10 mb-4 space-x-6 md:h-12 md:space-x-8 lg:h-16 lg:space-x-10">
        <img src={TheMovieDBLogo} className="h-full" alt="" />
        <img src={IMDbLogo} className="h-full" alt="" />
      </div>

      <h2 className="text-pink-400 truncate font-[Pacifico]">
        Lu Xinh muốn xem phim gì ạ? 🥰
      </h2>
      <h2 className="text-slate-50 text-lg truncate mt-4">
        Weekly Trending Movies
      </h2>
      <MoviesSwiper moviesList={trendingMovies} effect="coverflow" />
      <h2 className="text-slate-50 text-lg truncate mt-4">
        Most Viewed Movies Of All Times
      </h2>
      <MoviesSwiper moviesList={mostRatedMovies} effect="coverflow" />
    </div>
  );
};

export default Movies;
