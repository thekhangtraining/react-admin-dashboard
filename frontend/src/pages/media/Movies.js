import axios from "axios";
import React, { useEffect, useState } from "react";
import { Title } from "../../components";
import { MovieCard } from "../../components/movies";
import configs from "../../configs.json";

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);

  // Fetch movies list at startup
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/trending/movie/week", {
        params: {
          api_key: configs.apiKeyTMDB,
        },
      })
      .then((response) => {
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

  // Load skeletons before the response is returned
  return (
    <div className="flex flex-col">
      <Title title="Thu Giang muốn xem phim gì ạ?" />
      <div className="flex flex-wrap gap-6">
        {moviesList.map((item) => (
          <MovieCard
            key={item.id}
            id={item.id}
            title={item.title}
            backdropPath={item.backdrop_path}
            posterPath={item.poster_path}
            overview={item.overview}
            popularity={item.popularity}
            voteAvg={item.vote_average}
            voteCount={item.vote_count}
            genreIds={item.genre_ids.slice(0, 2)}
            releaseYear={item.release_date.slice(0, 4)}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;
