<template>
  <div class="mt-5">
    <h1>Room {{store.getters.room}}</h1>
    <div class="d-inline-block waiting-text">
      <p v-if="calcWaitingPlayers > 0">Waiting for {{calcWaitingPlayers}} more players...</p>
      <p v-else>We have {{store.getters.players.length}} players.</p>
    </div>
    <div v-if="calcWaitingPlayers > 0" class="spinner-border mt-3" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <v-list class="d-block mt-3" :items="store.getters.players" />
    <v-buttons v-if="owner" :primaryText="'Start Game'" :primaryFn="onStart" />
  </div>
</template>

<script lang="ts">
import VList from "@/components/VList.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";
import router from "../router";
import axios from "axios";
import VButtons from "@/components/VButtons.vue";

export default {
  components: {
    VList,
    VButtons
  },
  setup() {
    const store = useStore();
    const owner = ref(false);
    const showStartButton = ref(false);

    const calcWaitingPlayers = computed(() => 5 - store.getters.players.length);

    const setGameInfo = () => {
      store.commit("updateRoom", router.currentRoute.value.params.id);
      if (localStorage.getItem("name")) {
        store.commit("updateName", localStorage.getItem("name"));
      }

      if (!store.getters.name) {
        router.push("/name");
      } else if(!store.getters.newGame){
        store.commit("updateSocket");
      }

      if (store.getters.room && store.getters.name && store.getters.socket) {
        const socket = store.getters.socket;
        if(!store.getters.newGame) {
          socket.emit("name", store.getters.name);
        }
        socket.emit("askForOwner");
        socket.on("id", (id: any) => {
          store.commit("updateId", id);
        });
        socket.on("userList", (users: any[]) => {
          store.commit("updatePlayers", users);
        });
        socket.on("owner", (id: any) => {
          store.commit('updateOwner', owner);
          if (store.getters.id === id) {
            owner.value = true;
          }
        });
        socket.on("started", () => {
          router.push("/role-reveal/" + store.getters.room);
        });
      }
    };

    onMounted(() => {
      setGameInfo();
      if(process.env.VUE_APP_IS_PROD === true && owner.value && calcWaitingPlayers.value <= 0) {
        showStartButton.value = true;
      } else if (process.env.VUE_APP_IS_PROD === false && owner.value) {
        showStartButton.value = true;
      } else {
        showStartButton.value = false;
      }
    });

    const onStart = () => {
      store.getters.socket.emit("start");
    };

    return { store, owner, onStart, calcWaitingPlayers, showStartButton };
  }
};
</script>

<style lang="scss" scoped>
.waiting-text {
  position: relative;
  bottom: 8px;
  margin-right: 8px;
}
</style>