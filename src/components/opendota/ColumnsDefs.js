import React from "react";
import {
  Player,
  PlayerHeroes,
  PlayerTeam,
  PlayerWinrate,
  Team,
  TeamLastMatch
} from "../../components/opendota/ColumnsComponents";

export const playersColumnsDef = [
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
    Header: "Rank",
    accessor: "rank",
    Cell: ({ value }) => (value === 9999 ? "" : value),
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

export const teamsColumnsDef = [
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
        isRadiant={row.original.matches[0].is_radiant}
        radiantWin={row.original.matches[0].radiant_win}
      />
    ),
  },
];
