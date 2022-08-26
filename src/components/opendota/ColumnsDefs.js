import React from "react";
import {
  getPlayer,
  MatchDuration,
  MatchId,
  MatchResult,
  OpposingTeam,
  Player,
  PlayerHeroes,
  PlayerPersona,
  PlayerTeam,
  PlayerWinrate,
  Team,
  TeamLastMatch,
  TeamWinrate,
  winMatch
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
  {
    Header: "Persona",
    accessor: "personaname",
    Cell: ({ value }) => <PlayerPersona persona={value} />,
  },
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
    accessor: "matches.heroes[0]",
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
  { Header: "Rating", accessor: "rating", width: 30 },
  {
    Header: "Win Rate",
    accessor: "win_rate",
    Cell: ({ row }) => (
      <TeamWinrate
        wins={row.original.wins}
        losses={row.original.losses}
        winRate={row.original.win_rate}
      />
    ),
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

export const bestTeamColumnsDef = [
  {
    Header: "Match",
    accessor: (item) => item.match_id + " " + item.league_name,

    Cell: ({ row }) => (
      <MatchId
        matchId={row.original.match_id}
        leagueName={row.original.league_name}
        startTime={row.original.start_time}
      />
    ),
  },
  {
    Header: "Result",
    accessor: (item) =>
      winMatch(item.radiant, item.radiant_win) ? "Win" : "Loss",
    Cell: ({ row }) => (
      <MatchResult
        isRadiant={row.original.radiant}
        radiantWin={row.original.radiant_win}
      />
    ),
  },
  {
    Header: "Opposing Team",
    accessor: "opposing_team_name",
    Cell: ({ row }) => (
      <OpposingTeam
        opposingTeamId={row.original.opposing_team_id}
        opposingTeamName={row.original.opposing_team_name}
        opposingTeamLogo={row.original.opposing_team_logo}
      />
    ),
  },
  {
    Header: "Duration",
    accessor: "duration",
    Cell: ({ row }) => <MatchDuration matchDuration={row.original.duration} />,
  },
];

export const bestTeamPlayersColumnsDef = [
  {
    Header: "Player",
    accessor: "name",
    Cell: ({ row }) => {
      let player = getPlayer(row.original.account_id);
      return (
        <Player
          teamTag={player.team_tag}
          name={player.name}
          avatar={player.avatar}
          countryCode={player.country_code.toUpperCase()}
          id={player.account_id}
        />
      );
    },
  },
  {
    Header: "Win Rate",
    accessor: "win_rate",
    Cell: ({ row }) => {
      let player = getPlayer(row.original.account_id);
      return (
        <PlayerWinrate
          wins={player.matches.wins}
          losses={player.matches.losses}
          winRate={player.matches.win_rate}
        />
      );
    },
  },
];
