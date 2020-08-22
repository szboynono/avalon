<template>
  <div>
    <div>
      <p v-if="store.getters.leader === store.getters.name">Please select {{computeHowManyMoreManRequired}} more.</p>
      <p v-else>{{store.getters.leader}} is selecting people, We still need {{computeHowManyMoreManRequired}} more.</p>
    </div>
    <v-list :items="mappedItems" :leader="store.getters.leader" @list-clicked="updateMappedItems" />
    <v-buttons
      v-if="isLeader && computeHowManyMoreManRequired === 0"
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
      store.getters.socket.emit('readyToVote');
    };

    const computeHowManyMoreManRequired = computed(() => {
      return (
        manRequired.value -
        mappedItems.value.filter((item: any) => item.selected === true).length
      );
    });

    const isLeader = computed(() => store.getters.leader === store.getters.name);

    watchEffect(
      () =>
        (manRequired.value =
          store.getters.round === 0 || store.getters.round === 2 ? 2 : 3)
    );

    onMounted(() => {
      store.commit("updatePlayers", mappedItems.value);
      store.getters.socket.on("userList", (users: any) => {
        mappedItems.value = users;
      });
      store.getters.socket.on("goToVote", () => {
        router.push('approve-mission');
      });
    });
    return {
      store,
      mappedItems,
      computeHowManyMoreManRequired,
      updateMappedItems,
      onGoClick,
      isLeader
    };
  },
};
</script>