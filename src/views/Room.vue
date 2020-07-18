<template>
  <div>
    <h1>Room: {{store.getters.room}}</h1>
    <h2>Name: {{store.getters.name}}</h2>
    <v-list :items="store.getters.players"/>
    <v-buttons v-if="owner" :primaryText="'Start Game'" :primaryFn="onStart"/>
  </div>
</template>

<script lang="ts">
import VList from '@/components/VList.vue';
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import router from "../router";
import axios from "axios";
import VButtons from '@/components/VButtons.vue';

export default {
  components: {
    VList,
    VButtons
  }, 
  setup() {
    const store = useStore();
    const owner = ref(false);

    const setGameInfo = () => {
      store.commit("updateRoom", router.currentRoute.value.params.id);
      if(localStorage.getItem('name')) {
        store.commit("updateName", localStorage.getItem('name'));
      }

      if (!store.getters.name) {
        router.push("/name");
      } else {
        store.commit('updateSocket');
      }

      if(store.getters.room && store.getters.name && store.getters.socket) {
        const socket = store.getters.socket;
        socket.emit('name', store.getters.name);
        socket.on('id', (id: any) => {
          store.commit('updateId', id);
        });
        socket.on('userList', (users: string[]) => {
          store.commit('updatePlayers', users);
        })
        socket.on('owner', (id: any) => {
          if(store.getters.id === id) {
            owner.value = true;
          }
        });
        socket.on('started', () => {
          router.push('/game/' + store.getters.room)
        })
      }
    }

    onMounted(() => {
      setGameInfo();
    });

    const onStart = () => {
      store.getters.socket.emit('start');
    }
    

    return { store, owner, onStart };
  }
};
</script>