<template>
  <div>
    <template v-if="!voteResult">
        <p>Should we send these people to the mission?</p>
        <v-list :items="selectedPlayer" />
        <v-buttons
          :primaryText="'Approve'"
          :primaryFn="onApproveClick"
          :secondaryText="'Reject'"
          :secondaryFn="onRejectClick"
        />
    </template>
    <template v-else>
        <p>The purpose was {{voteResult.result ? 'Approved': 'Rejected'}}</p>
        <div class="row">
          <div class="col-6">
            <h4 class="text-success">FOR</h4>
            <v-list :items="voteResult.approvals" />
          </div>
          <div class="col-6">
            <h4 class="text-danger">AGAINST</h4>
            <v-list :items="voteResult.rejections" />
          </div>
        </div>
    </template>
  </div>
</template>
<script lang="ts">
import VList from "@/components/VList.vue";
import VButtons from "@/components/VButtons.vue";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

export default {
  components: {
    VList,
    VButtons,
  },
  setup() {
    const store = useStore();
    const selectedPlayer = ref([]);
    const voteResult = ref();
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
        voteResult.value = result;
      });
    });
    return {
      store,
      selectedPlayer,
      onApproveClick,
      onRejectClick,
      voteResult
    };
  },
};
</script>