import React from "react";
import { DotaTable } from "../../components/opendota";
import {
  Player,
  PlayerHeroes,
  PlayerTeam,
  PlayerWinrate,
  Team,
  TeamLastMatch,
} from "../../components/opendota/DotaTable";
import OpenDotaLogo from "../../data/images/logos/OpenDota.jpg";
import dotaPlayers from "../../data/opendota/players.json";
import dotaTeams from "../../data/opendota/teams.json";

const OpenDota = () => {
  const playersColumnsDef = [
    {
      Header: "Player",
      accessor: "name",
      Cell: ({ row }) => (
        <Player
          teamTag={row.original.team_tag}
          name={row.original.name}
          avatar={row.original.avatar}
          countryCode={row.original.country_code.toUpperCase()}
          id={row.original.account_id}
        />
      ),
    },
    { Header: "Persona", accessor: "personaname" },
    {
      Header: "Team",
      accessor: "team_name",
      Cell: ({ row }) => (
        <PlayerTeam
          teamLogo={row.original.team_logo}
          teamName={row.original.team_name}
          teamId={row.original.team_id}
        />
      ),
    },
    {
      Header: "Winrate",
      accessor: "matches.win_rate",
      Cell: ({ row }) => (
        <PlayerWinrate
          winRate={row.original.matches.win_rate}
          wins={row.original.matches.wins}
          losses={row.original.matches.losses}
        />
      ),
    },
    {
      Header: "Heroes",
      accessor: "matches.heroes",
      Cell: ({ row }) => (
        <PlayerHeroes
          heroes={row.original.matches.heroes}
          id={row.original.account_id}
        />
      ),
    },
  ];

  const teamsColumnsDef = [
    {
      Header: "Team",
      accessor: "name",
      Cell: ({ row }) => (
        <Team
          teamTag={row.original.tag}
          name={row.original.name}
          logo={row.original.logo_url}
          id={row.original.team_id}
        />
      ),
    },
    { Header: "Rating", accessor: "rating" },
    {
      Header: "Wins",
      accessor: "wins",
      Cell: ({ row }) => <p className="text-green-400">{row.original.wins}</p>,
    },
    {
      Header: "Losses",
      accessor: "losses",
      Cell: ({ row }) => <p className="text-red-400">{row.original.losses}</p>,
    },
    {
      Header: "Last match",
      accessor: "last_match_time",
      Cell: ({ row }) => (
        <TeamLastMatch
          time={row.original.last_match_time}
          league={row.original.matches[0].league_name}
          opposingTeam={row.original.matches[0].opposing_team_name}
        />
      ),
    },
  ];

  return (
    <div className="p-4 flex justify-center text-slate-400 text-sm">
      <div className="w-full lg:max-w-7xl">
        <DotaTable
          dataList={dotaPlayers}
          columnsDef={playersColumnsDef}
          tableTitle="Top Dota Players"
        />

        <div className="h-[5vh]"></div>
        <DotaTable
          dataList={dotaTeams}
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
