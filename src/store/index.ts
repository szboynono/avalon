import { createStore } from 'vuex';

const state = {
  name: '',
  room: '',
  socket: undefined,
  id: undefined
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
  }
}

export default createStore({
  state,
  mutations,
  getters
})