<template>
  <div class="home">
    <h1>AVALON</h1>
    <button-group :primaryText="'Start Game'" :primaryFn="onStart" :secondaryText="'Join Game'" />
  </div>
</template>

<script>
// @ is an alias to /src
import ButtonGroup from "@/components/ButtonGroup.vue";
import router from "../router";

export default {
  components: {
    ButtonGroup
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
