import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsYoutube } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import ReactPlayer from "react-player/youtube";
import configs from "../../configs.json";
import { useStateContext } from "../../contexts/ContextProvider";

let classnames = require("classnames");

const TrailerButton = ({ movieTitle, movieId, posterPath }) => {
  const [trailerLink, setTrailerLink] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { theme } = useStateContext();

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
      background: "rgba(0, 0, 0, 0.8)",
      borderColor: "rgba(0, 0, 0, 0.8)",
      width: "90vw",
      height: "90vh",
      overflowY: "auto",
    },
    overlay: {
      background: `linear-gradient(0deg, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.3)),url('https://image.tmdb.org/t/p/w1280${posterPath}')`,
      backgroundSize: "contain",
      zIndex: 30,
    },
  };

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
    <div className="w-full">
      {/* Modal for playing trailer */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyle}
        contentLabel="Watch trailer"
      >
        <div
          className={classnames(
            "w-full h-full",
            theme === "Nord" && "theme-nord",
            theme === "Emerald" && "theme-emerald"
          )}
        >
          {/* Close modal button */}
          <div className="flex justify-end">
            <button
              onClick={() => setModalIsOpen(!modalIsOpen)}
              className="hover:text-skin-primary"
            >
              <IoCloseSharp />
            </button>
          </div>
          <div className="flex items-center">
            <BsYoutube size="20px" color={"rgb(255, 0, 0)"} className="mx-2" />
            <h2 className="text-white">
              Watching
              <span className="text-skin-primary font-medium">
                {" "}
                {movieTitle}{" "}
              </span>
              trailer
            </h2>
          </div>
          {/* Youtube video player size*/}
          <div className="flex flex-col items-center justify-center h-[95%] w-full mt-1">
            <ReactPlayer
              width="100%"
              height="100%"
              controls
              playing
              url={trailerLink}
            />
          </div>
        </div>
      </Modal>

      {/* Play button */}
      <button
        type="button"
        // Adhoc styling
        onClick={() => setModalIsOpen(true)}
        className="flex justify-center w-full rounded items-center px-2 bg-amber-400"
      >
        <BsYoutube className="text-black mx-1" />
        <p className="font-medium truncate text-black">Trailer</p>
      </button>
    </div>
  );
};

export default TrailerButton;
