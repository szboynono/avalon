<template>
  <div>
    <div class="border-bottom mb-4 pb-1">
      <v-missions :round="store.getters.round" :gameResult="gameResult" :missionList="missionList" />
      <div class="info">
        <p>Name: {{store.getters.name}}</p>
        <p>Role: <span :class="isBadGuy ? 'text-danger': 'text-primary'">{{store.getters.role}}</span></p>
        <p>{{currentLeaderText}} the leader</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import VMissions from "@/components/VMissions.vue";

export default {
  components: {
    VMissions,
  },
  setup() {
    const store = useStore();
    const gameResult = ref();
    const isBadGuy = ref(['Minion of Mordred', 'ASSASIN', 'MORGANA', 'OBERON', 'MORDRED'].includes(store.getters.role));
    const missionList = computed(() => {
      if (store.getters.players.length <= 5) {
        store.commit("updateMissionList", [2, 3, 2, 3, 3]);
        return [2, 3, 2, 3, 3];
      } else if (store.getters.players.length === 6) {
        store.commit("updateMissionList", [2, 3, 4, 3, 4]);
        return [2, 3, 4, 3, 4];
      } else if (store.getters.players.length === 7) {
        store.commit("updateMissionList", [2, 3, 3, 4, 4]);
        return [2, 3, 3, 4, 4];
      } else if (store.getters.players.length >= 8) {
        store.commit("updateMissionList", [3, 4, 4, 5, 5]);
        return [3, 4, 4, 5, 5];
      }
    });
    const currentLeaderText = computed(() =>
      store.getters.leader === store.getters.name
        ? "You are"
        : `${store.getters.leader} is`
    );

    watchEffect(() => {
      if (store.getters.missionSuccessResult.gameResult) {
        gameResult.value = store.getters.missionSuccessResult.gameResult;
      }
    });
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
      gameResult,
      missionList,
      isBadGuy
    };
  },
};
</script>
<style lang="scss" scoped>
.info {
  font-weight: bold;
  margin: 16px auto 0px;
  text-align: left;
  width: 297px;
}
</style>
