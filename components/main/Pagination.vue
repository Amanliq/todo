<template>
    <div>
        <li class="page-item" :class="{'active' : current == pag-1}"
        ><a class="page-link" @click.prevent="$emit('setPage', pag)" href="#">{{pag}}</a></li>
    </div>
</template>

<script>
export default {
    props:['pag', 'current']
}
</script>

<style>

</style>
