<template>
<div>
  <h1>Game</h1>
  <button-group :primaryText="'What is my role'" :primaryFn="onGetRoleClick"/>
</div>
</template>
<script lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import ButtonGroup from "@/components/ButtonGroup.vue";
import router from "../router";

window.onbeforeunload = function(e: any) {
    return "Don't leave";
};

export default {
  components: {
    ButtonGroup
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