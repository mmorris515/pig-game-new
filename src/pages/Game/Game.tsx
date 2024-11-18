// src/components/Game/Game.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  rollDice,
  hold,
  startNewGame,
  setRolling,
} from "../../features/game/gameSlice";
import type { RootState } from "../../store";
import type { GameState } from "../../features/game/types";
import DicePair from "../../components/Dice/DicePair";
import PlayerScore from "../../components/PlayerScore/PlayerScore";

export const Game: React.FC = () => {
  const dispatch = useAppDispatch();
  const { players, activePlayer, dice, gameOver, winner, isRolling } =
    useAppSelector((state: RootState) => state.game as GameState);

  useEffect(() => {
    if (players[activePlayer].isComputer && !gameOver) {
      const timer = setTimeout(() => {
        const shouldHold = players[activePlayer].turnScore >= 20;
        if (shouldHold) {
          dispatch(hold());
        } else {
          dispatch(setRolling(true));
          setTimeout(() => dispatch(rollDice()), 1000);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activePlayer, players, gameOver, dispatch]);

  const handleRoll = () => {
    dispatch(setRolling(true));
    setTimeout(() => dispatch(rollDice()), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-6">
      <div className="max-w-4xl mx-auto px-4 h-full flex flex-col justify-between gap-8">
        {gameOver ? (
          <div className="text-center bg-white rounded-xl p-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">
              {players[winner!].name} wins!
            </h1>
            <button
              onClick={() => dispatch(startNewGame())}
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg
                hover:bg-green-600 transform hover:scale-105 transition-all"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            {/* Container Div */}
            <div className="flex justify-between items-center">
              {/* Header Scores */}
              <div className="flex justify-between w-full max-w-4xl mx-auto">
                {players.map((player, index) => (
                  <div key={`header-${player.id}`} className="w-1/3">
                    <PlayerScore
                      player={player}
                      isActive={activePlayer === index}
                      type="header"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dice */}
            <div className="flex justify-center items-center">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <DicePair values={dice} isRolling={isRolling} />
              </div>
            </div>

            {/* Footer Scores and Buttons */}
            <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
              <div className="w-1/3">
                <PlayerScore
                  player={players[0]}
                  isActive={activePlayer === 0}
                  type="footer"
                />
              </div>

              {!players[activePlayer].isComputer && (
                <div className="flex space-x-4">
                  <button
                    onClick={handleRoll}
                    disabled={isRolling}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg
                      hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed
                      transform hover:scale-105 transition-all"
                  >
                    Roll Dice
                  </button>
                  <button
                    onClick={() => dispatch(hold())}
                    disabled={isRolling}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg
                      hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed
                      transform hover:scale-105 transition-all"
                  >
                    Hold
                  </button>
                </div>
              )}

              <div className="w-1/3">
                <PlayerScore
                  player={players[1]}
                  isActive={activePlayer === 1}
                  type="footer"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
