import { createStore } from 'vuex';

const state = {
  name: '',
  room: ''
}

const mutations = {
  updateName(state: any, name: string) {
    state.name = name;
  },
  updateRoom(state: any, room: string) {
    state.room = room;
  }
}

const getters = {
  name(state: any) {
    return state.name
  },
  room(state: any) {
    return state.room
  }
}

export default createStore({
  state,
  mutations,
  getters
})