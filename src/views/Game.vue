<template>
<div>
  <h1>Game</h1>
  <v-buttons :primaryText="'What is my role'" :primaryFn="onGetRoleClick"/>
</div>
</template>
<script lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import VButtons from "@/components/VButtons.vue";
import router from "../router";

window.onbeforeunload = function(e: any) {
    return "Don't leave";
};

export default {
  components: {
    VButtons
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.getters.socket.on('giveRole', (role: any) => {
        console.log(role);
      })
    });

    function onGetRoleClick() {
      store.getters.socket.emit('requestRole');
    }
    return {store, onGetRoleClick}
  }
};
</script>