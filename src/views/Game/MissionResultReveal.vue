<template>
  <div>
    <div class="d-flex flex-wrap justify-content-center">
      <ul class="list-group">
        <li class="list-group-item quest" v-for="quest in questResults" :key="quest" :class="quest === true ? 'bg-success' : 'bg-danger'">
          <p class="mb-0 text-white font-weight-bold display-4">
            {{quest === true ? 'SUCCESS' : 'FAILURE'}}
          </p>
        </li>
      </ul>
      <p v-if="questFinalResult" class="mt-3 text-success">Mission Success !!</p>
      <p v-if="!questFinalResult" class="mt-3 text-danger">Mission Failed !! Someone voted FAILURE</p>
    </div>
    <v-buttons v-if="!actionTaken" :primaryText="'Next Round'" :primaryFn="onNextRoundClick" />
    <div v-else class="spinner-border mt-5" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import VButtons from "@/components/VButtons.vue";
import router from "@/router";
export default {
  components: {
    VButtons,
  },
  setup() {
    const store = useStore();
    const questResults = ref();
    const actionTaken = ref(false);
    const questFinalResult = ref(true);

    const onNextRoundClick = () => {
      store.getters.socket.emit("turnOver");
      actionTaken.value = true;
    };
    onMounted(() => {
      store.getters.socket.on("roundInfo", (roundInfo: any) => {
        router.push("assign-mission");
      });
      questResults.value = store.getters.missionSuccessResult.players.map(
        (player: any) => {
          if(player.successMission.success === false) {
            questFinalResult.value = false;
          }
          return player.successMission.success
        }
      );
    });
    return { questResults, onNextRoundClick, actionTaken, questFinalResult };
  },
};
</script>

<style lang="scss" scoped>
.quest {
  width: 321px;
}
</style>