import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegPlayCircle, FaYoutube } from "react-icons/fa";
import Modal from "react-modal";
import ReactPlayer from "react-player/youtube";
import configs from "../../configs.json";

const PlayButton = ({ movieTitle, movieId, posterPath }) => {
  const [trailerLink, setTrailerLink] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "2rem",
      background: "#f4f4f5",
      paddingTop: "1rem",
      width: "90%",
      height: "90%",
    },
    overlay: {
      background:
        "linear-gradient(to right, rgba(4, 120, 87, 0.5), rgba(126, 34, 206, 0.5))",
      backgroundImage: `url('https://image.tmdb.org/t/p/w1280${posterPath}')`,
      backgroundSize: "contain",
    },
  };
  Modal.setAppElement("#root");

  useEffect(() => {
    axios
      .get(`http://api.themoviedb.org/3/movie/${movieId}/videos`, {
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyle}
        contentLabel="Watch trailer"
      >
        <div className="flex items-center">
          <FaYoutube size="40px" color={"rgb(255, 0, 0)"} className="mx-2" />
          <h2 className="text-lg text-slate-400">
            Watching
            <span className="text-emerald-600 font-medium"> {movieTitle} </span>
            trailer
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center h-[95%] w-full mt-3">
          <ReactPlayer
            width="100%"
            height="100%"
            controls
            playing
            url={trailerLink}
          />
        </div>
      </Modal>

      <button
        type="button"
        // Adhoc styling
        onClick={() => setModalIsOpen(true)}
        className="flex justify-center h-full w-full rounded items-center px-2 py-0.5 bg-yellow-500"
      >
        <FaRegPlayCircle size="20px" className="text-black mx-1" />
        <p className="font-medium">Watch Trailer</p>
      </button>
    </div>
  );
};

export default PlayButton;
