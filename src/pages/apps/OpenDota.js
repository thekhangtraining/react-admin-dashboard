import React from "react";
import { DotaTable } from "../../components/opendota";
import {
  playersColumnsDef,
  teamsColumnsDef,
} from "../../components/opendota/ColumnsDefs";
import OpenDotaLogo from "../../data/images/logos/OpenDota.jpg";
import dotaPlayers from "../../data/opendota/players.json";
import dotaTeams from "../../data/opendota/teams.json";

const OpenDota = () => {
  return (
    <div className="p-4 flex justify-center text-slate-400 text-sm">
      <div className="w-full lg:max-w-7xl">
        <DotaTable
          data={dotaPlayers}
          columnsDef={playersColumnsDef}
          tableTitle="Top Dota Players"
        />

        <div className="h-[5vh]"></div>
        <DotaTable
          data={dotaTeams}
          columnsDef={teamsColumnsDef}
          tableTitle="Top Dota Teams"
        />

        <div className="h-[15vh]"></div>
        <div className="flex flex-col space-y-1">
          <strong className="text-xs md:text-sm">Powered by</strong>
          <a href="https://www.opendota.com/" target="_blank" rel="noreferrer">
            <img
              className="h-10 md:h-14 animate-slideAndFadeIn rounded-sm"
              src={OpenDotaLogo}
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OpenDota;
