<script lang="ts">

export default {
  name: 'BaseSubmitButton',
  props: {
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    shake: false as boolean,
    timing: 300 as number, // ms
  }),
  methods: {
    toggleShake() {
      requestAnimationFrame(() => {
        this.shake = true;

        setTimeout(() => {
          this.shake = false;
        }, this.timing);
      });
    },
  },
  computed: {
    shakeClass() {
      return this.shake ? 'shake' : '';
    },
  },
};
</script>

<template>
  <button @click="toggleShake" type="submit" :class="`submit ${shakeClass}`">
    <slot />
  </button>

</template>

<style lang="scss" scoped>
.submit {
  padding:0.5em 1.5em;
  font-size: large;
  background: rgb(207,111,30);
  background: -moz-linear-gradient(145deg, rgba(207,111,30,1) 0%, rgba(167,6,6,1) 100%);
  background: -webkit-linear-gradient(145deg, rgba(207,111,30,1) 0%, rgba(167,6,6,1) 100%);
  background: linear-gradient(145deg, rgba(207,111,30,1) 0%, rgba(167,6,6,1) 100%);
  &.shake {
    animation: jump-shaking .3s ease-in-out;
  }
  &:hover {
    opacity: 0.8;
  }
}

@keyframes jump-shaking {
  0% { transform: translateX(0) }
  25% { transform: translateY(-5px) }
  50% { transform: translateY(-5px) rotate(17deg) }
  75% { transform: translateY(-5px) rotate(-17deg) }
  100% { transform: translateY(0) rotate(0) }
}
</style>
