<template>
  <div>
    <div class="border-bottom mb-4 pb-4">
    <v-missions :round="store.getters.round" :gameResult="gameResult" />
    <h2>{{currentLeaderText}} the leader</h2>
    <h4>Your Role: {{store.getters.role}}</h4>
    <h4>Your name: {{store.getters.name}}</h4>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed, watch, watchEffect } from "vue";
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
    const gameResult = ref();
    const currentLeaderText = computed(() =>
      store.getters.leader === store.getters.name
        ? "You are"
        : `${store.getters.leader} is`
    );
    
    watchEffect(() => {
      if(store.getters.missionSuccessResult.gameResult) {
        gameResult.value = store.getters.missionSuccessResult.gameResult;
      }
    })
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
      gameResult
    };
  },
};
</script>
