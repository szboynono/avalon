import { createStore } from 'vuex';
import io from 'socket.io-client';

const state = {
  name: '',
  room: '',
  socket: undefined,
  id: '',
  players: [],
  role: [],
  leader: '',
  round: -1,
}

const mutations = {
  updateName(state: any, name: string) {
    localStorage.setItem('name', name);
    state.name = name;
  },
  updateRoom(state: any, room: string) {
    state.room = room;
  },
  updateSocket(state: any) {
    state.socket = io("http://localhost:8081/" + state.room);
  },
  updateId(state: any, id: string) {
    state.id = id
  },
  updatePlayers(state: any, players: any[]) {
    state.players = players
  },
  updateRole(state: any, role: string) {
    state.role = role;
  },
  updateLeader(state: any, leader: string) {
    state.leader = leader;
  },
  updateRound(state: any, round: number) {
    state.round = round;
  }
}

const getters = {
  name(state: any) {
    return state.name
  },
  room(state: any) {
    return state.room
  },
  socket(state: any) {
    return state.socket
  },
  id(state: any) {
    return state.id
  },
  players(state: any) {
    return state.players
  },
  role(state: any) {
    return state.role
  },
  leader(state: any) {
    return state.leader
  },
  round(state: any) {
    return state.round
  }
}

export default createStore({
  state,
  mutations,
  getters
})