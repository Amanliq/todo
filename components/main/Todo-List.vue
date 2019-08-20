<template>
    <div class="container">
        <app-top class="p-3">
            <input type="text" slot="search"
             class="form-control" placeholder="SearchByName" @input="filterByname($event)">
        </app-top>

        <table class="table-bordered table text-center">
            <thead>
                <th>Name {{pagesTotal}}</th>
                <th>Todo{{current}}</th>
                <th>Status</th>
                <th>Created_date</th>
                <th>Deadline</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <app-table v-for="(todo,index) in allfiltered" 
                :key="index" :todo="todo" 
                @trash="trash">    
                </app-table>
            </tbody>
        </table>
        <ul class="pagination" >
            <li class="page-item" 
            ><a class="page-link" @click.prevent="prev" href="#">Prev</a></li>
            <app-pagination 
            v-for="pag in pagesTotal" :key="pag"
            :pag="pag"  :current="current">
            </app-pagination>
            <li class="page-item"
            ><a class="page-link" @click.prevent="next" href="#">Next</a></li>
        </ul>
        <app-modal  v-if="showModalDel" @close="showModalDel = false"
            @delete="deleteById">
            <span slot="header">Are you Sure</span>
        </app-modal>
    </div>
</template>

<script>
import Table from './Table'
import Top from './TopTodList'
import Modal from './actions/Modal'
import Pagination from './Pagination'
export default {
    data() {
        return {
            showModalDel: null,
            idDel: null,
        }
    },
    components: {
        'app-table': Table,
        'app-top': Top,
        'app-modal': Modal,
        'app-pagination' : Pagination
    },
    computed: {
        allfiltered() {
            return this.$store.getters.paginatedData
        },
        current() {
            return this.$store.getters.current
        },
        pagesTotal() {
            return this.$store.getters.pagesTotal
        }
    },  
    methods: {
        // next() {
        //     if(this.pagTotal-1 > this.current) this.current++
        // },
        // prev() {
        //     if(this.current > 0) this.current--
        // },
        trash(event) {
            this.showModalDel = true
            this.idDel = event
        },
        deleteById() {
            this.$store.dispatch('deleteById', this.idDel)
            .then(() => this.showModalDel = false)
        },
        filterByname(i) {
            this.$store.dispatch('filterSearch', i.target.value)
        }
    }
}
</script>

<style>

</style>
