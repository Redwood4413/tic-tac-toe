<script lang=ts>
import { PropType } from 'vue';
import { useGameStore } from '../stores/GameStore';

export default {
  name: 'GamingBoardTile',
  emits: ['change-state'],
  props: {
    coords: {
      type: Object,
      required: true,
    },
    stateProp: {
      type: Number as PropType<0 | 1 | 2>,
      required: true,
    },
    isWin: {
      type: Boolean,
      required: true,
    },
    // test: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  setup() {
    const gameStore = useGameStore();
    return { gameStore };
  },
  data: () => ({
    state: 0 as 0 | 1 | 2,
  }),
  mounted() {
    this.state = this.stateProp;
  },
  methods: {
    handleCLick(x: number, y: number) {
      if (this.state !== 0) return;
      this.state = this.gameStore.turn;
      this.gameStore.setTurn();

      this.$emit('change-state', { x, y }, this.gameStore.turn);
    },
  },
  computed: {
    winClass() {
      return this.isWin ? 'win' : '';
    },
    // testClass() {
    //   return this.test ? 'test' : '';
    // },
  },
};
</script>

<template>
  <div
    :class="`tile ${winClass}`"
    @keypress="handleCLick(coords.x, coords.y)"
    @click="handleCLick(coords.x, coords.y)"
    tabindex="0"
  >
    <span v-if="state === 1" class="cross" />
    <span v-else-if="state === 2" class="nought" />
  </div>
</template>

<style lang="scss" scoped>
$color: rgb(33, 33, 33);
$width: 5px;
  .tile {
    display:flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background: rgb(207, 192, 107);
    aspect-ratio: 1/1;
    height:100px;
    cursor: pointer;
    &.win {
      background: rgb(102, 205, 88);
    }
    &.test {
      background: rgb(151, 137, 137);
    }
    .cross {
      &::after, &::before {
        content: "";
        position: absolute;
        background: $color;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        border-radius: 25px;
        width:$width;
        height:60px;
      }
      &::after {
        transform: rotate(-45deg);
      }
      &::before {
        transform: rotate(45deg);

      }
    }
    .nought {
      border: $width solid $color;
      border-radius: 50%;
      padding:25px;
    }
  }
</style>
