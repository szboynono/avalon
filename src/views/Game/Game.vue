<template>
  <div>
    <v-missions :round="store.getters.round" />
    <h1>{{currentLeaderText}} the leader</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import VMissions from "@/components/VMissions.vue";
import VList from "@/components/VList.vue";
import VButtons from "@/components/VButtons.vue";

export default {
  components: {
    VMissions
  },
  setup() {
    const store = useStore();
    const currentLeaderText = computed(() =>
      store.getters.leader === store.getters.name
        ? "You are"
        : `${store.getters.leader} is`
    );
    

    onMounted(() => {
      store.getters.socket.on("roundInfo", (roundInfo: any) => {
        store.commit("updateLeader", roundInfo.leader);
        store.commit("updateRound", roundInfo.round);
      });
      store.getters.socket.emit("askForFirstLeader");
    });
    return {
      currentLeaderText,
      store,
    };
  },
};
</script>
