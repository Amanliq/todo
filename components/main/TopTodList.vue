<template>
    <div class="row">
        <div class="float-right">
           <router-link to="/add">
                <button class="btn btn-info"> <font-awesome-icon icon="plus" /> Add New Todo </button>
           </router-link>
        </div>
        <div class="float-left ml-3">
            <select class="form-control" @change="onChange($event)">
                <option v-for="(st, index) in status" :key="index" :value="st.id"
                >{{st.name}}</option>
                <option value="0" selected>All status</option>
            </select>
        </div>
        <div class="float-left ml-3">
            <slot name="search"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:['filter'],
    data() {
        return {
        }
    },
    computed: {
        status() {
            return this.$store.getters.status
        }
    },
    methods: {
        onChange(st) {
            this.$store.dispatch('filterStatus', st.target.value)
            //  this.$emit('filterStatus', st.target.value)
        }
    } 
}
</script>

<style>
ul li a {
    display: block;
    height: 40px;
    line-height: 40px;
    color:white;
}
.status {
    position: relative;
}
.status-menu {
    position: absolute;
    top: 40px;
    left:0;
    right:0;
    z-index: 999;
 

}
.status-menu li a {
    background: white;
    display: block;
    height: 20px;
    line-height: 20px;
    color: black
}

</style>
