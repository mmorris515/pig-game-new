// src/components/PlayerScore/PlayerScore.tsx
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
      <div
        className={`p-4 rounded-lg md:w-5/12 sm:w-full text-center ${
          isActive
            ? "bg-red-100 shadow-md transform scale-105 transition-all border-red-600"
            : "bg-gray-50"
        } border-2`}
      >
        <h2 className="text-xl mb-2">
          <span className="font-bold">Total Score</span>
          <br />
          <span className="font-regular">{player.name}</span>
        </h2>
        <div className="text-3xl font-bold">{player.totalScore}</div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-lg md:w-5/12 sm:w-full text-center ${
        isActive
          ? "bg-red-100 shadow-md transform scale-105 transition-all border-red-600"
          : "bg-gray-50"
      } border-2`}
    >
      <h2 className="text-xl mb-2">
        <span className="font-bold">Turn Score</span>
        <br />
        <span className="font-regular">{player.name}</span>
      </h2>
      <div className="text-2xl font-semibold">{player.turnScore}</div>
    </div>
  );
};

export default PlayerScore;
