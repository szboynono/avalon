<template>
<div>
  <h1>Click the button to reveal you role</h1>
  <h2 v-if="isRoleRevealed">{{store.getters.role}}</h2>
  <v-buttons :primaryText="buttonText" :primaryFn="onGetRoleClick"/>
</div>
</template>
<script lang="ts">
import { onMounted, ref, watch } from "vue";
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
    const isRoleRevealed = ref(false);
    const buttonText = ref('Reveal Myself');

    onMounted(() => {
      store.getters.socket.on('giveRole', (role: string) => {
        store.commit('updateRole', role);
      })
    });

    watch(isRoleRevealed, () => {
      if(isRoleRevealed.value) {
        buttonText.value = 'Continue';
      }
    });

    const onGetRoleClick = () => {
      if(isRoleRevealed.value) {
        console.log('h');
      }
      isRoleRevealed.value = true;
      store.getters.socket.emit('requestRole');
    }
    return {store, onGetRoleClick, isRoleRevealed, buttonText}
  }
};
</script>