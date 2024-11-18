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
        className={`p-4 rounded-lg w-full text-center ${
          isActive
            ? "bg-blue-100 shadow-md transform scale-105 transition-all"
            : "bg-gray-50"
        } ${player.isComputer ? "border-red-200" : "border-blue-200"} border-2`}
      >
        <h2 className="text-xl font-bold mb-2">{player.name}</h2>
        <div className="text-3xl font-bold">{player.totalScore}</div>
        {isActive && (
          <div className="mt-2 px-3 py-1 bg-yellow-100 rounded-full text-sm text-gray-700">
            Current Turn
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-600">Current Turn</p>
      <p className="text-2xl font-semibold">{player.turnScore}</p>
    </div>
  );
};

export default PlayerScore;
