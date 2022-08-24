import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { IoMdChatbubbles } from "react-icons/io";
import { DotaTable, HeroCard } from "../../components/opendota";
import {
  bestTeamColumnsDef,
  bestTeamPlayersColumnsDef,
  playersColumnsDef,
  teamsColumnsDef
} from "../../components/opendota/ColumnsDefs";
import bgImg from "../../data/images/opendota/background.jpg";
import openDotaLogo from "../../data/images/opendota/opendota.jpg";
import bestTeamMatches from "../../data/opendota/best_team_matches.json";
import bestTeamPlayers from "../../data/opendota/best_team_players.json";
import dotaPlayers from "../../data/opendota/players.json";
import dotaTeams from "../../data/opendota/teams.json";

const OpenDota = () => {
  const bgImgStyle = {
    background: `linear-gradient(to right, rgba(12,74,110,0.2), rgba(15,23,42,0.2)), url(${bgImg}) no-repeat`,
    backgroundSize: "cover",
  };
  const textShadow = { textShadow: "3px 3px 3px rgb(12,74,110)" };

  return (
    <div className="text-slate-400 text-sm flex flex-col items-center">
      <div
        style={bgImgStyle}
        className="w-full h-48 sm:h-60 md:h-72 lg:h-80 xl:h-96 animate-slideAndFadeIn text-slate-200"
      >
        <div className="h-full lg:max-w-7x flex flex-col justify-center items-center space-y-1 md:space-y-2">
          <h2
            style={textShadow}
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl drop-shadow-lg font-bold rounded"
          >
            OpenDota
          </h2>
          <div className="flex space-x-1 sm:space-x-2 lg:space-x-4">
            <HeroCard
              title="Community"
              icon={<BsPeopleFill className="h-4 w-4 md:h-6 md:w-6" />}
              description="The largest DotA community with up-to-the-minute news"
            />
            <HeroCard
              title="Exchange Ideas"
              icon={<IoMdChatbubbles className="h-4 w-4 md:h-6 md:w-6" />}
              description="Share your experience, hear other pro players' stories"
            />
            <HeroCard
              title="Analytics"
              icon={<GoGraph className="h-4 w-4 md:h-6 md:w-6" />}
              description="Track your favorite players with comprehensive analytics"
            />
          </div>
        </div>
      </div>
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
          <div className="flex flex-col space-y-1">
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
