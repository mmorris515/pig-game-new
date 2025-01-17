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
        <div className="text-lg lg:text-3xl text-wetAsphalt mb-2">
          <div className="font-semibold mb-2">TOTAL</div>
          <div className="font-regular mb-2">{player.name}</div>
        </div>
        <div className="text-5xl lg:text-7xl text-pomegranate font-semibold lg:font-thin">
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
      <div className="text-lg lg:text-2xl mb-2">
        <div className="font-semibold mb-2">TURN</div>
        <div className="font-regular mb-2">{player.name}</div>
      </div>
      <div className="text-5xl lg:text-6xl font-semibold lg:font-thin mb-2">
        {player.turnScore}
      </div>
    </div>
  );
};

export default PlayerScore;
