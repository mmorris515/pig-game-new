// src/components/Layout/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handlePigClick = () => {
    // TODO: Add animation and sound effect
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md">
      <div
        className="flex items-center cursor-pointer hover:animate-bounce"
        onClick={handlePigClick}
      >
        <h1 className="text-2xl font-bold">Two Dice Pig</h1>
      </div>
      {/* Future: Add additional header elements if needed */}
    </header>
  );
};

export default Header;
