// src/components/Layout/Header.tsx
import React from "react";
import PigIcon from "./PigIcon";

const Header: React.FC = () => {
  return (
    <header className="bg-red-600 text-white p-4 flex items-center justify-between shadow-md">
      <PigIcon />
      <h1 className="text-2xl font-bold">Two Dice Pig</h1>
    </header>
  );
};

export default Header;
