import React from "react";
import imgConstruction from "../data/images/construction.svg";
import { NavLink } from "react-router-dom";

const Construction = () => {
  return (
    <div className="flex flex-col p-4 text-sm items-center justify-center space-y-2 text-skin-strong h-[91vh] md:h-screen">
      <img className="w-full sm:w-2/3" src={imgConstruction} alt="" />
      <h2 className="font-bold text-xl text-skin-base">Ooops!</h2>
      <p className="text-center">
        Looks like the page you are looking for is under construction. Check out
        other finished projects.
      </p>
      <ul className="list-disc">
        <li>
          <NavLink to="/apps/MoviesDB">
            <button>
              <p className="hover:underline decoration-2 decoration-sky-500 text-left">
                <span className="text-skin-base font-bold">MoviesDB </span>: A
                movie database project
              </p>
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/apps/OpenDota">
            <button>
              <p className="hover:underline decoration-2 decoration-sky-500 text-left">
                <span className="text-skin-base font-bold">OpenDota </span>: An
                analytical database for DotA lovers.
              </p>
            </button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Construction;
