<script lang="ts">
import { mapStores } from 'pinia';
import GamingBoard from './components/GamingBoard.vue';
import { usePlayerStore } from './stores/PlayerStore';
import { useGameStore } from './stores/GameStore';
import StartingField from './components/StartingField.vue';
import TheHeader from './components/layouts/TheHeader.vue';
import TheEscapeMenu from './components/layouts/TheEscapeMenu.vue';

export default {
  components: {
    StartingField,
    GamingBoard,
    TheHeader,
    TheEscapeMenu,
  },
  data() {
    return {
      escapeMenu: {
        isVisible: false,
      },
    };
  },
  methods: {
    show() {
      this.escapeMenu.isVisible = true;
    },
    close() {
      this.escapeMenu.isVisible = false;
    },
  },

  computed: {
    ...mapStores(usePlayerStore, useGameStore),
  },
};

</script>

<template>
  <StartingField />
  <TheEscapeMenu v-if="escapeMenu.isVisible" @close-menu="close" />
  <TheHeader @show="show" />
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
  outline: 3px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  display:flex;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
}
.font-cursive {
  font-family: 'Shadows Into Light', cursive;
  font-size: x-large;
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

</style>
