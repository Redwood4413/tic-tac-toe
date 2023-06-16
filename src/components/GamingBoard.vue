<script lang=ts>
import { mapState } from 'pinia';
import GamingBoardTile from './GamingBoardTile.vue';
import { useGameStore } from '../stores/GameStore';

type Cell = 0 | 1 | 2;
type Coords = { x: number, y: number };
export type PlayerIdState = 0 | 1 | 2;

export default {
  name: 'GamingBoard',
  data: () => ({
    board: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ] as Cell[][],
    inRowToWin: 3,
    lastClick: {
      by: 0 as PlayerIdState,
      x: 0 as number,
      y: 0 as number,
    },
    boardSize: 3 as number,
    zoom: 1 as number,
    position: {
      x: 50 as number,
      y: 50 as number,
    },
  }),
  setup() {
    const gameStore = useGameStore();
    return { gameStore };
  },
  computed: {
    scale() {
      return {
        zoom: this.zoom,
      };
    },
    ...mapState(useGameStore, ['hasStarted']),
  },
  methods: {
    handleScroll(e) {
      const zoom = e.deltaY / 500;
      if (this.zoom <= 0.6) this.zoom = 0.6;
      if (this.zoom >= 5) this.zoom = 5;
      console.log(e.layerX);
      this.position.x = e.layerX;
      this.zoom += zoom;
    },
    startTheGame() {
      this.gameStore.startTheGame();
    },
    setBoard() {
      const { boardSize } = this;
      let { board } = this;
      board = [];
      console.log(board);
    },
    assignState(at: Coords, clickedBy: PlayerIdState) {
      const { board, lastClick, checkWinner } = this;

      if (!this.gameStore.hasStarted) return;

      board[at.y][at.x] = clickedBy;
      lastClick.by = clickedBy;
      lastClick.x = at.x;
      lastClick.y = at.y;

      checkWinner(clickedBy);
    },
    setWinner(id: PlayerIdState, msg: string) {
      console.log(`${id} ${msg}.`);
    },
    isWinner(array: Cell[]): boolean {
      const { inRowToWin, lastClick } = this;

      let isWin: boolean = false;
      // if (array.length < inRowToWin) return false;

      array.forEach((_, index) => {
        const toCheck = array.slice(index, inRowToWin + index);
        if (toCheck.length < inRowToWin) return false;
        if (isWin) return isWin;

        isWin = toCheck.every((id: Cell) => id === lastClick.by);

        return isWin;
      });
      return isWin;
    },
    checkWinner(id: PlayerIdState) {
      const { isWinner, setWinner } = this;
      const {
        getRowArray, getColumnArray, getDiagonalBottomToRight, getDiagonalTopToRight,
      } = this;

      const rowArray: Cell[] = getRowArray();
      if (isWinner(rowArray)) {
        setWinner(id, 'wins in a row!');
        return;
      }
      const columnArray: Cell[] = getColumnArray();
      if (isWinner(columnArray)) {
        setWinner(id, 'wins in a column!');
        return;
      }

      const diagonalBottomToRight: Cell[] = getDiagonalBottomToRight();
      const iagonalTopToRight: Cell[] = getDiagonalTopToRight();

      if (isWinner(diagonalBottomToRight) || isWinner(iagonalTopToRight)) {
        setWinner(id, 'wins in a diagonal!');
      }
    },
    getRowArray(): Cell[] {
      const { board, lastClick } = this;
      const { y } = lastClick;

      const row: Cell[] = board[y];

      return row;
    },

    getColumnArray(): Cell[] {
      const { board, lastClick } = this;
      const { x } = lastClick;
      const column: Cell[] = [];

      for (let i = 0; i < board.length; i += 1) {
        column.push(board[i][x]);
      }
      return column;
    },
    getDiagonalTopToRight(): Cell[] {
      const { board, lastClick } = this;
      const { x, y } = lastClick;

      let borderTopLeft: Coords = { x: 0, y: 0 };

      if (y > x) {
        borderTopLeft = {
          x: 0,
          y: y - x,
        };
      }
      if (y < x) {
        borderTopLeft = {
          x: x - y,
          y: 0,
        };
      }

      const topToRight: Cell[] = [];
      for (let i = 0; board[borderTopLeft.y + i]?.[borderTopLeft.x + i] !== undefined; i += 1) {
        topToRight.push(board[borderTopLeft.y + i][borderTopLeft.x + i]);
      }
      return topToRight;
    },
    getDiagonalBottomToRight(): Cell[] {
      const { board, lastClick } = this;
      const { x, y } = lastClick;

      let borderBottomLeft: Coords = { x: 0, y: board.length - 1 };

      if (x + y + 1 > board.length) {
        borderBottomLeft = {
          x: Math.abs(board[y].length - 1 - x - y),
          y: board.length - 1,
        };
      }
      if (x + y + 1 < board.length) {
        borderBottomLeft = {
          x: 0,
          y: x + y,
        };
      }
      const bottomToRight: Cell[] = [];
      // eslint-disable-next-line vue/max-len
      for (let i = 0; board[borderBottomLeft.y - i]?.[borderBottomLeft.x + i] !== undefined; i += 1) {
        bottomToRight.push(board[borderBottomLeft.y - i][borderBottomLeft.x + i]);
      }
      return bottomToRight;
    },
  },
  components: { GamingBoardTile },
};
</script>

<template>
  <div
    class="gaming-board"
    @wheel="handleScroll($event)"
    :style="{
      scale: zoom,
      left: `${position.x}%`,
      top: `${position.y}%`,
    }"
  >
    <div class="cover" v-if="!hasStarted">
      <button type="button" @click="startTheGame">Start</button>
    </div>
    <!-- <input type="number" @change="setBoard" v-model="boardSize" /> -->
    <div
      v-for="(row, y) in board"
      class="row"
      :key="y"
    >
      <GamingBoardTile
        :stateProp="board[y][x]"
        v-for="(_, x) in board[y]"
        :key="y * row.length + x "
        :coords="{ x, y }"
        @change-state="assignState"
        :isWin="false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$gap: 2px;
  .gaming-board {
    display:flex;
    flex-direction: column;
    gap:$gap;
    transition: scale .2s ease-in;
    position: absolute;
    //transform: translate(50%,-50%);
    .cover {
      position: absolute;
      display:flex;
      justify-content: center;
      align-items: center;
      z-index:1;
      width:100%;
      height:100%;
      backdrop-filter: blur(5px);
      background: rgba(0,0,0,0.5);
    }
    .row {
      display:flex;
      gap:$gap;
    }
  }
</style>
