import {status} from '@/data/data.js'


const state = {
    status: []
}

const mutations = {
    "SET_STATUS" (state, status ) {
        state.status = status;
    },
}   

const actions = {
    setStatus: ({commit}) => {
        commit("SET_STATUS", status)
    },
}   

const getters = {
    status: state => {
        return state.status
    },
}   


export default {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}