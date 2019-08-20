<template>
    <div>
        <li class="page-item" :class="{'active' : current == pag-1}"
        ><a class="page-link" @click.prevent="setPage(pag)" href="#">{{pag}}</a></li>
    </div>
</template>

<script>
export default {
    props:['pag', 'current'],
    methods: {
        setPage(pag) {
            this.$store.dispatch('setPage', pag)
        }
    }
}
</script>

<style>

</style>
