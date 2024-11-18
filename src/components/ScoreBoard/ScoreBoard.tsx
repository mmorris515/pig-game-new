// src/components/ScoreBoard/ScoreBoard.tsx
import React from "react";
import type { Player } from "../../features/game/types";

interface ScoreBoardProps {
  players: Player[];
  activePlayer: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players, activePlayer }) => {
  return (
    <div className="flex justify-between w-full max-w-4xl mx-auto">
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`flex flex-col items-center ${
            activePlayer === index ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <div
            className={`p-4 rounded-lg w-full text-center ${
              activePlayer === index
                ? "bg-blue-100 shadow-md transform scale-105 transition-all"
                : "bg-gray-50"
            } ${
              player.isComputer ? "border-red-200" : "border-blue-200"
            } border-2`}
          >
            <h2 className="text-xl font-bold mb-2">{player.name}</h2>
            <div className="text-3xl font-bold">{player.totalScore}</div>
            {activePlayer === index && (
              <div className="mt-2 px-3 py-1 bg-yellow-100 rounded-full text-sm text-gray-700">
                Current Turn
              </div>
            )}
          </div>

          <div className="mt-auto pt-4">
            <p className="text-sm text-gray-600">Current Turn</p>
            <p className="text-2xl font-semibold">{player.turnScore}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;
