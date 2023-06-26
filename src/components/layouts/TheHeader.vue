<script lang=ts>
import { useGameStore } from '../../stores/GameStore';
import { usePlayerStore } from '../../stores/PlayerStore';
import SettingsIcon from '../icons/SettingsIcon.vue';

export default {
  name: 'TheHeader',
  emits: ['show-menu'],
  setup() {
    const playerStore = usePlayerStore();
    const gameStore = useGameStore();
    return { playerStore, gameStore };
  },
  computed: {
    turnClass: () => (hasTurn: boolean) => (hasTurn ? 'turn' : ''),
    players() {
      return this.playerStore.players;
    },
    rounds() {
      return this.gameStore.rounds;
    },
    moveCount() {
      return this.gameStore.moveCount;
    },
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
        <div class="details">
          <div class="round">
            <span>Round:</span>
            <span>{{ rounds.current }}/{{ rounds.final }}</span>
          </div>
          <div class="move">
            <span>Move:</span>
            <span>{{ moveCount }}</span>
          </div>
          <button
            type="button"
            class="settings"
            @click="$emit('show-menu')">
            <SettingsIcon />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
$font-color: rgb(221, 221, 221);
$border-width: 3px;
$green: rgb(57, 119, 57);

  header {
    display:flex;
    position: fixed;
    z-index:1;
    top:0;
    padding:1em;
    .top {
      display:flex;
      position:relative;
      background: rgb(18,18,18);
      background: -moz-linear-gradient(145deg, rgba(18,18,18,1) 0%, rgba(64,64,64,1) 100%);
      background: -webkit-linear-gradient(145deg, rgba(18,18,18,1) 0%, rgba(64,64,64,1) 100%);
      background: linear-gradient(145deg, rgba(18,18,18,1) 0%, rgba(64,64,64,1) 100%);
      min-width:500px;
      white-space: nowrap;
      color:$font-color;
      justify-content: center;
      border-radius: 5em;
      border: $border-width solid $green;
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
      .details {
        display:flex;
        position: absolute;
        top:100%;
        background: rgb(18,18,18);
        background: -moz-linear-gradient(145deg, rgba(18,18,18,1) 0%, rgba(64,64,64,1) 100%);
        background: -webkit-linear-gradient(145deg, rgba(18,18,18,1) 0%, rgba(64,64,64,1) 100%);
        background: linear-gradient(145deg, rgba(18,18,18,1) 0%, rgba(64,64,64,1) 100%);
        justify-content: center;
        align-items: center;
        padding:0.3em;
        gap:1em;
        font-size: smaller;
        font-weight: bold;
        text-align: center;
        border: $border-width solid $green;
        border-radius: 0 0 1em 1em;
        & > * {
          display:flex;
          flex-direction: column;
          background: none;
          padding:0.3em;
          border-radius: 0.4em;
        }
        .settings {
          display:flex;
          justify-content: center;
          align-items: center;
          transition: background .2s ease-in-out;
          &:hover {
            background: rgb(255,255,255, .2);
          }
        }
      }
    }
  }

</style>
