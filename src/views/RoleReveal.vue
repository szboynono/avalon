<template>
  <div>
    <h1>{{titleText}}</h1>
    <h2 v-if="isRoleRevealed">{{store.getters.role}}</h2>
    <div v-if="isMerlin">
      <p>Your ability is you are able to see all the bad guys.</p>
      <p>Please confirm below.</p>
      <v-list :items="badGuysForMerlin"></v-list>
    </div>
    <div v-if="isPercival">
      <p>Your ability is you are able to see both Morgana and Merlin, but you won't be able to tell the diffrence</p>
      <p>Please confirm below.</p>
      <v-list :items="guysForPercival"></v-list>
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
    const isPercival = ref(false);
    const badGuysForMerlin = ref([]);
    const guysForPercival = ref([]);
    const buttonText = ref("Reveal Myself");

    onMounted(() => {
      store.getters.socket.on("giveRole", (role: string) => {
        store.commit("updateRole", role);
        if (role === "MERLIN") {
          store.getters.socket.emit("merlin-vision");
          isMerlin.value = true;
        }
        else if(role === 'PERCIVAL') {
          store.getters.socket.emit("percival-vision");
          isPercival.value = true;
        }
      });
      store.getters.socket.on("readyCheckDone", () => {
        router.push("/game/" + store.getters.room + "/assign-mission");
      });
      store.getters.socket.on("merlin-vision-response", (badGuys: any) => {
        badGuysForMerlin.value = badGuys;
      });
      store.getters.socket.on("percival-vision-response", (guys: any) => {
        guysForPercival.value = guys;
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
      isMerlin,
      isPercival,
      guysForPercival
    };
  },
};
</script>