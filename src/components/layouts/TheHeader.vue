<script lang=ts>
import { mapState } from 'pinia';
import { usePlayerStore } from '../../stores/PlayerStore';
import SettingsIcon from '../icons/SettingsIcon.vue';

export default {
  name: 'TheHeader',
  computed: {
    ...mapState(usePlayerStore, ['players']),
    turnClass: () => (hasTurn: boolean) => (hasTurn ? 'turn' : ''),
  },
  components: { SettingsIcon },
};
</script>

<template>
  <header>
    <div class="top">
      <div class="players">
        <div class="player" v-for="player in players" :key="player.id">
          <span :class="`nickname ${turnClass(player.hasTurn)}`">{{ player.nickname }}</span>
          <span class="points">{{ player.points }}</span>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="settings"
      @click="">
      <SettingsIcon />
    </button>
  </header>
</template>

<style lang="scss" scoped>
$font-color: rgb(221, 221, 221);

  header {
    display:flex;
    width:100%;
    justify-content: center;
    padding:1rem;
    align-items: center;
    position: relative;
    .top {
      display:flex;
      background: rgb(18,18,18);
      background: -moz-linear-gradient(145deg, rgba(18,18,18,1) 0%, rgba(64,64,64,0) 100%);
      background: -webkit-linear-gradient(145deg, rgba(18,18,18,1) 0%, rgba(64,64,64,0) 100%);
      background: linear-gradient(145deg, rgba(18,18,18,1) 0%, rgba(64,64,64,0) 100%);
      min-width:500px;
      color:$font-color;
      justify-content: center;
      border-radius: 5em;
      outline: 3px solid rgb(57, 119, 57);
      padding: 1rem;
      .players {
        display:flex;
        justify-content: center;
        gap:0.5em;
        width:100%;
        .player {
          display:flex;
          justify-content: space-between;
          gap:1em;
          width:100%;

          &:nth-child(even){
            border-left: 2px solid $font-color;
            flex-direction: row-reverse;
            padding: 0 0 0 0.5em;
          }
          .nickname {
            padding:0.2em 0.7em;
            border-radius:5em;
            &.turn {
              background: rgb(57, 119, 57);
            }
          }
          .points {
            background: rgb(0, 0, 0, 0.6);
            padding: 0.1em 0.3em;
            border-radius: 5em;
            width:2ch;
          }
        }
      }
    }
    .settings {
      position:absolute;
      display:flex;
      right:1em;
      justify-content: center;
      padding:0.6em;
      align-items: center;
      border-radius: 50%;
      outline: 3px solid rgb(57, 119, 57);
      aspect-ratio: 1/1;
    }
  }

</style>
