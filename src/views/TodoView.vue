<template>
  <div>
    <h1>Todoリスト</h1>
    <todo-condition
      :todoModel="todoModel"
      @change="onChangeState">
    </todo-condition>

    <todo-list
      :todoModel="todoModel"
      :condition="condition">
    </todo-list>

    <new-todo
      :todoModel="todoModel">
    </new-todo>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Storage from '@/logics/Storage'
import TodoModel from '@/models/TodoModel'
import TodoCondition from '@/components/TodoCondition.vue'
import TodoList from '@/components/TodoList.vue'
import NewTodo from '@/components/NewTodo.vue'

@Component({
  components: {
    TodoCondition,
    TodoList,
    NewTodo
  }
})
export default class TodoView extends Vue {
  todoModel: TodoModel = new TodoModel(new Storage())
  condition = -1

  onChangeState (value: number) {
    this.condition = value
  }
}
</script>
