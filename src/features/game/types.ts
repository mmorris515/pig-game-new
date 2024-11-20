// src/features/game/types.ts

export interface Player {
    id: number;
    name: string;
    totalScore: number;
    turnScore: number;
    isComputer: boolean;
  }

  export interface GameHistoryEntry {
    winner: number;
    finalScores: [number, number];
    playerRolls: number;
  }
  
  export interface GameState {
    players: Player[];
    activePlayer: number;
    dice: [number, number];
    gameOver: boolean;
    winner: number | null;
    isRolling: boolean;
    gameHistory: GameHistoryEntry[];
  }