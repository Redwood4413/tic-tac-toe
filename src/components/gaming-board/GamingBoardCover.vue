<script lang=ts>
import { usePlayerStore } from '../../stores/PlayerStore';

export default {
  name: 'GamingBoardCover',
  data: () => ({

  }),
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup() {
    const playerStore = usePlayerStore();
    return { playerStore };
  },
  methods: {
    handleClick(event: KeyboardEvent) {
      console.log(event.);
    },
  },
};
</script>

<template>
  <div
    class="cover"
    @click="handleClick"
    @keydown="handleClick($event)"
  >
    <h2>{{ message }}</h2>
  </div>
</template>

<style lang="scss" scoped>
.cover {
  position: absolute;
  display:flex;
  justify-content: center;
  align-items: center;
  z-index:1;
  width:100%;
  height:100%;
  cursor: pointer;
  backdrop-filter: blur(3px);
  background: rgba(0,0,0,0.5);
  h2 {
    font-size: larger;
    text-wrap: balance;
  }
}
</style>
