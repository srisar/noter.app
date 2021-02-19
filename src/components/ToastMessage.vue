<template>
  <div class="position-fixed bottom-0 end-50 p-3" style="z-index: 100">

    <div class="toast align-items-center text-white bg-secondary border-0" :class="visibility" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" @click="hide"></button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ToastMessage",
  props: {
    'visible': String
  },

  data() {
    return {
      message: "hello, toast!",
    }
  },

  computed: {

    visibility: {

      get: function () {
        return this.visible
      },
      set: function (value) {
        this.visibleClass = value
      }

    },

  },


  methods: {

    show: function () {
      this.visibleClass = 'show'
    },

    hide: function () {
      this.visibleClass = 'hide'
    },

  },

}
</script>

<style scoped>

</style>
