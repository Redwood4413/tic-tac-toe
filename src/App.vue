<script lang="ts">
import GamingBoard from './components/gaming-board/GamingBoard.vue';
import { usePlayerStore } from './stores/PlayerStore';
import { useGameStore } from './stores/GameStore';
import StartingScreen from './components/StartingScreen.vue';
import TheHeader from './components/layouts/TheHeader.vue';
import TheEscapeMenu from './components/layouts/TheEscapeMenu.vue';

export default {
  components: {
    StartingScreen,
    GamingBoard,
    TheHeader,
    TheEscapeMenu,
  },
  setup() {
    const gameStore = useGameStore();
    const playerStore = usePlayerStore();

    return { gameStore, playerStore };
  },
  data() {
    return {
      escapeMenu: {
        isVisible: false,
      },
      startingScreen: {
        isVisible: true,
      },
    };
  },
  methods: {
    showEscMenu() {
      this.escapeMenu.isVisible = true;
    },
    closeEscMenu() {
      this.escapeMenu.isVisible = false;
    },
    closeStartScreen() {
      this.startingScreen.isVisible = false;
    },
    showStartScreen() {
      this.startingScreen.isVisible = true;
    },
  },
};

</script>

<template>
  <Transition name="dialog">
    <StartingScreen v-if="startingScreen.isVisible" @close-menu="closeStartScreen" />
  </Transition>
  <Transition name="esc-menu">
    <TheEscapeMenu
      v-if="escapeMenu.isVisible"
      @show-menu="showStartScreen"
      @close-menu="closeEscMenu" />
  </Transition>
  <TheHeader @show-menu="showEscMenu" />
  <GamingBoard />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');

@import './reset.css';

:root {
  font-family: 'Quicksand', system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
.dialog-enter-active, .dialog-leave-active {
  transition: all .3s ease-in-out;
}
.dialog-enter-from, .dialog-leave-to {
  opacity: 0;
}

.esc-menu-enter-active, .esc-menu-leave-active {
  transition: all .3s ease-in-out;
}
.esc-menu.leave.from {
  transform: translateY(-30px);
}
.esc-menu-enter-from{
  opacity:0;
  .menu-wrapper {
    transition: all .3s ease-in-out;
    transform: translateY(-30px);
  }
}
.esc-menu-leave-to {
  opacity:0;
  .menu-wrapper {
    transition: all .3s ease-in-out;
    transform: translateY(30px);
  }
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  overflow: hidden;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.3em 0.6em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:focus-visible {
  outline: 3px auto red;
}

.card {
  padding: 2em;
}

#app {
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width:100vw;
}
.font-cursive {
  font-family: 'Shadows Into Light', cursive;
  font-size: x-large;
}
// @media (prefers-color-scheme: light) {
//   :root {
//     color: #213547;
//     background-color: #ffffff;
//   }
//   a:hover {
//     color: #747bff;
//   }
//   button {
//     background-color: #f9f9f9;
//   }
// }

</style>
