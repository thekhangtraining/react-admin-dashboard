import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from ".";
import "../../styles/swiper.css";

const coverflowEffect = {
  rotate: 30,
  stretch: 0,
  depth: 200,
  modifier: 1,
  slideShadows: true,
};

const MoviesSwiper = ({ moviesList, effect }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="mt-2 w-full">
      <div
        className={`flex justify-center items-center h-72 ${
          isLoading ? "" : "hidden"
        }`}
      >
        <PuffLoader color="#10b981" loading={isLoading} />
      </div>
      <div
        className={`w-full animate-slideAndFadeIn ${isLoading ? "hidden" : ""}`}
      >
        <Swiper
          slidesPerView={1}
          loop
          initialSlide={1}
          navigation={true}
          pagination={{
            type: "progressbar",
          }}
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
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1536: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination, Navigation, EffectCoverflow]}
          grabCursor={true}
          effect={effect}
          coverflowEffect={coverflowEffect}
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
                releaseDate={item.release_date}
                setIsLoading={setIsLoading}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MoviesSwiper;
