<template>
    <div class="container">
        <app-top class="p-3" @filterStatus="search">
            <input type="text" slot="search"
             class="form-control" placeholder="SearchByName" v-model="filter">
        </app-top>

        <table class="table-bordered table text-center">
            <thead>
                <th>Name {{pagTotal}}</th>
                <th>Todo</th>
                <th>Staus</th>
                <th>Created_date</th>
                <th>Deadline</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <app-table v-for="(todo,index) in  paginatedData " 
                :key="index" :todo="todo" 
                @trash="trash">    
                </app-table>
            </tbody>
        </table>
        <ul class="pagination" v-if="paginatedData.length>0">
            <li class="page-item" 
            ><a class="page-link" @click.prevent="prev" href="#">Prev</a></li>
            <app-pagination 
            v-for="pag in pagTotal" :key="pag"
            :pag="pag" @setPage="setPage" :current="current">
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
            id: 0,
            filter:'',
            paginate: 5,
            current: 0,
        }
    },
    components: {
        'app-table': Table,
        'app-top': Top,
        'app-modal': Modal,
        'app-pagination' : Pagination
    },
    computed: {
        searchByName() {
            return this.filtered.filter(todo => {
                return todo.name.toLowerCase().includes(this.filter.toLowerCase())
            })
        },
        todos() {
            return this.$store.getters.data
        },
        filtered() {
            return this.id == 0 ? this.todos : this.todos.filter(i => i.status.id == this.id)
        },
        allfiltered() {
           return this.searchByName
        },
        paginatedData() {
            const start  = this.current * this.paginate, 
                    end = start + this.paginate
            return this.allfiltered.slice(start, end)
        },
        pagTotal() {
            return Math.ceil(this.allfiltered.length / this.paginate)
        }
        
    }, 
    methods: {
        setPage(page) {
            this.current = page-1  
        },
        next() {
            if(this.pagTotal-1 > this.current) this.current++
        },
        prev() {
            if(this.current > 0) this.current--
        },
        trash(event) {
            this.showModalDel = true
            this.idDel = event
           
        },
        deleteById() {
            this.$store.dispatch('deleteById', this.idDel)
            .then(() => this.showModalDel = false)
        },
        search(id) {
            this.id = id
        },
       
    }
}
</script>

<style>

</style>
