<template>
  <div>
    <template v-if="store.getters.role === 'ASSASIN'">
      <div>
        <h1 class="mb-3 text-danger">Let's kill MERLIN</h1>
        <p class="text-danger">Please select Merlin from below...</p>
        <v-list
          :items="mappedItems"
          :leader="store.getters.name"
          @list-clicked="updateMappedItems"
        />
        <v-buttons :primaryText="'Kill'" :primaryFn="onKillClick" />
      </div>
    </template>
    <template v-else>
      <div>
        <h1 class="text-danger">Assasin activated !</h1>
        <div class="text-danger spinner-border mt-3" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import VList from "@/components/VList.vue";
import VButtons from "@/components/VButtons.vue";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  components: {
    VList,
    VButtons,
  },
  setup() {
    const store = useStore();
    const mappedItems = ref(
      store.getters.players
        .map((player: any) => ({
          ...player,
          selected: false,
        }))
        .filter((player: any) => player.name !== store.getters.name)
    );

    const updateMappedItems = (index: any) => {
      mappedItems.value = mappedItems.value.map((item: any) => {
        return {
          ...item,
          selected: false
        }
      });
      mappedItems.value[index].selected = !mappedItems.value[index].selected;
      store.commit("updatePlayers", mappedItems.value);
    };

    const onKillClick = () => {
      const selectedTarget = store.getters.players.find(
        (player: any) => player.selected
      );
      store.getters.socket.emit("assasin-target", selectedTarget);
    };

    return {
      store,
      mappedItems,
      onKillClick,
      updateMappedItems,
    };
  },
};
</script>