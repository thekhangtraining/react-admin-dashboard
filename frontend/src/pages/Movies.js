import axios from "axios";
import React, { useEffect, useState } from "react";
import { Title } from "../components";
import { MoviesCard } from "../components/movies";
import configs from "../configs.json";
import { Skeleton } from "@mantine/core";

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  let skeletonList = [...Array(20)].map((x) => 0);

  // Fetch movies list at startup
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/trending/all/week", {
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
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col animate-fadeIn">
      <Title title="Trending Movies Of This Week" />
      <div className="flex flex-wrap">
        {loading &&
          skeletonList.map((item) => (
            <Skeleton m={6} width={192} height={384} />
          ))}
        {!loading &&
          moviesList.map((item) => (
            <MoviesCard
              key={item.id}
              id={item.id}
              title={item.title || item.name}
              backdropPath={item.backdrop_path}
              posterPath={item.poster_path}
              popularity={item.popularity}
              voteAvg={item.vote_average}
              voteCount={item.vote_count}
              genreIds={item.genre_ids}
              releaseYear={(item.release_date || item.first_air_date).slice(
                0,
                4
              )}
            />
          ))}
      </div>
    </div>
  );
};

export default Movies;
