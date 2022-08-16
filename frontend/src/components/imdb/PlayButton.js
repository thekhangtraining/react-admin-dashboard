import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegPlayCircle, FaYoutube } from "react-icons/fa";
import Modal from "react-modal";
import ReactPlayer from "react-player/youtube";
import configs from "../../configs.json";

const PlayButton = ({ movieTitle, movieId, posterPath }) => {
  const [trailerLink, setTrailerLink] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Style for trailer modal
  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "1rem",
      paddingBottom: "2rem",
      background: "rgba(0, 0, 0, 0.5)",
      width: "70%",
      height: "80%",
      overflow: "hidden",
      borderColor: "rgba(0, 0, 0, 0.5)",
    },
    overlay: {
      background: `url('https://image.tmdb.org/t/p/w1280${posterPath}')`,
      backgroundSize: "contain",
      zIndex: 30,
    },
  };
  Modal.setAppElement("#root");

  // Get trailer from API
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        params: {
          api_key: configs.apiKeyTMDB,
        },
      })
      .then((response) => {
        response.data.results.forEach((item) => {
          if (item.type === "Trailer") {
            setTrailerLink(`https://www.youtube.com/watch?v=${item.key}`);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [movieId]);

  return (
    <div className="group w-full">
      {/* Modal for playing trailer */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyle}
        contentLabel="Watch trailer"
      >
        <div className="flex items-center">
          <FaYoutube size="40px" color={"rgb(255, 0, 0)"} className="mx-2" />
          <h2 className="text-lg text-white">
            Watching
            <span className="text-emerald-200 font-medium"> {movieTitle} </span>
            trailer
          </h2>
        </div>
        {/* Youtube video player size*/}
        <div className="flex flex-col items-center justify-center h-[95%] w-full mt-1">
          <ReactPlayer
            width="95%"
            height="95%"
            controls
            playing
            url={trailerLink}
          />
        </div>
      </Modal>

      {/* Play button */}
      <button
        type="button"
        // Adhoc styling
        onClick={() => setModalIsOpen(true)}
        className="flex justify-center h-full w-full rounded items-center px-2 sm:py-0.5 bg-yellow-500"
      >
        <FaRegPlayCircle className="text-black mx-1 text-sm md:text-lg" />
        <p className="text-sm md:text-base font-medium truncate text-black">
          Watch Trailer
        </p>
      </button>
    </div>
  );
};

export default PlayButton;
