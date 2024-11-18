// src/features/game/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { GameState } from './types';

const initialState: GameState = {
  players: [
    { id: 0, name: 'Player', totalScore: 0, turnScore: 0, isComputer: false },
    { id: 1, name: 'Computer', totalScore: 0, turnScore: 0, isComputer: true }
  ],
  activePlayer: 0,
  dice: [1, 1],
  gameOver: false,
  winner: null,
  isRolling: false
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    rollDice: (state) => {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      state.dice = [die1, die2];
      state.isRolling = false;

      // If either die is 1, lose turn score
      if (die1 === 1 || die2 === 1) {
        state.players[state.activePlayer].turnScore = 0;
        state.activePlayer = state.activePlayer === 0 ? 1 : 0;
      } 
      // Double 1s loses total score
      else if (die1 === 1 && die2 === 1) {
        state.players[state.activePlayer].totalScore = 0;
        state.players[state.activePlayer].turnScore = 0;
        state.activePlayer = state.activePlayer === 0 ? 1 : 0;
      } 
      // Add dice values to turn score
      else {
        state.players[state.activePlayer].turnScore += die1 + die2;
      }
    },
    
    hold: (state) => {
      const currentPlayer = state.players[state.activePlayer];
      currentPlayer.totalScore += currentPlayer.turnScore;
      currentPlayer.turnScore = 0;
      
      // Check for winner
      if (currentPlayer.totalScore >= 100) {
        state.gameOver = true;
        state.winner = currentPlayer.id;
      } else {
        state.activePlayer = state.activePlayer === 0 ? 1 : 0;
      }
    },

    startNewGame: () => initialState,
    
    setRolling: (state, action: PayloadAction<boolean>) => {
      state.isRolling = action.payload;
    }
  }
});

export const { rollDice, hold, startNewGame, setRolling } = gameSlice.actions;
export default gameSlice.reducer;