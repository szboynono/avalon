<template>
  <div class="d-flex flex-wrap justify-content-center">
    <div class="quest border border-muted" v-for="quest in questResults" :key="quest">
      <p>{{quest}}</p>
    </div>
    <v-buttons :primaryText="'Next Round'" :primaryFn="onNextRoundClick" />
  </div>
</template>

<script lang='ts'>
import { useStore } from 'vuex';
import { onMounted, ref } from 'vue';
import VButtons from '@/components/VButtons.vue';
export default {
  components: {
    VButtons
  },
  setup() {
    const store = useStore();
    const questResults = ref(); 

    const onNextRoundClick = () => {
      store.getters.socket.emit('turnOver');
    }
    onMounted(() => {
      questResults.value = store.getters.missionSuccessResult.players.map((player: any) => {
        return player.successMission.success ? 'Success' : 'Failure';
      });
    })
    return {questResults, onNextRoundClick};
  }
}
</script>

<style lang="scss" scoped>
.quest {
  width: 150px;
  height: 200px;
}
</style>