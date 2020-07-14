<template>
  <div>
    <h1>Room: {{store.getters.room}}</h1>
    <h2>Name: {{store.getters.name}}</h2>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import router from "../router";

export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      store.commit("updateRoom", router.currentRoute.value.params.id);
      if(!store.getters.name) {
        router.push("/name");
      }
    });

    return { store };
  }
};
</script>