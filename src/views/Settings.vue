<template>

  <div class="container my-3">


    <div class="row justify-content-center">
      <div class="col-12 col-md-6">

        <h3 class="text-center">Settings</h3>
        <hr>

        <div class="row">

          <div class="col-6">

            <div class="mb-3">
              <label>Font face</label>
              <input type="text" class="form-control" v-model="config.fontFace">
            </div>

          </div><!-- col -->

          <div class="col-6">

            <div class="mb-3">
              <label>Font size</label>
              <input type="number" class="form-control" v-model.number="config.fontSize">
            </div>

          </div><!-- col -->

        </div><!-- row -->

        <div class="row my-5">
          <div class="col">
            <h4 class="text-center">Preview</h4>
            <textarea
                class="form-control"
                rows="5"
                v-bind:style="{fontSize: validFontSize + 'px', fontFamily: validFontFace}"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</textarea>

          </div>
        </div><!-- row -->

      </div><!-- col -->
    </div><!-- row -->


    <div class="row">
      <div class="col">

        <div class="d-flex justify-content-center">
          <button class="btn btn-secondary" @click="onClickSave">Save</button>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "Settings",

  data() {
    return {}
  },

  computed: {

    config: {
      get() {
        return this.$store.getters.getConfig
      },
      set(value) {
        this.$store.commit('setConfig', value)
      }
    },

    validFontSize: function () {
      if (this.config.fontSize < 8) return 8
      if (this.config.fontSize > 100) return 100

      return this.config.fontSize
    },

    validFontFace: function () {
      if (this.config.fontFace === "") {
        return 'monospace'
      } else {
        return this.config.fontFace
      }
    }


  },

  methods: {

    onClickSave: function () {

      this.$store.dispatch('saveConfigToStore', this.config)
          .then(() => {
            this.$router.push('/')
          })

    },

  },

}
</script>

<style scoped>

</style>
