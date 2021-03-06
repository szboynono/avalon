<template>
  <div>
    <p>The purpose was {{store.getters.approveResult.result ? 'Approved': 'Rejected'}}</p>
      <div class="row">
        <div class="col-6">
          <h4 class="text-success">FOR</h4>
          <v-list :items="store.getters.approveResult.approvals" />
        </div>
        <div class="col-6">
          <h4 class="text-danger">AGAINST</h4>
          <v-list :items="store.getters.approveResult.rejections" />
        </div>
      </div>
      <div class="border-top mt-4">
        <div v-if="!isSelected && store.getters.approveResult.result && actionTaken">
          <p>The quest is underway...</p>
          <div class="spinner-border mt-3" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="mt-3" v-if="isSelected && store.getters.approveResult.result && !actionTaken">
          <p class="mt-3">Let's do the quest! Select from below...</p>
          <v-buttons
            v-if="isBadGuy"
            :primaryText="'Success'"
            :primaryFn="onSuccessClick"
            :secondaryText="'Failure'"
            :secondaryFn="onFailureClick"
          />
          <v-buttons
            v-else
            :primaryText="'Success'"
            :primaryFn="onSuccessClick"
          />
        </div>
        <div class="mt-3" v-if="!store.getters.approveResult.result && !actionTaken">
          <p class="mt-3">The quest is Rejected, Try again</p>
          <v-buttons v-if="!tryAgainActionTaken" :primaryText="'Try again'" :primaryFn="onTryAgainCLick" />
        </div>
        <div v-if="tryAgainActionTaken || actionTaken" class="spinner-border mt-3" role="status">
            <span class="sr-only">Loading...</span>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import VList from "@/components/VList.vue";
import VButtons from "@/components/VButtons.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";
import router from '../../router';

export default {
  components: {
    VList,
    VButtons,
  },
  setup() {
    const store = useStore();
    const selectedPlayer = ref([]);
    const actionTaken = ref(false);
    const tryAgainActionTaken = ref(false);

    const onSuccessClick = () => {
      store.getters.socket.emit("submitMissonSuccessVote", true);
      actionTaken.value = true;
    };

    const onFailureClick = () => {
      store.getters.socket.emit("submitMissonSuccessVote", false);
      actionTaken.value = true;
    };

    const isSelected = computed(() =>
      selectedPlayer.value.some((player: any) => player.id === store.getters.id)
    );

    const isBadGuy = computed(() =>
      ["OBERON", "MORGANA", "Minion of Mordred", "ASSASIN"].includes(store.getters.role)
    );

    const onTryAgainCLick = () => {
      store.getters.socket.emit('missionApprovalTryAgain');
      tryAgainActionTaken.value = true;
    };

    onMounted(() => {
      selectedPlayer.value = store.getters.players.filter(
        (player: any) => player.selected
      );
      store.getters.socket.on('assasin', (result: any) => {
        store.commit('updateMissionSuccessResult', result);
        router.push({name: 'assasin'});
      });
      store.getters.socket.on("missionSuccessResult", (result: any) => {
        store.commit('updateMissionSuccessResult', result);
        router.push('mission-result-reveal');
      });
      store.getters.socket.on("missionApprovalTryAgainDone", () => {
        router.push('assign-mission');
      });
      store.getters.socket.on('gameOver', (winner: string) => {
        store.commit('updateWinner', winner);
        router.push({name: 'end'});
      });
    });
    return {
      store,
      selectedPlayer,
      isSelected,
      onSuccessClick,
      onFailureClick,
      isBadGuy,
      onTryAgainCLick,
      actionTaken,
      tryAgainActionTaken
    };
  },
};
</script>