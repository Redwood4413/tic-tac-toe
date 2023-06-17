<script lang=ts>

export default {
  name: 'TheEscapeMenu',
  emits: ['close-menu'],
};
</script>

<template>
  <Transition>
    <div class="escape-menu">
      <div class="backdrop" title="Back" @click="$emit('close-menu')" @keypress="$emit('close-menu')" />
      <div class="menu-wrapper">
        <div class="buttons">
          <button type="button">Continue</button>
          <button type="button">Restart</button>
          <button type="button">Exit</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
$font-color: rgb(221, 221, 221);
$backdrop: 100;
.escape-menu {
  display:flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width:100%;
  height:100%;
  .backdrop {
    position: absolute;
    z-index:  $backdrop;
    backdrop-filter: blur(5px);
    width:100%;
    height:100%;
    cursor: pointer;
  }
  .menu-wrapper {
    z-index:  $backdrop + 1;
    padding:1em;
    min-width:250px;
    border-radius: 25px;
    border: 3px solid rgb(57, 119, 57);
    background: rgb(18,18,18);
    background: -moz-linear-gradient(145deg, rgb(49, 49, 49) 0%, rgba(64,64,64,1) 100%);
    background: -webkit-linear-gradient(145deg, rgba(49,49,49) 0%, rgba(64,64,64,1) 100%);
    background: linear-gradient(145deg, rgba(49,49,49) 0%, rgba(64,64,64,1) 100%);
    .buttons {
      display:flex;
      gap:0.5em;
      flex-direction: column;
      button {
        border: 1px solid gray;
        border-radius: 5em;
        transition: background .2s ease-in-out;
        &:hover {
          background: rgb(57, 119, 57);
        }
      }
    }
  }
}

</style>
