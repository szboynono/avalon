<template>
  <div>
    <v-missions :round="round" />
    <h1>{{currentLeaderText}} the leader</h1>
    <p>{{manRequired}}</p>
    <v-list :items="mappedItems" :leader="leaderName" @list-clicked="updateMappedItems"/>
    <button class="btn btn-primary" @click="onNextClick">next</button>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed, watch } from "vue";
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
    const manRequired = ref(0);
    const leaderName = ref("");
    const mappedItems = ref(store.getters.players.map((player: any) => ({
      ...player,
      selected: false
    })));

    const currentLeaderText = computed(() =>
      leaderName.value === store.getters.name
        ? "You are"
        : `${leaderName.value} is`
    );

    const updateMappedItems = (index: any) => {
      mappedItems.value[index].selected = !mappedItems.value[index].selected
    }

    const onNextClick = () => {
      store.getters.socket.emit("turnOver");
    };

    watch(round, () => {
      console.log(round.value);
      if(round.value === 0 || round.value === 2) {
        manRequired.value = 2;
      } else {
        manRequired.value = 3;
      }
    });
    onMounted(() => {
      store.getters.socket.on("roundInfo", (roundInfo: any) => {
        leaderName.value = roundInfo.leader;
        round.value = roundInfo.round;
      });
      store.getters.socket.emit("askForFirstLeader");
    });
    return { onNextClick, round, currentLeaderText, store, leaderName, updateMappedItems, mappedItems, manRequired };
  }
};
</script>
