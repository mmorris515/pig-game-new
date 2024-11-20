import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { startNewGame } from "../../features/game/gameSlice";
import Header from "../../components/Layout/Header";

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gameHistory } = useAppSelector((state) => state.game);

  const handleNewGame = () => {
    dispatch(startNewGame());
    navigate("/game");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow bg-gradient-to-b from-blue-50 to-blue-100 p-4 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
            Game Results
          </h2>

          {gameHistory.length === 0 ? (
            <p className="text-center text-gray-600">No games played yet</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-3 border text-left">Game</th>
                  <th className="p-3 border text-left">Result</th>
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
                        game.winner === 0 ? "text-green-600" : "text-red-600"
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
              className="bg-green-500 text-white px-8 py-3 rounded-lg text-xl
                hover:bg-green-600 transform hover:scale-105 transition-all
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
