<script lang="ts">
import {
  uniqueNamesGenerator, Config, colors, animals,
} from 'unique-names-generator';

import { mapActions } from 'pinia';
import RandomIcon from './icons/RandomIcon.vue';
import BaseSubmitButton from './UI/BaseSubmitButton.vue';
import { useGameStore } from '../stores/GameStore';
import { usePlayerStore } from '../stores/PlayerStore';

export default {
  name: 'StartingScreen',
  emits: ['close-menu'],
  setup() {
    const gameStore = useGameStore();
    const playerStore = usePlayerStore();
    return { gameStore, playerStore };
  },
  data: () => ({
    input: {
      first: {
        data: '' as string,
        isValid: true,
        maxLen: 24,
      },
      second: {
        data: '' as string,
        isValid: true,
        maxLen: 24,
      },
      size: {
        data: 3 as number,
        isValid: true,
        min: 3,
        max: 100,
      },
      inRow: {
        data: 3 as number,
        isValid: true,
        min: 3,
        max: 100,
      },
      rounds: {
        data: 1 as number,
        isValid: true,
        min: 1,
        max: 100,
      },
    },
    formIsValid: true,
  }),
  watch: {
    first() {
      const { first } = this.input;

      if (first.data.length > first.maxLen) {
        this.input.first.isValid = false;
      } else {
        this.input.first.isValid = true;
      }
    },
    second() {
      const { second } = this.input;
      if (second.data.length > second.maxLen) {
        this.input.second.isValid = false;
      } else {
        this.input.second.isValid = true;
      }
    },
    size() {
      const { size } = this.input;
      if (size.data < size.min || size.data > size.max || !size.data) {
        this.input.size.isValid = false;
      } else {
        this.gameStore.setSize(size.data);
        this.input.inRow.max = size.data;
        this.input.size.isValid = true;
      }
    },
    inRow() {
      const { inRow } = this.input;
      if (inRow.data < inRow.min || inRow.data > inRow.max || !inRow.data) {
        this.input.inRow.isValid = false;
      } else {
        this.input.inRow.isValid = true;
      }
    },
    rounds() {
      const { rounds } = this.input;

      if (rounds.data < rounds.min || rounds.data > rounds.max || !rounds.data) {
        this.input.rounds.isValid = false;
      } else {
        this.input.rounds.isValid = true;
      }
    },
  },
  computed: {
    dialog(): HTMLDialogElement {
      const dialog: HTMLDialogElement = this.$refs.dialog!;
      return dialog;
    },
    first() {
      return this.input.first.data;
    },
    second() {
      return this.input.second.data;
    },
    size() {
      return this.input.size.data;
    },
    inRow() {
      return this.input.inRow.data;
    },
    rounds() {
      return this.input.rounds.data;
    },
    ...mapActions(useGameStore, ['setSize']),
  },
  methods: {
    hideDialog() {
      this.dialog.close();
    },
    showDialog() {
      this.dialog.showModal();
    },
    initGame() {
      this.validateInputs();
      const { formIsValid, setNicknames, setInRow } = this;
      if (!formIsValid) return;

      setNicknames();
      setInRow(this.input.inRow.data);
      this.$emit('close-menu');
    },
    setNicknames() {
      const { first, second } = this;

      if (first) {
        this.playerStore.setNickname(1, first);
      } else {
        this.playerStore.setNickname(1, 'Guest');
      }

      if (second) {
        this.playerStore.setNickname(2, second);
      } else {
        this.playerStore.setNickname(2, 'Guest');
      }
    },
    setInRow(inRow: number) {
      this.gameStore.setInRow(inRow);
    },
    randomizeNickname(id: 0 | 1) {
      const config: Config = {
        dictionaries: [colors, animals],
        separator: ' ',
        style: 'capital',
      };
      const randomName: string = uniqueNamesGenerator(config);

      if (id === 0) {
        this.input.first.data = randomName;
      } else {
        this.input.second.data = randomName;
      }
    },
    validateInputs() {
      const {
        first, inRow, rounds, second, size,
      } = this.input;
      if (first.isValid && second.isValid && inRow.isValid && rounds.isValid && size.isValid) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },
  },

  mounted() {
    this.input.inRow.max = this.input.size.data;
    this.input.first.data = this.playerStore.players[0].nickname;
    this.input.second.data = this.playerStore.players[1].nickname;
    this.input.size.data = this.gameStore.boardSize;
    this.input.inRow.data = this.gameStore.inRowToWin;
    this.input.rounds.data = this.gameStore.rounds;

    this.showDialog();
  },
  components: { RandomIcon, BaseSubmitButton },
};
</script>

<template>

  <dialog ref="dialog" class="starting-field">
    <h2>Tic Tac Toe</h2>
    <form class="form" @submit.prevent="initGame" novalidate>
      <div class="players">
        <div class="player-wrapper">
          <div class="player">
            <button
              type="button"
              class="random"
              @click="randomizeNickname(0)">
              <RandomIcon />
            </button>
            <label for="first" />
            <input
              id="first"
              type="text"
              placeholder="Guest"
              class="nickname"
              v-model="input.first.data"
            />
          </div>
          <div class="info">
            <p v-if="!input.first.isValid && first.length > 0">Too many characters!</p>
            <span class=count>{{ input.first.data.length }}/{{ input.first.maxLen }}</span>
          </div>
        </div>
        <span class="font-cursive">VS</span>
        <div class="player-wrapper">
          <div :class="`player `">
            <label for="second" />
            <input
              id="second"
              type="text"
              placeholder="Guest"
              class="nickname"
              v-model="input.second.data"
            />
            <button
              type="button"
              class="random"
              @click="randomizeNickname(1)">
              <RandomIcon />
            </button>
          </div>
          <div class="info">
            <p v-if="!input.second.isValid && second.length > 0">Too many characters!</p>
            <span class=count>{{ input.second.data.length }}/{{ input.second.maxLen }}</span>
          </div>
        </div>
      </div>
      <div class="settings">
        <div class="size-wrapper">
          <label for="size">Size</label>
          <input
            type="number"
            id="size"
            :min="input.size.min"
            :max="input.size.max"
            v-model.number="input.size.data"
          />
          <p v-if="!input.size.isValid">{{ input.size.min }} - {{ input.size.max }}</p>
        </div>
        <div class="row-win-wrapper">
          <label for="row">In-row</label>
          <input
            type="number"
            id="row"
            :min="input.inRow.min"
            :max="input.inRow.max"
            v-model.number="input.inRow.data"
          />
          <p v-if="!input.inRow.isValid">{{ input.inRow.min }} - {{ input.inRow.max }}</p>
        </div>
        <div class="rounds-wrapper">
          <label for="rounds">Rounds</label>
          <input
            type="number"
            id="rounds"
            :min="input.rounds.min"
            :max="input.rounds.max"
            v-model.number="input.rounds.data"
          />
          <p v-if="!input.rounds.isValid">{{ input.rounds.min }} - {{ input.rounds.max }}</p>
        </div>
      </div>
      <BaseSubmitButton :isValid="formIsValid">Start</BaseSubmitButton>
    </form>
  </dialog>
</template>

<style lang="scss" scoped>

  .starting-field {
    display:flex;
    align-items: center;
    flex-direction: column;
    padding:2em;
    background: none;
    border:0;
    outline: 0;
    min-width: 600px;
    min-height: 400px;
    max-height: 90vh;
    overflow-y: auto;
    gap:1em;
    p {
      font-size: small;
      font-weight: 700;
      &.red {
      color: rgb(186, 22, 22)
    }
  }
    .invalid {
      outline: 2px solid rgb(186, 22, 22);
    }

    button {
      user-select: none;
    }
    h2 {
      font-size: 2em;
      line-height: 1.1;
    }
    &::backdrop {
      background-color: #32193c70;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    .form {
      display:flex;
      flex-direction: column;
      align-items: center;
      gap:1em;
      .players {
        display:flex;
        align-items: center;
        flex-wrap: wrap;
        gap:1em;
        button {
          border-radius: 0;
          border:0;
        }
        .player-wrapper {
          display:flex;
          flex-direction: column;
          .player{
            display:flex;
            border: 2px solid rgb(57, 119, 57);
            input {
              padding:0.5em;
              font-family: inherit;
              border:0;
            }
          }
          .info {
            display:flex;
            justify-content: space-between;
            font-size: small;
            color:red;
            font-weight: 700;
            .count {
              color:white;
              margin: 0 0 0 auto;
            }
          }
        }
      }
      .settings {
        display:flex;
        gap:1em;
        & > * {
          display:flex;
          gap:0.5em;
          flex-direction: column;
          width:54px;
          p{
            color:red;
            font-weight: 700;
          }
          input {
            padding:0;
            aspect-ratio: 1/1;
            text-align: center;
            border: 2px solid rgb(57, 119, 57);
            &::-webkit-inner-spin-button, &::-webkit-inner-spin-button{
              -webkit-appearance: none;
              margin: 0;
            }
          }
        }
      }

    }
  }

  @media (width <= 600px) {
    .starting-field {
      min-width: 100vw;
      .form {
        .players {
          flex-direction: column;
          .player-wrapper:last-child {
            .player {
              flex-direction: row-reverse;
            }
          }
        }
      }
    }
  }
</style>
