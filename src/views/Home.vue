<template>
  <div class="home">
    <h1>AVALON</h1>
    <v-buttons :primaryText="'Start Game'" :primaryFn="onStart" :secondaryText="'Join Game'" />
  </div>
</template>

<script>
// @ is an alias to /src
import VButtons from "@/components/VButtons.vue";
import router from "../router";

export default {
  components: {
    VButtons
  },
  setup() {
    function onStart() {
      router.push("/name");
    }
    return {
      onStart
    };
  }
};
</script>

<style lang="scss" scoped>
  .home {
    margin-top: 8rem;
  }
</style>
