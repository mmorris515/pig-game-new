import React from "react";
import Die from "./Die";

interface DicePairProps {
  values: [number, number];
  isRolling: boolean;
}

const DicePair: React.FC<DicePairProps> = ({ values, isRolling }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <Die value={values[0]} isRolling={isRolling} />
      <Die value={values[1]} isRolling={isRolling} />
    </div>
  );
};

export default DicePair;
