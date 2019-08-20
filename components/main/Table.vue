<template>
    <tr>
        <td>{{todo.name}}</td>
        <td>{{todo.dcp}}</td>
        <td>
            <ul class="list-unstyled m-0">
                <li><a href="#1" class="status" 
                :class="{'bg-primary': todo.status.name == 'Doing',
                'bg-success' : todo.status.name == 'Done',
                'bg-warning' : todo.status.name == 'Waiting'}"
                 @click="dropdownOpen = !dropdownOpen">
                    {{todo.status.name}}
                        <ul class="list-unstyled status-menu m-0" v-if="dropdownOpen">
                            <li v-for="(st , index) in status" :key="index">
                                <a href="#2" @click="select({status: st, id: todo.id})">{{st.name}}</a>
                            </li>
                        </ul>
                    </a></li>
            </ul>
        </td>
        <td>{{todo.createdAt}}</td>
        <td>{{todo.deadline}}</td>
        <td>
            <span class="pr-2" @click="$emit('trash', todo.id)"
            ><font-awesome-icon icon="trash"/></span>
            <router-link :to="'/edit/' + todo.id ">
                <span class="pl-2"><font-awesome-icon icon="edit"/></span>
            </router-link>
        </td>
    </tr>
</template>

<script>
export default {
    props: ['todo', 'index'],
    data() {
        return {
            dropdownOpen: null
        }
    },

    methods: {
        select(selected) {
            this.$store.dispatch('selectStatus', selected)
            this.dropdownOpen == null
        }
    },
    computed: {
        status() {
            return this.$store.getters.status
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
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
 

}
.status-menu li a {
    background: white;
    color: black;
}
</style>
