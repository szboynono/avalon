<template>
  <div>
    game
    <button class="btn btn-primary" @click="onNextClick">next</button>
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const onNextClick = () => {
      store.getters.socket.emit("turnOver");
    };
    onMounted(() => {
      store.getters.socket.on('leader', (leader: any) => {
        console.log(leader);
      });
      store.getters.socket.emit("askForFirstLeader");
    });
    return { onNextClick };
  }
};
</script>
