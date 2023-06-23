<script lang=ts>
import GamingBoardTile from './GamingBoardTile.vue';
import { useGameStore } from '../stores/GameStore';
import { usePlayerStore } from '../stores/PlayerStore';

type Cell = 0 | 1 | 2;
type Coords = { x: number, y: number };

export default {
  name: 'GamingBoard',
  data: () => ({
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ] as Cell[][],
    lastClick: {
      by: 0 as Player.Id,
      x: 0 as number,
      y: 0 as number,
    },
    moveCount: 0 as number,
    zoom: 1 as number,
    position: {
      x: 0 as number,
      y: 0 as number,
    },
  }),
  setup() {
    const gameStore = useGameStore();
    const playerStore = usePlayerStore();
    return { gameStore, playerStore };
  },
  watch: {
    boardSize(size) {
      this.setBoard(size);
    },
  },
  computed: {
    scale() {
      return {
        zoom: this.zoom,
      };
    },
    boardSize() {
      return this.gameStore.boardSize;
    },
    inRowToWin() {
      return this.gameStore.inRowToWin;
    },
  },
  methods: {
    handleScroll(e) {
      const zoom = e.deltaY / 1000;
      if (this.zoom <= 0.6) this.zoom = 0.6;
      if (this.zoom >= 5) this.zoom = 5;

      this.zoom += zoom;
    },
    startTheGame() {
      this.gameStore.startTheGame();
    },
    checkIfDraw() {
      const { moveCount, board, setDraw } = this;

      const tileCount: number = board[0].length * board.length;

      if (moveCount === tileCount) setDraw();
    },
    setDraw() {
      console.log('draw');
    },
    setBoard(boardSize: number) {
      this.board = [];

      for (let i = 0; i < boardSize; i += 1) {
        this.board.push([]);
        for (let j = 0; j < boardSize; j += 1) {
          this.board[i].push(0);
        }
      }
    },
    assignState(at: Coords, clickedBy: Player.Id) {
      const {
        board, lastClick, checkWinner, checkIfDraw,
      } = this;

      if (!this.gameStore.hasStarted) return;

      board[at.y][at.x] = clickedBy;
      lastClick.by = clickedBy;
      lastClick.x = at.x;
      lastClick.y = at.y;

      this.moveCount += 1;
      checkIfDraw();
      checkWinner(clickedBy);
    },
    setWinner(id: Player.Id, msg: string) {
      console.log(`${id} ${msg}.`);
      this.playerStore.addPoint(id);
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
    checkWinner(id: Player.Id) {
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
      const diagonalTopToRight: Cell[] = getDiagonalTopToRight();

      if (isWinner(diagonalBottomToRight) || isWinner(diagonalTopToRight)) {
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
    ref="gamingBoard"
    :style="{
      scale: zoom,
      // left: `${position.x}%`,
      // top: `${position.y}%`,
    }"
  >

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
    position: absolute;
    flex-direction: column;
    gap:$gap;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    transition: scale .1s linear;
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
