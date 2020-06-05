<template>
  <div>
    <h1>Todoリスト</h1>
    <todo-list
      :todoModel="todoModel">
    </todo-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoModel from '@/models/TodoModel'
import TodoList from '@/components/TodoList.vue'

@Component({
  components: {
    TodoList
  }
})
export default class TodoView extends Vue {
  todoModel: TodoModel = new TodoModel()
}
</script>
