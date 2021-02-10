<template>
  <div class="home" style="height: 100%">

    <NotePad></NotePad>

  </div>
</template>

<script>
// @ is an alias to /src
import NotePad from "@/components/NotePad";

export default {
  name: 'Home',
  components: {
    NotePad,
  }
}
</script>
