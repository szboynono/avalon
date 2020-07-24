<template>
  <div>
    <v-missions :round="store.getters.round" />
    <h1>{{currentLeaderText}} the leader</h1>
    <router-view></router-view>
    <div>
      <p
        v-if="computeHowManyMoreManRequired > 0"
      >We still need {{computeHowManyMoreManRequired}} more.</p>
      <p v-else>All Set!</p>
    </div>
    <v-list :items="mappedItems" :leader="store.getters.leader" @list-clicked="updateMappedItems" />
    <v-buttons
      v-if="computeHowManyMoreManRequired <= 0"
      :primary-text="'Go'"
      :primaryFn="onGoClick"
    />
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
    VMissions,
    VList,
    VButtons,
  },
  setup() {
    const store = useStore();
    const manRequired = ref(0);
    const mappedItems = ref(
      store.getters.players.map((player: any) => ({
        ...player,
        selected: false,
      }))
    );

    const currentLeaderText = computed(() =>
      store.getters.leader === store.getters.name
        ? "You are"
        : `${store.getters.leader} is`
    );

    const updateMappedItems = (index: any) => {
      mappedItems.value[index].selected = !mappedItems.value[index].selected;
      store.getters.socket.emit("updateSelections", mappedItems.value);
    };

    const onGoClick = () => {
      store.getters.socket.emit("turnOver");
    };

    const computeHowManyMoreManRequired = computed(
      () =>
        manRequired.value -
        mappedItems.value.filter((item: any) => item.selected === true).length
    );

    onMounted(() => {
      store.getters.socket.on("roundInfo", (roundInfo: any) => {
        store.commit("updateLeader", roundInfo.leader);
        store.commit("updateRound", roundInfo.round);
        if (roundInfo.round === 0 || roundInfo.round === 2) {
          manRequired.value = 2;
        } else {
          manRequired.value = 3;
        }
      });
      store.getters.socket.emit("askForFirstLeader");
      store.getters.socket.on("afterUpdateSelection", (selections: any) => {
        mappedItems.value = selections;
      });
    });
    return {
      onGoClick,
      currentLeaderText,
      store,
      updateMappedItems,
      mappedItems,
      computeHowManyMoreManRequired,
    };
  },
};
</script>
