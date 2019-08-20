import Vue from 'vue'
import Vuex from 'vuex'
import Todo from "./modules/todo"
import Status from './modules/status'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Todo,
    Status
  }
})