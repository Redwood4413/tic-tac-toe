<script lang="ts">
export default {
  name: 'CloseIcon',
};
</script>

<template>
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    version="1.1"
    class="close-icon"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="currentColor"
    stroke="#ffffff">
    <g id="SVGRepo_bgCarrier" stroke-width="0" />
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
    <g id="SVGRepo_iconCarrier">
      <title>Close</title>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Close">
          <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24" />
          <line
            x1="16.9999"
            y1="7"
            x2="7.00001"
            y2="16.9999"
            id="Path"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round" />
          <line
            x1="7.00006"
            y1="7"
            x2="17"
            y2="16.9999"
            id="Path"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round" />
        </g>
      </g>
    </g>
  </svg>
</template>

<style lang="scss" scoped>
  .close-icon {

    &:hover{
      background: rgba($color: #000000, $alpha: 0.3);
    }
  }

</style>
