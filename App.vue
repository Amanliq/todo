<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'app',
  components: {
    'app-header': Header,
  },
  created() {
      this.$store.dispatch('setStatus');
      // this.$store.dispatch('setStatusId');
  }
}
</script>

<style scoped >
 
</style>
