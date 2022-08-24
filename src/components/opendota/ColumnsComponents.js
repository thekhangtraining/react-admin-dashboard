import Flags from "country-flag-icons/react/3x2";
import { differenceInDays, fromUnixTime, secondsToMinutes } from "date-fns";
import heroes from "../../data/opendota/heroes.json";
import dotaPlayers from "../../data/opendota/players.json";
import { Tooltip } from "./";

const classnames = require("classnames");
const placeholderPath = "https://img.icons8.com/cotton/344/user-male--v1.png";

export const PlayerWinrate = ({ winRate, wins, losses }) => (
  <div className="flex flex-col float-left">
    <p>{winRate}%</p>
    <div className="flex space-x-1">
      <span className="text-green-400">{wins}W</span>
      <span className="text-red-400">{losses}L</span>
    </div>
  </div>
);

function getHeroImgSrc(heroName) {
  for (let i = 0; i < heroes.length; i++) {
    if (heroes[i].localized_name === heroName)
      return (
        "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" +
        heroes[i].name.replace("npc_dota_hero_", "") +
        ".png"
      );
  }
}

export const PlayerHeroes = ({ heroes, id }) => (
  <div className="flex space-x-1 w-52">
    {heroes.slice(0, 5).map((h) => (
      <Tooltip key={`${id}-${h}`} label={h}>
        <img className="h-5 w-9 rounded-xs" alt="" src={getHeroImgSrc(h)} />
      </Tooltip>
    ))}
  </div>
);

export const PlayerTeam = ({ teamLogo, teamName }) => (
  <div className="flex space-x-1 items-center">
    {" "}
    <img
      src={teamLogo}
      alt=""
      className="rounded-full h-5 w-5 md:h-6 md:w-6"
      // Placeholder image
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholderPath;
      }}
    />
    <p className="text-sky-500">{teamName}</p>
  </div>
);

export const Player = ({ teamTag, name, avatar, countryCode, id }) => {
  const Flag = countryCode !== "" ? Flags[countryCode] : null;
  return (
    <div className="flex items-center space-x-2">
      <img
        src={avatar}
        alt=""
        className="rounded-full h-5 w-5 md:h-6 md:w-6"
        // Placeholder image
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderPath;
        }}
      />

      <div className="flex space-x-1 items-center">
        <div className="flex flex-col">
          <div className="flex items-center">
            {teamTag !== "" && teamTag !== null ? (
              <span>{`${teamTag}.`}</span>
            ) : (
              ""
            )}
            <p className="text-sky-500 mx-1">{name}</p>
            {countryCode !== "" ? <Flag className="w-3 h-2" /> : null}
          </div>
          <p>{id}</p>
        </div>
      </div>
    </div>
  );
};

export const Team = ({ name, teamTag, logo, id }) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={logo}
        alt=""
        className="rounded-full h-5 w-6 md:h-6 md:w-7"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderPath;
        }}
      />
      <div className="flex flex-col">
        <div className="flex space-x-1 items-center">
          <span className="text-sky-500">{name}</span>
          {teamTag !== "" && teamTag !== null ? (
            <span>{`${teamTag}`}</span>
          ) : (
            ""
          )}
        </div>
        <p>{id}</p>
      </div>
    </div>
  );
};

export function winMatch(isRadiant, radiantWin) {
  return (isRadiant && radiantWin) || (!isRadiant && !radiantWin);
}

export const TeamLastMatch = ({
  time,
  league,
  opposingTeam,
  isRadiant,
  radiantWin,
}) => (
  <div className="flex flex-col">
    <p>
      {time.split(" ")[1]}
      <span>
        <span
          className={classnames(
            winMatch(isRadiant, radiantWin) && "text-green-400",
            !winMatch(isRadiant, radiantWin) && "text-red-400"
          )}
        >
          {winMatch(isRadiant, radiantWin) ? " Win " : " Loss "}
        </span>
        vs <span className="text-sky-500">{opposingTeam}</span>
      </span>
    </p>
    <p>{league}</p>
  </div>
);

export const TeamWinrate = ({ winRate, wins, losses }) => (
  <div className="flex flex-col float-left">
    <p>{winRate}%</p>
    <div className="flex space-x-1">
      <span className="text-green-400">{wins}W</span>
      <span className="text-red-400">{losses}L</span>
    </div>
  </div>
);

export const MatchId = ({ matchId, leagueName, startTime }) => (
  <div className="flex flex-col">
    <Tooltip label={leagueName}>
      <p className="w-48 truncate text-sky-500">{leagueName}</p>
    </Tooltip>
    <p>
      <span className="mx-1">
        {differenceInDays(new Date(), fromUnixTime(startTime))} days ago {">"}
      </span>
      {matchId}
    </p>
  </div>
);

export const MatchDuration = ({ matchDuration }) => (
  <p>
    {secondsToMinutes(matchDuration)}:
    {matchDuration - secondsToMinutes(matchDuration) * 60 < 10 ? "0" : ""}
    {matchDuration - secondsToMinutes(matchDuration) * 60}
  </p>
);

export const MatchResult = ({ isRadiant, radiantWin }) => (
  <p
    className={classnames(
      (winMatch(isRadiant, radiantWin) && "text-green-400") || "text-red-400"
    )}
  >
    {winMatch(isRadiant, radiantWin) ? "Win" : "Loss"}
  </p>
);

export const OpposingTeam = ({
  opposingTeamId,
  opposingTeamName,
  opposingTeamLogo,
}) => (
  <div className="flex items-center space-x-2">
    <img
      src={opposingTeamLogo}
      alt=""
      className="rounded-full h-5 w-5 md:h-6 md:w-6"
      // Placeholder image
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = placeholderPath;
      }}
    />

    <div className="flex flex-col">
      <p className="text-sky-500">{opposingTeamName}</p>
      <p>{opposingTeamId}</p>
    </div>
  </div>
);

export function getPlayer(playerId) {
  for (const player of dotaPlayers) {
    if (playerId === player.account_id) return player;
  }
}
