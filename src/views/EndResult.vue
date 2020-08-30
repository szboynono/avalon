<template>
  <div>
    <h1 class="mt-5">{{winner}} guys win!</h1>
    <v-buttons :primaryText="'Play again'" :primaryFn="onNewGameClick" />
  </div>
</template>

<script lang="ts">
import VButtons from "@/components/VButtons.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import router from "../router";
import axios from "axios";

export default {
  components: {
    VButtons,
  },
  setup() {
    const winner = ref("");
    const store = useStore();
    onMounted(() => {
      winner.value = store.getters.winner;
    });

    const onNewGameClick = () => {
      const newRoom = store.getters.room + '1';
      store.getters.socket.emit('newGame', newRoom);
      store.commit("reset");
      store.commit("updateNewGame", true);
      router.push('/room/' + store.getters.room);
    };

    return {
      store,
      winner,
      onNewGameClick,
    };
  },
};
</script>