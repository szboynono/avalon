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
    <v-list class="d-block" :items="store.getters.players" />
    <div class="row mt-3" v-if="calcWaitingPlayers <= 0">
      <div class="col-6">
        <h4 class="text-primary">GOOD</h4>
        <v-list :items="goodRoles" />
      </div>
      <div class="col-6">
        <h4 class="text-danger">EVIL</h4>
        <v-list :items="evilRoles" />
      </div>
    </div>
    <v-buttons v-if="showStartButton" :primaryText="'Start Game'" :primaryFn="onStart" />
    <div v-if="calcWaitingPlayers <= 0 && owner === false" class="mt-4">
      <p>Waiting for the owner to start the game...</p>
    <div class="spinner-border mt-3" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import VList from "@/components/VList.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed, watchEffect } from "vue";
import router from "../router";
import VButtons from "@/components/VButtons.vue";

export default {
  components: {
    VList,
    VButtons,
  },
  setup() {
    const store = useStore();
    const owner = ref(false);
    const showStartButton = ref(false);
    const evilRoles = ref([{ name: "MORGANA" }, { name: "ASSASIN" }]);
    const goodRoles = ref([
      { name: "MERLIN" },
      { name: "PERCIVAL" },
      { name: "SERVANT OF ARTHOR" },
    ]);

    const calcWaitingPlayers = computed(() => 5 - store.getters.players.length);

    watchEffect(() => {
      if (store.getters.players.length === 6) {
        evilRoles.value = [{ name: "MORGANA" }, { name: "ASSASIN" }];
        goodRoles.value = [
          { name: "MERLIN" },
          { name: "PERCIVAL" },
          { name: "SERVANT OF ARTHOR" },
          { name: "SERVANT OF ARTHOR" },
        ];
      } else if (store.getters.players.length === 7) {
        evilRoles.value = [
          { name: "MORGANA" },
          { name: "ASSASIN" },
          { name: "OBERON" },
        ];
        goodRoles.value = [
          { name: "MERLIN" },
          { name: "PERCIVAL" },
          { name: "SERVANT OF ARTHOR" },
          { name: "SERVANT OF ARTHOR" },
        ];
      } else if (store.getters.players.length === 8) {
        evilRoles.value = [
          { name: "MORGANA" },
          { name: "ASSASIN" },
          { name: "OBERON" },
          { name: "Minion of Mordred" },
        ];
        goodRoles.value = [
          { name: "MERLIN" },
          { name: "PERCIVAL" },
          { name: "SERVANT OF ARTHOR" },
          { name: "SERVANT OF ARTHOR" },
        ];
      }
    });

    const setGameInfo = () => {
      store.commit("updateRoom", router.currentRoute.value.params.id);
      if (localStorage.getItem("name")) {
        store.commit("updateName", localStorage.getItem("name"));
      }

      if (!store.getters.name) {
        router.push("/name");
      } else if (!store.getters.newGame) {
        store.commit("updateSocket");
      }

      if (store.getters.socket) {
        store.getters.socket.on("nameExist", () => {
          router.push("/name");
        });
      }

      if (store.getters.room && store.getters.name && store.getters.socket) {
        const socket = store.getters.socket;
        if (!store.getters.newGame) {
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
          store.commit("updateOwner", owner);
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

    watchEffect(() => {
      if (
        process.env.VUE_APP_IS_PROD === "true" &&
        calcWaitingPlayers.value <= 0 &&
        owner.value === true
      ) {
        showStartButton.value = true;
      } else if (
        process.env.VUE_APP_IS_PROD === "false" &&
        owner.value === true
      ) {
        showStartButton.value = true;
      } else {
        showStartButton.value = false;
      }
    });

    const onStart = () => {
      store.getters.socket.emit("start");
    };

    return {
      store,
      owner,
      onStart,
      calcWaitingPlayers,
      showStartButton,
      evilRoles,
      goodRoles,
    };
  },
};
</script>

<style lang="scss" scoped>
.waiting-text {
  position: relative;
  bottom: 8px;
  margin-right: 8px;
}
</style>