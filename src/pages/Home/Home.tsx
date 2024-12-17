// src/pages/Home/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { startNewGame } from "../../features/game/gameSlice";
import Header from "../../components/Layout/Header";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNewGame = () => {
    dispatch(startNewGame());
    navigate("/game");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow bg-gradient-to-b from-stone-50 to-stone-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl w-full">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
            Welcome to Two Dice Pig!
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Game Rules:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Roll dice to accumulate points in your turn</li>
              <li>If you roll a 1, you lose all points for the current turn</li>
              <li>
                You can choose to 'Hold' to bank your current turn's points
              </li>
              <li>First player to reach 100 points wins!</li>
            </ul>
          </div>

          <div className="text-center">
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

export default HomePage;
