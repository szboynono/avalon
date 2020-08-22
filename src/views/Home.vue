<template>
  <div class="home">
    <h1>AVALON</h1>
    <v-buttons :primaryText="'Start Game'" :primaryFn="onStart" :secondaryText="'Join Game'" :secondaryFn="onJoin"/>
  </div>
</template>

<script>
// @ is an alias to /src
import VButtons from "@/components/VButtons.vue";
import router from "../router";

export default {
  components: {
    VButtons,
  },
  setup() {
    function onStart() {
      router.push("/name");
    }
    function onJoin() {
      router.push("/join");
    }
    return {
      onStart,
      onJoin
    };
  }
};
</script>

<style lang="scss" scoped>
  .home {
    margin-top: 8rem;
  }
</style>
