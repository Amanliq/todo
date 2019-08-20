<template>
    <div>
        
        <div class="col-md-6 offset-md-3">
            <h5 class="text-center mt-2">{{id? 'Update Todo'  : 'Add new Todo'}} </h5>
            <form @submit.prevent="addTodo">
                <label>Name todo</label>
                <input type="text" v-model="inputVal.name" class="form-control">
                <br>
                <label>Description Todo</label>
                <input type="text" v-model="inputVal.dcp" class="form-control">
                <br>
                <label>Deadline date</label>
                <input type="date"  v-model="inputVal.deadline"
                class="form-control">
                <br>
                <button :disabled="inputVal.name == '' || inputVal.dcp == ''" class="btn btn-info">Add Item</button>
            </form>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form:{
                name:'',
                dcp: '',
                deadline: new Date().toISOString().slice(0,10)
            }
        }
    },
    computed: {
      id() {
          return this.$route.params.id
      },
      updatatedTodo() {
          return  this.$store.getters.data.filter(element => {
              return element.id == this.id;
          })
      },
      inputVal() {
          return this.id ? this.updatatedTodo[0] : this.form
      }
      
      
    }, 
    methods: {
        addTodo() {
            let uniqueId = function() {
                return '_' + Math.random().toString(36).substr(2,9)
            }
            let formData = {
                name: this.form.name,
                dcp: this.form.dcp,
                deadline: new Date(this.form.deadline).toDateString(),
                status: {name:'Waiting', id: 1}
            }
            if(this.id) {
                formData.id = this.id;
                this.$store.dispatch('updateTodo', {formData})
                .then(() => this.$router.push('/'))
            }else{
                formData.id = uniqueId() ,
                formData.createdAt = new Date(Date.now()).toDateString()
                 this.$store.dispatch('addTodo', formData)
                .then(() => this.$router.push('/'))   
            }
        },
        
    }  
}
</script>

<style>

</style>
