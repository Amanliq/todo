import Vue from 'vue'
import Vuex from 'vuex'
import {status} from '@/data/data.js'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    data: [],
    status: null,
    statusId: 0,
    filter: '',
    paginate: 5,
    current: 0
  },
  mutations: {
  "initialseStore" (state) {
      if(localStorage.getItem('data')) {
          this.replaceState(
              Object.assign(state, JSON.parse(localStorage.getItem('data')))
          )
      }
  },
  "ADD_TODO" (state, newTodo) {
      state.data.push(newTodo)
  },
  "UPDATE_TODO" (state, updatedData) {
      let findData = state.data.filter(i => i.id == updatedData.id)
      updatedData = findData
  },
  "DELETE_BY_ID" (state, id) {
      let findData = state.data.filter(i => i.id == id)
      state.data.splice(state.data.indexOf(findData[0]), 1)
  },
  "SELECT_STATUS" (state, selected) {
      let findData = state.data.filter(i => i.id == selected.id)
      findData[0].status = selected.status
  },
  "SET_STATUS" (state, status ) {
    state.status = status;
  },
  "FILTER_STATUS" (state, id) {
      state.statusId = id
  },
  "FILTER_SEARCH" (state, payload) {
      state.filter = payload
  },
  "SET_PAGE" (state, pag) {
    state.current = pag - 1
  }
  

  },
  actions: {
    addTodo: ({commit}, newTodo) => {
      commit("ADD_TODO", newTodo)
    },
    updateTodo: ({commit}, updatedData) => {
        commit("UPDATE_TODO", updatedData)
    },
    deleteById: ({commit}, id) => {
        commit("DELETE_BY_ID", id)
    },
    selectStatus: ({commit}, selected) => {
        commit("SELECT_STATUS", selected)
    },
    setStatus: ({commit}) => {
      commit("SET_STATUS", status)
    },
    filterStatus: ({commit}, id) => {
        commit("FILTER_STATUS", id)
    },
    filterSearch: ({commit}, payload) => {
      commit("FILTER_SEARCH", payload)
    },
    setPage: ({commit}, pag) => {
      commit("SET_PAGE", pag)
    },
    next: ({commit})
  },
  getters: {
    data: state => {
      return state.statusId == 0 ? state.data : state.data.filter(i => i.status.id == state.statusId)
    },
    status: state => {
      return state.status
    },
    filtered: state => {
      return state.filter
    },
    allfiltered(state, getters) {
      return getters.data.filter(i => {
        return i.name.toLowerCase().includes(state.filter.toLowerCase())
       })
    },
    paginatedData(state, getters) {
          let start  = state.current * state.paginate
          let end = start + state.paginate
          return getters.allfiltered.slice(start, end)
    },
    current(state) {
      return state.current
    },
    pagesTotal(state, getters) {
      return Math.ceil(getters.allfiltered.length / state.paginate)
    }
  }
})