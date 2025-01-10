import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { players, activePlayer, dice, gameOver, winner, isRolling } =
    useAppSelector((state: RootState) => state.game as GameState);

  useEffect(() => {
    if (players[activePlayer].isComputer && !gameOver) {
      const timer = setTimeout(() => {
        const currentPlayer = players[activePlayer];
        const potentialTotalScore =
          currentPlayer.totalScore + currentPlayer.turnScore;
        const shouldHold =
          // SET TO 25 FOR TESTING
          currentPlayer.turnScore >= 20 || potentialTotalScore >= 25;
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

  useEffect(() => {
    if (gameOver) {
      navigate("/results");
    }
  }, [gameOver, navigate]);

  const handleRoll = () => {
    dispatch(setRolling(true));
    setTimeout(() => dispatch(rollDice()), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-20 to-gray-100 m-4">
      <div className="h-screen flex flex-col p-2 sm:p-3 max-h-screen">
        <>
          <div className="flex flex-row justify-between items-start">
            {/* Left Column - Player Scores */}
            <div className="flex flex-col justify-between items-center flex-auto space-y-72">
              <PlayerScore
                player={players[0]}
                isActive={activePlayer === 0}
                type="header"
              />
              <PlayerScore
                player={players[0]}
                isActive={activePlayer === 0}
                type="footer"
              />
            </div>

            {/* Middle Column - Dice and Buttons */}
            <div className="flex flex-col justify-between items-center flex-1 space-y-48">
              <div className="flex-grow flex justify-center items-center pt-12">
                <div className="bg-white rounded-xl p-4 sm:p-6 drop-shadow-[0_0px_3px_rgba(0,0,0,0.25)]">
                  <DicePair values={dice} isRolling={isRolling} />
                </div>
              </div>
              {!players[activePlayer].isComputer && (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 m-2">
                  <button
                    onClick={handleRoll}
                    disabled={isRolling}
                    className="bg-midnightBlue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-2xl disabled:bg-gray-300 disabled:cursor-not-allowed
                      transform hover:scale-105 transition-all whitespace-nowrap"
                  >
                    Roll Dice
                  </button>
                  <button
                    onClick={() => dispatch(hold())}
                    disabled={isRolling}
                    className="bg-asbestos text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-2xl disabled:bg-gray-300 disabled:cursor-not-allowed
                      transform hover:scale-105 transition-all whitespace-nowrap"
                  >
                    Hold
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Computer Scores */}
            <div className="flex flex-col justify-between items-center flex-auto space-y-72">
              <PlayerScore
                player={players[1]}
                isActive={activePlayer === 1}
                type="header"
              />
              <PlayerScore
                player={players[1]}
                isActive={activePlayer === 1}
                type="footer"
              />
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Game;
