<template>
  <div>
    <v-missions :round="round" />
    <button class="btn btn-primary" @click="onNextClick">next</button>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import VMissions from "@/components/VMissions.vue";

export default {
  components: {
    VMissions
  },
  setup() {
    const store = useStore();
    const round = ref(0);

    const onNextClick = () => {
      store.getters.socket.emit("turnOver");
    };
    onMounted(() => {
      store.getters.socket.on("roundInfo", (roundInfo: any) => {
        round.value = roundInfo.round;
      });
      store.getters.socket.emit("askForFirstLeader");
    });
    return { onNextClick, round };
  }
};
</script>
