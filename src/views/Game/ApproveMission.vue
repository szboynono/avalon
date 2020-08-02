<template>
  <div>
    <p>Should we send these people to the mission?</p>
    <v-list :items="selectedPlayer" />
    <v-buttons
      :primaryText="'Approve'"
      :primaryFn="onApproveClick"
      :secondaryText="'Reject'"
      :secondaryFn="onRejectClick"
    />
  </div>
</template>

<script lang="ts">
import VList from "@/components/VList.vue";
import VButtons from "@/components/VButtons.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";
import router from "../../router";

export default {
  components: {
    VList,
    VButtons,
  },
  setup() {
    const store = useStore();
    const selectedPlayer = ref([]);
    const onApproveClick = () => {
      store.getters.socket.emit("submitVote", true);
    };
    const onRejectClick = () => {
      store.getters.socket.emit("submitVote", false);
    };

    onMounted(() => {
      selectedPlayer.value = store.getters.players.filter(
        (player: any) => player.selected
      );
      store.getters.socket.on("approveResult", (result: any) => {
        store.commit("updateApproveResult", result);
        router.push("go-for-mission");
      });
    });
    return {
      store,
      selectedPlayer,
      onApproveClick,
      onRejectClick,
    };
  },
};
</script>