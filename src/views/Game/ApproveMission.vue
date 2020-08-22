<template>
  <div>
    <p>Should we send these people to the mission?</p>
    <v-list :items="selectedPlayer" />
    <v-buttons
      v-if="!actionTaken"
      :primaryText="'Approve'"
      :primaryFn="onApproveClick"
      :secondaryText="'Reject'"
      :secondaryFn="onRejectClick"
    />
    <template v-else>
        <div class="spinner-border mt-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
    </template>
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
    const actionTaken = ref(false);
    const onApproveClick = () => {
      store.getters.socket.emit("submitVote", true);
      actionTaken.value = true;
    };
    const onRejectClick = () => {
      store.getters.socket.emit("submitVote", false);
      actionTaken.value = true;
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
      actionTaken
    };
  },
};
</script>