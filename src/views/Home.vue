<template>
  <div class="home">
    <img class="animate__animated animate__flipInX" src="../assets/magic.svg" alt="magic" />
    <h1 class="text-dark">AVALON</h1>
    <v-buttons
      :primaryText="'Start Game'"
      :primaryFn="onStart"
      :secondaryText="'Join Game'"
      :secondaryFn="onJoin"
    />
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
      onJoin,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  img {
    width: 286px;
  }

  h1 {
    font-size: 5rem;
    font-weight: bold;
    letter-spacing: -12px;
  }

  margin-top: 4rem;
}
</style>
