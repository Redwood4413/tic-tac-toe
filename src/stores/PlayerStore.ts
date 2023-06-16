import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const usePlayerStore = defineStore('PlayerStore', {
  state: () => ({
    players: [{
      id: 1,
      nickname: 'Redwood' as string,
      points: 0 as number,
      hasTurn: false,
    },
    {
      id: 2,
      nickname: 'Bot ' as string,
      points: 0 as number,
      hasTurn: false,
    }],
  }),
});
