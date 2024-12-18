import React from "react";
import PigIcon from "./PigIcon";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-red-600 text-white p-2 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <PigIcon />
      </div>
      <div className="flex-1 flex justify-center">
        <Link to="/">
          <h1 className="text-2xl font-bold hover:drop-shadow-[0_4px_6px_rgba(255,255,255,0.5)] active:drop-shadow-[0_4px_6px_rgba(255,255,255,0.5)] transition-shadow duration-300">
            Two Dice Pig
          </h1>
        </Link>
      </div>
      <div className="w-12"></div>
    </header>
  );
};

export default Header;
