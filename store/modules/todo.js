// import {statusId} from '@/data/data.js'

const state = {
    data: []
}

const mutations = {
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
    // "FILTER_STATUS" (state, id) {
    //     state.statusId = id
    // }
}   

const actions = {
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
    // filterStatus: ({commit}, id) => {
    //     commit("FILTER_STATUS", id)
    // }

}   

const getters = {
    data: state => {
        return state.data
    }
}   


export default {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}