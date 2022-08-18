import React from "react";
import imgConstruction from "../data/img/Construction.svg";
import { NavLink } from "react-router-dom";

const Construction = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-2 text-slate-50 h-[91vh] md:h-screen">
      <img className="w-full sm:w-2/3" src={imgConstruction} alt="" />
      <h2 className="font-bold text-2xl text-emerald-500">Ooops!</h2>
      <p className="text-center">
        Looks like the page you are looking for is under construction. Check out
        other finished projects.
      </p>
      <ul className="list-disc">
        <li>
          <NavLink to="/clones/imdb">
            <button>
              <p className="hover:underline decoration-2 decoration-emerald-500 text-left">
                <span className="text-emerald-500 font-bold">IMDb </span>: A
                movie database project
              </p>
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/data/tables">
            <button>
              <p className="hover:underline decoration-2 decoration-emerald-500 text-left">
                <span className="text-emerald-500 font-bold">Tables </span>:
                Some cool tables that might be useful for work
              </p>
            </button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Construction;