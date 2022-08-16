import axios from "axios";
import React, { useEffect, useState } from "react";
import { Title } from "../../components";
import { MovieCard } from "../../components/imdb";
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

  return (
    <div className="flex flex-col">
      <Title surtitle="App clones" title="IMDb" />
      <div className="grid grid-cols-12 gap-6">
        {moviesList.map((item) => (
          <MovieCard
            key={item.id}
            movieId={item.id}
            movieTitle={item.title}
            backdropPath={item.backdrop_path}
            posterPath={item.poster_path}
            overview={item.overview}
            popularity={item.popularity}
            voteAvg={item.vote_average}
            voteCount={item.vote_count}
            genreIds={item.genre_ids}
            releaseYear={item.release_date.slice(0, 4)}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;
