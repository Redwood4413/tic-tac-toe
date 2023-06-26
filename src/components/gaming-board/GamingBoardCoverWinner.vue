<script lang=ts>
import { usePlayerStore } from '../../stores/PlayerStore';

export default {
  name: 'GamingBoardCover',
  data: () => ({
    message: 'aaaaaaaaa' as string,
  }),
  setup() {
    const playerStore = usePlayerStore();
    return { playerStore };
  },
  methods: {
    showCover() {

    },
    hideCover() {

    },
  },
};
</script>

<template>
  <div class="cover" />
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
  backdrop-filter: blur(3px);
  background: rgba(0,0,0,0.5);
  h2 {
    font-size: larger;
    text-wrap: balance;
  }
}
</style>
