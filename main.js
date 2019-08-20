import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App'
import {routes} from './router/routes'
import store from './store/store'


// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import {faTrash, faEdit, faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add (faTrash, faEdit, faPlus)

Vue.config.productionTip = false

Vue.use(VueRouter)
// Vue.use(BootstrapVue)
Vue.component('font-awesome-icon', FontAwesomeIcon)


const router = new VueRouter({
   mode: 'history',
   routes: routes
})


store.subscribe((mutation, state) => {
  localStorage.setItem('data', JSON.stringify(state))
})




new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('initialseStore')
  },
  render: h => h(App),
}).$mount('#app')
