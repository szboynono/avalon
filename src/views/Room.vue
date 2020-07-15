<template>
  <div>
    <h1>Room: {{store.getters.room}}</h1>
    <h2>Name: {{store.getters.name}}</h2>
    <play-list :players="store.getters.players"/>
  </div>
</template>

<script lang="ts">
import io from 'socket.io-client';
import PlayList from '@/components/PlayerList.vue';
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import router from "../router";
import axios from "axios";

export default {
  components: {
    PlayList
  }, 
  setup() {
    const store = useStore();
    const players = [{id: '1', name: 'a'}, {id: '2', name: 'b'}]
    onMounted(() => {
      store.commit("updateRoom", router.currentRoute.value.params.id);
      if (!store.getters.name) {
        router.push("/name");
      }
      if(store.getters.room && store.getters.name) {
        const socket = io("http://localhost:8081/" + store.getters.room);
        store.commit('updateSocket', socket);
        socket.emit('name', store.getters.name);
        socket.on('id', (id: any) => {
          store.commit('updateId', id);
        });
        socket.on('userList', (users: string[]) => {
          store.commit('updatePlayers', users);
        })
      }
    });

    return { store, players };
  }
};
</script>