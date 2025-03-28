import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { startNewGame, resetGameHistory } from "../../features/game/gameSlice";
import Header from "../../components/Layout/Header";

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gameHistory } = useAppSelector((state) => state.game);

  const handleNewGame = () => {
    dispatch(startNewGame());
    navigate("/game");
  };

  const handleResetHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the game history?"
    );
    if (confirmed) {
      dispatch(resetGameHistory());
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow bg-gradient-to-b from-stone-50 to-stone-100 p-2 md:p-16 overflow-auto">
        <div className="max-w-full md:max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg mt-28 md:mt-0">
          <h2 className="text-3xl font-bold mb-6 text-wetAsphalt text-center">
            Game Results
          </h2>

          {gameHistory.length === 0 ? (
            <p className="text-center text-gray-600">No games played yet</p>
          ) : (
            <div className="flex flex-row flex-wrap">
              <table className="w-full border-collapse text-xs md:text-base">
                <thead>
                  <tr className="bg-red-50">
                    <th className="p-1 md:p-3 border text-left">Game</th>
                    <th className="p-1 md:p-3 border text-left font-bold">
                      Result
                    </th>
                    <th className="p-1 md:p-3 border text-left">Final Score</th>
                    <th className="p-1 md:p-3 border text-left">
                      Player Rolls
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((game, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gradient-to-b from-stone-50 to-stone-100"
                    >
                      <td className="p-1 md:p-3 border">{index + 1}</td>
                      <td
                        className={`p-1 md:p-3 border ${
                          game.winner === 0
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }`}
                      >
                        {game.winner === 0 ? "Win" : "Loss"}
                      </td>
                      <td className="p-1 md:p-3 border">
                        {game.finalScores.join(" - ")}
                      </td>
                      <td className="p-1 md:p-3 border">{game.playerRolls}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="text-center mt-10 flex flex-col md:flex-row justify-center items-center gap-10 mx-auto">
            <button
              onClick={handleResetHistory}
              className="bg-asbestos text-white px-8 py-3 rounded-lg text-xl transform hover:scale-105 transition-all
                shadow-md"
            >
              Reset History
            </button>
            <button
              onClick={handleNewGame}
              className="bg-midnightBlue text-white px-8 py-3 rounded-lg text-xl transform hover:scale-105 transition-all
                shadow-md"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
