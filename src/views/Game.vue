<template>
  <h1>Game</h1>
</template>
<script lang="ts">
import { onMounted } from "vue";
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    // onMounted(() => {
    //   // socket.on("userList", (users: string[]) => {
    //   //   store.commit("updatePlayers", users);
    //   //   console.log(users)
    //   // });
    // });
  }
};
</script>