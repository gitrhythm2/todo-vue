<template>
  <div>
    <h1>Todoリスト</h1>
    <todo-list
      :todoModel="todoModel">
    </todo-list>
    <new-todo
      :todoModel="todoModel">
    </new-todo>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoModel from '@/models/TodoModel'
import TodoList from '@/components/TodoList.vue'
import NewTodo from '@/components/NewTodo.vue'

@Component({
  components: {
    TodoList,
    NewTodo
  }
})
export default class TodoView extends Vue {
  todoModel: TodoModel = new TodoModel()
}
</script>
