<template>
  <div>
    <h1>Room: {{store.getters.room}}</h1>
    <div>
      <h2 v-if="calcWaitingPlayers > 0">Waiting for {{calcWaitingPlayers}} more players...</h2>
      <h2 v-else>We have {{store.getters.players.length}} players.</h2>
    </div>
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <v-list :items="store.getters.players" />
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
    });

    const onStart = () => {
      store.getters.socket.emit("start");
    };

    return { store, owner, onStart, calcWaitingPlayers };
  }
};
</script>