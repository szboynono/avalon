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
        <p class="mt-3">The quest is underway</p>
        <div class="mt-3" v-if="isSelected && store.getters.approveResult.result">
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
      </div>
  </div>
</template>

<script lang="ts">
import VList from "@/components/VList.vue";
import VButtons from "@/components/VButtons.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";

export default {
  components: {
    VList,
    VButtons,
  },
  setup() {
    const store = useStore();
    const selectedPlayer = ref([]);

    const onSuccessClick = () => {
      store.getters.socket.emit("submitMissonSuccessVote", true);
    };

    const onFailureClick = () => {
      store.getters.socket.emit("submitMissonSuccessVote", false);
    };

    const isSelected = computed(() =>
      selectedPlayer.value.some((player: any) => player.id === store.getters.id)
    );

    const isBadGuy = computed(() =>
      ["Minion of Mordred", "ASSASIN"].includes(store.getters.role)
    );
    onMounted(() => {
      selectedPlayer.value = store.getters.players.filter(
        (player: any) => player.selected
      );
      store.getters.socket.on("missionSuccessResult", (result: any) => {
        console.log(result);
      });
    });
    return {
      store,
      selectedPlayer,
      isSelected,
      onSuccessClick,
      onFailureClick,
      isBadGuy,
    };
  },
};
</script>