<template>
  <div>
    <h1>{{winner}} guys win!</h1>
  </div>
</template>

<script lang="ts">
import VButtons from "@/components/VButtons.vue";
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const winner = ref('');
    const store = useStore();
    onMounted(() => {
      winner.value = store.getters.winner
    })
    return {
      winner
    }
  }
};
</script>