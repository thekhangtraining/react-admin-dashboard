import React from "react";
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
  return (
    <div className="mt-2">
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
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1536: {
            slidesPerView: 6,
            spaceBetween: 25,
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoviesSwiper;
