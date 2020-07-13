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

export default createStore({
  state,
  mutations
})