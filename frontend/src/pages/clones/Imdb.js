import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Title } from "../../components";
import { MovieCard } from "../../components/imdb";
import configs from "../../configs.json";
import "../../styles/swiper.css";

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
      <h2 className="text-slate-50">Trending Movies This Week</h2>
      <div className="grid grid-cols-12">
        <div className="col-span-12 mt-2">
          <Swiper
            slidesPerView={1}
            navigation={true}
            breakpoints={{
              350: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination, Navigation]}
            className="imdbSwiper"
          >
            {moviesList.map((item) => (
              <SwiperSlide key={`swiper-slide-${item.id}`}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Movies;
