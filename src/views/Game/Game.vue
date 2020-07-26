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

    // const updateMappedItems = (index: any) => {
    //   mappedItems.value[index].selected = !mappedItems.value[index].selected;
    //   store.getters.socket.emit("updateSelections", mappedItems.value);
    // };

    // const onGoClick = () => {
    //   store.getters.socket.emit("turnOver");
    // };

    // const computeHowManyMoreManRequired = computed(
    //   () =>
    //     manRequired.value -
    //     mappedItems.value.filter((item: any) => item.selected === true).length
    // );

    onMounted(() => {
      store.getters.socket.on("roundInfo", (roundInfo: any) => {
        store.commit("updateLeader", roundInfo.leader);
        store.commit("updateRound", roundInfo.round);
        // if (roundInfo.round === 0 || roundInfo.round === 2) {
        //   manRequired.value = 2;
        // } else {
        //   manRequired.value = 3;
        // }
      });
      store.getters.socket.emit("askForFirstLeader");
      // store.getters.socket.on("afterUpdateSelection", (selections: any) => {
      //   mappedItems.value = selections;
      // });
    });
    return {
      // onGoClick,
      currentLeaderText,
      store,
      // updateMappedItems,
      // mappedItems,
      // computeHowManyMoreManRequired,
    };
  },
};
</script>
