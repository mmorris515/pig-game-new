import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  decrementAsync,
  incrementIfOdd,
  selectCount,
} from "./counterSlice";

export default function Counter(): JSX.Element {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState("2");

  const value = Number(amount) || 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex w-full max-w-md flex-col items-center justify-center p-4 bg-gray-700 rounded-lg shadow-lg gap-4">
        <div className="flex w-full items-center justify-center gap-4">
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
            className="py-1 px-3 w-16 bg-red-500 text-white text-2xl lg:text-3xl cursor-pointer hover:bg-red-600 rounded-md"
          >
            -
          </button>
          <span className="bg-gray-200 text-gray-700 px-8 py-2 text-2xl lg:text-3xl rounded-md shadow-inner">
            {count}
          </span>
          <button
            aria-label="Increment value"
            className="py-1 px-3 w-16 bg-green-500 text-white text-2xl lg:text-3xl cursor-pointer hover:bg-green-600 rounded-md"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="relative">
            <input
              aria-label="Set amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="absolute inset-x-0 top-0 bg-gray-200 px-4 py-2 text-gray-700 rounded-sm text-center outline-none focus:outline-none focus:ring-2 ring-purple-600"
            />
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 w-full mt-10" // Adjusted margin for visibility
              onClick={() => dispatch(incrementByAmount(value))}
            >
              Add Amount
            </button>
          </div>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 w-full"
            onClick={() => dispatch(incrementAsync(value))}
          >
            Add Async
          </button>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 w-full"
            onClick={() => dispatch(decrementAsync(value))}
          >
            Subtract Async
          </button>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 w-full"
            onClick={() => dispatch(incrementIfOdd(value))}
          >
            Add If Odd
          </button>
        </div>
      </div>
    </div>
  );
}
