<template>
  <div>
    <v-missions :round="round" />
    <h1>{{currentLeader}} the leader</h1>
    <v-list :items="store.getters.players" :leader="leaderName"/>
    <button class="btn btn-primary" @click="onNextClick">next</button>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import VMissions from "@/components/VMissions.vue";
import VList from "@/components/VList.vue";

export default {
  components: {
    VMissions,
    VList
  },
  setup() {
    const store = useStore();
    const round = ref(0);
    const leaderName = ref("");

    const currentLeaderText = computed(() =>
      leaderName.value === store.getters.name
        ? "You are"
        : `${leaderName.value} is`
    );

    const onNextClick = () => {
      store.getters.socket.emit("turnOver");
    };
    onMounted(() => {
      store.getters.socket.on("roundInfo", (roundInfo: any) => {
        leaderName.value = roundInfo.leader;
        round.value = roundInfo.round;
      });
      store.getters.socket.emit("askForFirstLeader");
    });
    return { onNextClick, round, currentLeaderText, store, leaderName };
  }
};
</script>
