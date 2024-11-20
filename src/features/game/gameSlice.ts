import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { GameState, GameHistoryEntry } from './types';

const initialState: GameState = {
  players: [
    { id: 0, name: 'Player', totalScore: 0, turnScore: 0, isComputer: false },
    { id: 1, name: 'Computer', totalScore: 0, turnScore: 0, isComputer: true }
  ],
  activePlayer: 0,
  dice: [1, 1],
  gameOver: false,
  winner: null,
  isRolling: false,
  gameHistory: [] // Initialize gameHistory as an empty array
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
      
      // Check for winner. SET TO LOWER SCORE FOR TESTING
      if (currentPlayer.totalScore >= 25) {
        state.gameOver = true;
        state.winner = currentPlayer.id;
        // Add game result to history
        state.gameHistory.push({
          winner: currentPlayer.id,
          finalScores: [state.players[0].totalScore, state.players[1].totalScore],
          playerRolls: state.dice.reduce((a, b) => a + b, 0)
        });
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
