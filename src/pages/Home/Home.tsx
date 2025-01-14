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
      <div className="bg-gradient-to-b from-stone-50 to-stone-100 flex flex-grow items-center justify-center p-4">
        <div
          title="Welcome Container"
          className="bg-white rounded-xl p-8 shadow-lg max-w-2xl w-full flex flex-col"
        >
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-wetAsphalt text-center">
            Welcome to Two Dice Pig!
          </h2>
          <div className="mb-6 p-4">
            <div title="Game Rules Container">
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Game Rules:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-wetAsphalt text-md md:text-lg">
                <li>Roll dice to accumulate points in your turn</li>
                <li>
                  If you roll a 1, you lose all points for the current turn
                </li>
                <li>
                  You can choose to 'Hold' to bank your current turn's points
                </li>
                <li>First player to reach 100 points wins!</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 mx-auto">
            <button
              onClick={handleNewGame}
              className="bg-midnightBlue text-white px-8 py-3 rounded-lg text-lg md:text-2xl transform hover:scale-105 transition-all shadow-md"
            >
              New Game
            </button>
          </div>
          <a
            href="/results"
            className="text-sm text-midnightBlue underline flex self-end ml-auto mt-3 md:mt-1"
          >
            View Results
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
