import React from "react";

interface DieProps {
  value: number;
  isRolling: boolean;
}

const Die: React.FC<DieProps> = ({ value, isRolling }) => {
  // Array of dot positions for each die value
  const dotPositions = {
    1: ["center"],
    2: ["top-right", "bottom-left"],
    3: ["top-right", "center", "bottom-left"],
    4: ["top-left", "top-right", "bottom-left", "bottom-right"],
    5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
    6: [
      "top-left",
      "top-right",
      "middle-left",
      "middle-right",
      "bottom-left",
      "bottom-right",
    ],
  };

  const getDotClass = (position: string) => {
    const baseClass = "w-3 h-3 bg-black rounded-full"; // Adjusted size
    switch (position) {
      case "center":
        return `${baseClass} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`;
      case "top-left":
        return `${baseClass} absolute top-2 sm:top-4 left-2 sm:left-4`; // Adjusted position
      case "top-right":
        return `${baseClass} absolute top-2 sm:top-4 right-2 sm:right-4`; // Adjusted position
      case "middle-left":
        return `${baseClass} absolute top-1/2 left-2 sm:left-4 -translate-y-1/2`; // Adjusted position
      case "middle-right":
        return `${baseClass} absolute top-1/2 right-2 sm:right-4 -translate-y-1/2`; // Adjusted position
      case "bottom-left":
        return `${baseClass} absolute bottom-2 sm:bottom-4 left-2 sm:left-4`; // Adjusted position
      case "bottom-right":
        return `${baseClass} absolute bottom-2 sm:bottom-4 right-2 sm:right-4`; // Adjusted position
      default:
        return baseClass;
    }
  };

  return (
    <div
      className={`
        relative w-20 h-20
        bg-white rounded-sm 
        shadow-lg border-2 border-gray-200
        ${
          isRolling
            ? "animate-roll"
            : "transform transition-transform duration-500"
        }
      `}
    >
      {dotPositions[value as keyof typeof dotPositions].map(
        (position, index) => (
          <div key={index} className={getDotClass(position)} />
        )
      )}
    </div>
  );
};

export default Die;
