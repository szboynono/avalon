import { createStore } from 'vuex';

const state = {
  name: '',
  room: '',
  socket: undefined,
  id: ''
}

const mutations = {
  updateName(state: any, name: string) { 
      state.name = name;
  },
  updateRoom(state: any, room: string) {
      state.room = room;
  },
  updateSocket(state: any, socket: any) {
    state.socket = socket;
  },
  updateId(state: any, id: string) {
    state.id = id 
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
  }
}

export default createStore({
  state,
  mutations,
  getters
})