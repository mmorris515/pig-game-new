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
    <div className="min-h-screen bg-gradient-to-b from-gray-20 to-gray-100">
      <div className="h-screen flex flex-col p-4 sm:p-6">
        {gameOver ? (
          <div className="flex-grow flex items-center justify-center">
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
          </div>
        ) : (
          <>
            {/* Top Section - Player Total Scores */}
            <div className="flex justify-between items-start gap-4 mb-8">
              <div className="flex-1 flex justify-center">
                <PlayerScore
                  player={players[0]}
                  isActive={activePlayer === 0}
                  type="header"
                />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerScore
                  player={players[1]}
                  isActive={activePlayer === 1}
                  type="header"
                />
              </div>
            </div>

            {/* Middle Section - Dice */}
            <div className="flex-grow flex justify-center items-center">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
                <DicePair values={dice} isRolling={isRolling} />
              </div>
            </div>

            {/* Bottom Section - Current Scores and Buttons */}
            <div className="flex justify-between items-center gap-4 mt-8">
              <div className="flex-1 flex justify-center">
                <PlayerScore
                  player={players[0]}
                  isActive={activePlayer === 0}
                  type="footer"
                />
              </div>

              {!players[activePlayer].isComputer && (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <button
                    onClick={handleRoll}
                    disabled={isRolling}
                    className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg
                      hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed
                      transform hover:scale-105 transition-all whitespace-nowrap"
                  >
                    Roll Dice
                  </button>
                  <button
                    onClick={() => dispatch(hold())}
                    disabled={isRolling}
                    className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg
                      hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed
                      transform hover:scale-105 transition-all whitespace-nowrap"
                  >
                    Hold
                  </button>
                </div>
              )}

              <div className="flex-1 flex justify-center">
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
