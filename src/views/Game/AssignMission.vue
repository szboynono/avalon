<template>
  <div>
    <div>
      <p v-if="computeHowManyMoreManRequired > 0">We still need {{computeHowManyMoreManRequired}} more.</p>
      <p v-else>We still need {{computeHowManyMoreManRequired}} more.</p>
    </div>
    <v-list :items="mappedItems" :leader="store.getters.leader" @list-clicked="updateMappedItems" />
    <v-buttons
      :primary-text="'Go'"
      :primaryFn="onGoClick"
    />
  </div>
</template>
<script lang="ts">
import VList from "@/components/VList.vue";
import VButtons from "@/components/VButtons.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed, watch, watchEffect } from "vue";
import router from '../../router';

export default {
  components: {
    VList,
    VButtons,
  },
  setup() {
    const store = useStore();
    const mappedItems = ref(
      store.getters.players.map((player: any) => ({
        ...player,
        selected: false,
      }))
    );
    const manRequired = ref(0);

    const updateMappedItems = (index: any) => {
      mappedItems.value[index].selected = !mappedItems.value[index].selected;
      store.commit("updatePlayers", mappedItems.value);
      store.getters.socket.emit("updateSelections", mappedItems.value);
    };

    const onGoClick = () => {
      router.push('approve-mission');
    };

    const computeHowManyMoreManRequired = computed(() => {
      return (
        manRequired.value -
        mappedItems.value.filter((item: any) => item.selected === true).length
      );
    });

    watchEffect(
      () =>
        (manRequired.value =
          store.getters.round === 0 || store.getters.round === 2 ? 2 : 3)
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