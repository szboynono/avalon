<template>
  <div class="mt-5">
    <h4>{{titleText}}</h4>
    <div v-if="isRoleRevealed" class="mt-4">
      <h1 :class="isBadGuy ? 'text-danger': 'text-primary'">{{store.getters.role}}</h1>
      <p :class="isBadGuy ? 'text-danger': 'text-primary'">{{!isBadGuy ? 'Servant of Arthor' : 'Minion of Mordred'}}</p>
      <img v-if="store.getters.role === 'ASSASIN'" src="../assets/assasin.svg" alt="assasin">
      <img v-if="store.getters.role === 'Minion of Mordred'" src="../assets/bad-guy.svg" alt="Minion of Mordred">
      <img v-if="store.getters.role === 'Loyal Servant of Arthor'" src="../assets/good-guy.svg" alt="Loyal Servant of Arthor">
      <img v-if="store.getters.role === 'MERLIN'" src="../assets/merlin.svg" alt="MERLIN">
      <img v-if="store.getters.role === 'MORGANA'" src="../assets/morgana.svg" alt="MORGANA">
      <img v-if="store.getters.role === 'OBERON'" src="../assets/oberon.svg" alt="OBERON">
      <img v-if="store.getters.role === 'PERCIVAL'" src="../assets/percival.svg" alt="PERCIVAL">
    </div>
    <div v-if="isMerlin">
      <p :class="isBadGuy ? 'text-danger': 'text-primary'">Knows evil, must remain hidden</p>
      <hr />
      <p>Please confirm below.</p>
      <v-list :items="badGuysForMerlin"></v-list>
    </div>
    <div v-if="isPercival">
      <p :class="isBadGuy ? 'text-danger': 'text-primary'">Knows Merlin</p>
      <hr />
      <p>Please confirm below.</p>
      <v-list :items="guysForPercival"></v-list>
    </div>
    <div v-if="isBadGuy">
      <p v-if="store.getters.role === 'MORGANA'" :class="isBadGuy ? 'text-danger': 'text-primary'">Appears as Merlin</p>
      <p v-if="store.getters.role === 'OBERON'" :class="isBadGuy ? 'text-danger': 'text-primary'">Unknown to evil</p>
      <hr />
      <p>Please confirm your allies...</p>
      <v-list :items="badGuysForBadGuys"></v-list>
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
    const titleText = ref("What role am I playing?");
    const isRoleRevealed = ref(false);
    const isPlayerReady = ref(false);
    const isMerlin = ref(false);
    const isPercival = ref(false);
    const isBadGuy = ref(false);
    const badGuysForMerlin = ref([]);
    const guysForPercival = ref([]);
    const badGuysForBadGuys = ref([]);
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
        else if(['Minion of Mordred', 'ASSASIN', 'MORGANA', 'MORDRED', 'OBERON'].includes(role)) {
          store.getters.socket.emit('bad-guys-vision');
          isBadGuy.value = true;
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
      store.getters.socket.on("bad-guys-vision-response", (guys: any) => {
        badGuysForBadGuys.value = guys.filter((guy: any) => guy.name !== store.getters.name);
      });
    });

    watch(isRoleRevealed, () => {
      if (isRoleRevealed.value) {
        buttonText.value = "Ready";
      }
    });

    watch(isPlayerReady, () => {
      if (isPlayerReady.value) {
        titleText.value = "Waiting for other players...";
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
      isBadGuy,
      guysForPercival,
      badGuysForBadGuys
    };
  },
};
</script>
<style lang="scss" scoped>
  img {
    width: 148px;
    margin-bottom: 16px;
  }
</style>