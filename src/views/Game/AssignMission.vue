<template>
  <div>
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
import VList from "@/components/VList.vue";
import VButtons from "@/components/VButtons.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";

export default {
  components: {
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

    const updateMappedItems = (index: any) => {
      mappedItems.value[index].selected = !mappedItems.value[index].selected;
      store.commit("updatePlayers", mappedItems.value);
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
      store.commit("updatePlayers", mappedItems.value);
      store.getters.socket.on("afterUpdateSelection", (selections: any) => {
        mappedItems.value = selections;
      });
    });
    return {
      store,
      mappedItems,
      computeHowManyMoreManRequired,
      updateMappedItems,
      onGoClick,
    };
  },
};
</script>