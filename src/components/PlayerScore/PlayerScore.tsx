import React from "react";
import type { Player } from "../../features/game/types";

interface PlayerScoreProps {
  player: Player;
  isActive: boolean;
  type: "header" | "footer";
}

const PlayerScore: React.FC<PlayerScoreProps> = ({
  player,
  isActive,
  type,
}) => {
  if (type === "header") {
    return (
      <div className={`p-4 md:w-5/12 sm:w-full text-center`}>
        <h2 className="text-lg lg:text-3xl text-wetAsphalt mb-2">
          <span className="font-semibold">TOTAL</span>
          <br />
          <span className="font-regular">{player.name}</span>
        </h2>
        <div className="text-2xl lg:text-7xl text-pomegranate font-thin">
          {player.totalScore}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-0 lg:p-4 w-8/12 lg:w-5/12 text-center ${
        isActive
          ? "bg-clouds shadow-md transform scale-105 transition-all border-pomegranate"
          : "bg-gray-50"
      } border-2 `}
    >
      <h2 className="text-lg lg:text-2xl mb-2">
        <span className="font-semibold">TURN</span>
        <br />
        <span className="font-regular">{player.name}</span>
      </h2>
      <div className="text-2xl lg:text-6xl font-thin">{player.turnScore}</div>
    </div>
  );
};

export default PlayerScore;
