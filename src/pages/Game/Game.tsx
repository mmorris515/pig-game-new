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
        const opponentPlayer = players[(activePlayer + 1) % 2];
        const potentialTotalScore =
          currentPlayer.totalScore + currentPlayer.turnScore;
        const scoreDifference =
          currentPlayer.totalScore - opponentPlayer.totalScore;

        // Adjust strategy based on score difference and turn score
        const shouldHold =
          currentPlayer.turnScore >= 20 || // Hold if turn score is 20 or more
          (currentPlayer.turnScore >= 15 && scoreDifference > 10) || // Hold if turn score is 15 or more and leading by 10 points
          potentialTotalScore >= 100; // Always hold if reaching 100 points

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
    <div className="min-h-screen bg-gradient-to-b from-gray-20 to-gray-100 m-1 lg:m-4">
      <div className="h-screen flex flex-col p-0 lg:p-1 max-h-full">
        <>
          <div className="flex flex-row justify-between items-start">
            {/* Left Column - Player Scores */}
            <div className="flex flex-col justify-between items-center flex-auto space-y-96 lg:space-y-56">
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
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-grow justify-center items-center pt-12">
                <div className="bg-white rounded-xl p-4 flex self-start drop-shadow-[0_0px_3px_rgba(0,0,0,0.25)]">
                  <DicePair values={dice} isRolling={isRolling} />
                </div>
              </div>
              {!players[activePlayer].isComputer && (
                <div
                  title="Buttons container"
                  className="flex flex-col lg:flex-row self-center gap-10 lg:gap-5"
                >
                  <button
                    onClick={handleRoll}
                    disabled={isRolling}
                    className="bg-midnightBlue text-white px-2 lg:px-4 py-3 lg:py-2 rounded-lg text-xl lg:text-2xl  disabled:bg-gray-300 disabled:cursor-not-allowed
                      transform hover:scale-105 transition-all whitespace-nowrap"
                  >
                    Roll Dice
                  </button>
                  <button
                    onClick={() => dispatch(hold())}
                    disabled={isRolling}
                    className="bg-asbestos text-white px-2 lg:px-4 py-3 lg:py-2 rounded-lg text-xl lg:text-2xl disabled:bg-gray-300 disabled:cursor-not-allowed
                      transform hover:scale-105 transition-all whitespace-nowrap"
                  >
                    Hold
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Computer Scores */}
            <div className="flex flex-col justify-between items-center flex-auto space-y-96 lg:space-y-56">
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
