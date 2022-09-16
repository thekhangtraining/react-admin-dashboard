import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { IoMdChatbubbles } from "react-icons/io";
import { DotaTable, HeroCard } from "../../components/opendota";
import {
  bestTeamColumnsDef,
  bestTeamPlayersColumnsDef,
  playersColumnsDef,
  teamsColumnsDef,
} from "../../components/opendota/ColumnsDefs";
import openDotaLogo from "../../media/images/opendota/opendota.jpg";
import bestTeamMatches from "../../data/opendota/best_team_matches.json";
import bestTeamPlayers from "../../data/opendota/best_team_players.json";
import dotaPlayers from "../../data/opendota/players.json";
import dotaTeams from "../../data/opendota/teams.json";

const OpenDota = () => {
  const textShadow = { textShadow: "3px 3px 3px rgb(0,0,0)" };

  return (
    <div className="text-sm flex flex-col items-center">
      <div className="p-2 w-full flex flex-col space-y-4 items-center lg:max-w-7xl">
        <DotaTable
          data={dotaPlayers}
          columnsDef={playersColumnsDef}
          tableTitle="Top Dota Players"
        />

        <DotaTable
          data={dotaTeams}
          columnsDef={teamsColumnsDef}
          tableTitle="Top Dota Teams"
        />

        <div className="flex w-full flex-col justify-between md:flex-row md:gap-6">
          <DotaTable
            data={bestTeamMatches}
            columnsDef={bestTeamColumnsDef}
            tableTitle="PSG.LGD Recent Matches"
          />
          <DotaTable
            data={bestTeamPlayers}
            columnsDef={bestTeamPlayersColumnsDef}
            tableTitle="PSG.LGD Players"
            disablePagination
            disableGlobalFilter
          />
        </div>
        <div className="flex w-full">
          <div className="flex flex-col space-y-1 items-center w-full">
            <strong className="text-xs md:text-sm">Powered by</strong>
            <a
              href="https://www.opendota.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="h-10 md:h-14 animate-slideAndFadeIn rounded-sm"
                src={openDotaLogo}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenDota;
