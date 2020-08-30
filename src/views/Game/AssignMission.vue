<template>
  <div>
    <div>
      <template v-if="store.getters.leader === store.getters.name">
        <div>
          <p v-if="computeHowManyMoreManRequired > 0">Please select {{computeHowManyMoreManRequired}} more.</p>
          <p v-else-if="computeHowManyMoreManRequired < 0">Too many!</p>
          <p v-else>We have enough!</p>
        </div>
      </template>
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
    const mappedItems = ref(store.getters.players);
    const manRequired = ref(0);

    const updateMappedItems = (index: any) => {
      mappedItems.value[index].selected = !mappedItems.value[index].selected;
      store.getters.socket.emit("updateSelections", mappedItems.value);
    };

    const onGoClick = () => {
      store.getters.socket.emit('readyToVote');
    };

    const computeHowManyMoreManRequired = computed(() => {
      if(mappedItems.value) {
        return manRequired.value -
          mappedItems.value.filter((item: any) => item.selected === true).length;
      }
    });

    const isLeader = computed(() => store.getters.leader === store.getters.name);

    watchEffect(
      () =>
        (manRequired.value = store.getters.missionList[store.getters.round])
    );

    onMounted(() => {
      store.getters.socket.on("userList", (users: any) => {
        mappedItems.value = users;
        store.commit("updatePlayers", users);
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