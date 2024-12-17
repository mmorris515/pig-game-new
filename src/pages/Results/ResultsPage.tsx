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
      <div className="flex-grow bg-gradient-to-b from-stone-50 to-stone-100 p-16 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-600 text-center">
            Game Results
          </h2>

          {gameHistory.length === 0 ? (
            <p className="text-center text-gray-600">No games played yet</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-red-50">
                  <th className="p-3 border text-left">Game</th>
                  <th className="p-3 border text-left font-bold">Result</th>
                  <th className="p-3 border text-left">Final Score</th>
                  <th className="p-3 border text-left">Player Rolls</th>
                </tr>
              </thead>
              <tbody>
                {gameHistory.map((game, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="p-3 border">{index + 1}</td>
                    <td
                      className={`p-3 border ${
                        game.winner === 0
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }`}
                    >
                      {game.winner === 0 ? "Win" : "Loss"}
                    </td>
                    <td className="p-3 border">
                      {game.finalScores.join(" - ")}
                    </td>
                    <td className="p-3 border">{game.playerRolls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="text-center mt-6">
            <button
              onClick={handleNewGame}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg text-xl
                hover:bg-gray-600 transform hover:scale-105 transition-all
                shadow-md"
            >
              New Game
            </button>
            <button
              onClick={handleResetHistory}
              className="bg-gray-400 text-white px-8 py-3 rounded-lg text-xl
                hover:bg-red-300 transform hover:scale-105 transition-all
                shadow-md ml-4"
            >
              Reset History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
