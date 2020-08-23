<template>
  <div>
    <h1>{{titleText}}</h1>
    <h2 v-if="isRoleRevealed">{{store.getters.role}}</h2>
    <div v-if="isMerlin">
      <p>Please confirm the bad guys.</p>
      <v-list :items="badGuysForMerlin"></v-list>
    </div>
    <div>
      <v-buttons
        v-if="!(isRoleRevealed && isPlayerReady)"
        :primaryText="buttonText"
        :primaryFn="onRoleClick"
      />
      <template v-else>
        <div class="spinner-border mt-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import VButtons from "@/components/VButtons.vue";
import VList from "@/components/VList.vue";
import router from "../router";

window.onbeforeunload = function (e: any) {
  return "Don't leave";
};

export default {
  components: {
    VButtons,
    VList,
  },
  setup() {
    const store = useStore();
    const titleText = ref("Click the button to reveal you role");
    const isRoleRevealed = ref(false);
    const isPlayerReady = ref(false);
    const isMerlin = ref(false);
    const badGuysForMerlin = ref([]);
    const buttonText = ref("Reveal Myself");

    onMounted(() => {
      store.getters.socket.on("giveRole", (role: string) => {
        store.commit("updateRole", role);
        if (role === "MERLIN") {
          store.getters.socket.emit("merlin-vision");
          isMerlin.value = true;
        }
      });
      store.getters.socket.on("readyCheckDone", () => {
        router.push("/game/" + store.getters.room + "/assign-mission");
      });
      store.getters.socket.on("merlin-vision-response", (badGuys: any) => {
        badGuysForMerlin.value = badGuys;
      });
    });

    watch(isRoleRevealed, () => {
      if (isRoleRevealed.value) {
        buttonText.value = "Ready";
      }
    });

    watch(isPlayerReady, () => {
      if (isPlayerReady.value) {
        titleText.value = "Waiting for other players";
      }
    });

    const onRoleClick = () => {
      if (isRoleRevealed.value) {
        isPlayerReady.value = true;
        store.getters.socket.emit("ready");
      }
      isRoleRevealed.value = true;
      store.getters.socket.emit("requestRole");
    };
    return {
      store,
      onRoleClick,
      isRoleRevealed,
      buttonText,
      isPlayerReady,
      titleText,
      badGuysForMerlin,
      isMerlin
    };
  },
};
</script>