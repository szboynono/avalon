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
import { ref, onMounted } from "vue";

export default {
  components: {
    VList,
    VButtons,
  },
  setup() {
    const store = useStore();
    const selectedPlayer = ref([]);
    const onApproveClick = () => {
      console.log('ap[prov');
    }
    const onRejectClick = () => {
      console.log('rekject');
    }
    onMounted(() => {
      selectedPlayer.value = store.getters.players.filter(
        (player: any) => player.selected
      );
    });
    return {
      store,
      selectedPlayer,
      onApproveClick,
      onRejectClick
    };
  },
};
</script>