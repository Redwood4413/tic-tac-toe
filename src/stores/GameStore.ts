import { defineStore } from 'pinia';
import { PlayerIdState } from '../components/GamingBoard.vue';

// eslint-disable-next-line import/prefer-default-export
export const useGameStore = defineStore('GameStore', {
  state: () => ({
    rounds: 0 as number,
    size: 3 as number,
    hasStarted: true as boolean,
    inProgress: true as boolean,
    hasEnded: false as boolean,
    playerTurn: 0 as PlayerIdState,
  }),
  getters: {
    turn(state) {
      return state.playerTurn;
    },
  },
  actions: {
    startTheGame() {
      this.initTurn();
      this.hasStarted = true;
      this.inProgress = true;
    },
    initTurn() {
      const random = Math.random();
      const gameStore = useGameStore();

      if (gameStore.inProgress) return;

      if (random <= 0.5) {
        this.playerTurn = 1;
      } else {
        this.playerTurn = 2;
      }
    },
    setTurn() {
      const gameStore = useGameStore();
      const { hasEnded, hasStarted } = gameStore;

      if (!hasStarted) return;
      if (hasEnded) {
        this.playerTurn = 0;
        return;
      }

      if (this.playerTurn === 1) this.playerTurn = 2;
      else this.playerTurn = 1;
    },
  },
});
