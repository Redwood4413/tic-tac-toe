<script lang="ts">
import CloseIcon from './icons/CloseIcon.vue';

export default {
  name: 'StartingField',
  methods: {
    backdropClick(e: MouseEvent) {
      const dialogDimensions = this.dialog.getBoundingClientRect();
      if (e.clientX < dialogDimensions.left
                || e.clientX > dialogDimensions.right
                || e.clientY < dialogDimensions.top
                || e.clientY > dialogDimensions.bottom) {
        this.hideDialog();
      }
    },
    hideDialog() {
      this.dialog.close();
    },
    showDialog() {
      this.dialog.showModal();
    },
  },
  computed: {
    dialog() {
      return this.$refs.dialog as HTMLDialogElement;
    },
    body() {
      return document.querySelector('body')!;
    },
  },
  mounted() {
    this.showDialog();
    this.body.classList.add('hidden-overflow');
    this.dialog.addEventListener('mouseup', this.backdropClick);
    this.dialog.addEventListener('close', this.hideDialog);
  },
  unmounted() {
    this.body.classList.remove('hidden-overflow');
  },
  components: { CloseIcon },
};
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" class="base-dialog">
      <div class="nav">
        <CloseIcon />
      </div>
    </dialog>
  </Teleport>
</template>

<style lang="scss" scoped>
  .base-dialog {
    background: rgba(209, 209, 255, 0.5);
    padding:0;
    border:0;
    outline: 0;
    width: 600px;
    min-height: 400px;
    max-height: 90vh;
    border-radius: 5px;
    overflow-y: auto;
    &::backdrop {
      background-color: #1D202170;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      cursor: pointer;
    }
    .nav {
      display:flex;
      justify-content: flex-end;
    }
  }
  @media (width <= 600px) {
    .base-dialog {
      min-width:100vw;
    }
  }
</style>
