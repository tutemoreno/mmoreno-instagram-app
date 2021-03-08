<template>
  <div class="modal fade" id="default" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" :class="[modalSize]">
      <div class="modal-content">
        <header class="modal-header">
          <slot name="header"></slot>
        </header>
        <body class="modal-body">
          <slot name="body"></slot>
        </body>
        <footer class="modal-footer" :class="{ 'd-none': !showFooter }">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    showFooter: {
      type: Boolean,
      default: false,
    },
    modalSize: {
      type: String,
      default: null,
    },
  },
};
</script>
