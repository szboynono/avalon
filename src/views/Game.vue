<template>
<div>
  <h1>Game</h1>
  <h2>{{store.getters.players}}</h2>
</div>
</template>
<script lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import router from "../router";
window.onbeforeunload = function(e: any) {
    return "Don't leave";
};

export default {
  setup() {
    const store = useStore();
    return {store}
  }
};
</script>