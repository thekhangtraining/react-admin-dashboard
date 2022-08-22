import React from "react";
import { DotaTable } from "../../components/opendota";
import {
  Player,
  PlayerHeroes,
  PlayerTeam,
  PlayerWinrate,
  Team,
} from "../../components/opendota/DotaTable";
import OpenDotaLogo from "../../data/images/logos/OpenDota.jpg";
import dotaPlayers from "../../data/opendota/players_stats.json";
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
      accessor: "stats.win_rate",
      Cell: ({ row }) => (
        <PlayerWinrate
          winRate={row.original.stats.win_rate}
          wins={row.original.stats.wins}
          losses={row.original.stats.losses}
        />
      ),
    },
    {
      Header: "Heroes",
      accessor: "stats.heroes",
      Cell: ({ row }) => (
        <PlayerHeroes
          heroes={row.original.stats.heroes}
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
      Cell: ({ row }) => <p>{row.original.last_match_time.split(" ")[1]}</p>,
    },
  ];

  return (
    <div className="p-4 flex justify-center text-slate-400">
      <div className="w-full lg:max-w-7xl">
        <h2 className="text-slate-200 font-bold">Players</h2>
        <DotaTable dataList={dotaPlayers} columnsDef={playersColumnsDef} />

        <h2 className="text-slate-200 font-bold">Teams</h2>
        <DotaTable dataList={dotaTeams} columnsDef={teamsColumnsDef} />

        <div className="flex justify-center">
          <div className="flex flex-col space-y-1 items-center">
            <strong className="text-sm">Powered by</strong>
            <img
              className="h-12 md:h-16 animate-slideAndFadeIn rounded-sm"
              src={OpenDotaLogo}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenDota;
