import TodoList from '../components/main/Todo-List'
import FormAdd from '../components/main/actions/FormAdd'


export const routes = [
    {path: '/', component: TodoList},
    {path: '/add', component: FormAdd},
    {path: '/edit/:id', component: FormAdd},
]