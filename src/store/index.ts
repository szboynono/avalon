import { createStore } from 'vuex';
import io from 'socket.io-client';

const state = {
  name: '',
  room: '',
  socket: undefined,
  id: '',
  players: [],
  role: '',
  leader: '',
  round: -1,
  approveResult: {},
  missionSuccessResult: {},
  winner: '',
  missionList: [],
  newGame: false
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
  },
  updateApproveResult(state: any, approveResult: any) {
    state.approveResult = approveResult;
  },
  updateMissionSuccessResult(state: any, missionSuccessResult: any) {
    state.missionSuccessResult = missionSuccessResult;
  },
  updateWinner(state: any, winner: string) {
    state.winner = winner;
  },
  updateMissionList(state: any, missionList: any[]) {
    state.missionList = missionList;
  },
  updateNewGame(state: any, newGame: boolean) {
    state.newGame = newGame;
  },
  reset(state: any) {
    state.id = '';
    state.players = [];
    state.role = '';
    state.leader = '';
    state.round = -1;
    state.approveResult = {};
    state.missionSuccessResult = {};
    state.winner = '';
    state.missionList = [];
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
  },
  approveResult(state: any) {
    return state.approveResult
  },
  missionSuccessResult(state: any) {
    return state.missionSuccessResult
  },
  winner(state: any) {
    return state.winner;
  },
  missionList(state: any) {
    return state.missionList;
  },
  newGame(state: any) {
    return state.newGame;
  }
}

export default createStore({
  state,
  mutations,
  getters
})