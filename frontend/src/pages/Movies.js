import axios from "axios";
import React, { useEffect, useState } from "react";
import { Title } from "../components";
import { MoviesCard } from "../components/movies";
import configs from "../configs.json";

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/trending/all/week", {
        params: {
          api_key: configs.apiKeyTMDB,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setMoviesList(
          response.data.results.sort(function (a, b) {
            return b.popularity - a.popularity;
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col animate-fadeIn">
      <Title title="Thu Giang muốn xem phim gì ạ?" />
      <div className="flex flex-wrap">
        {moviesList.map((item) => (
          <MoviesCard
            key={item.id}
            title={item.title || item.name}
            backdropPath={item.backdrop_path}
            posterPath={item.poster_path}
            popularity={item.popularity}
            voteAvg={item.vote_average}
            voteCount={item.vote_count}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;
