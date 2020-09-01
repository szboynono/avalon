<template>
  <div class="home">
    <h1>AVAL<div class="d-inline-block animate__animated animate__flip animate__delay-1s">O</div>N</h1>
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

    h1{
      font-size: 5rem;
      letter-spacing: -12px;
    }

    margin-top: 8rem;
  }
</style>
