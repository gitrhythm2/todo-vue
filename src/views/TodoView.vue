<template>
  <div class="container">
    <h1 class="text-center">Todoリスト</h1>
    <todo-condition class="condition-section"
      :todoModel="todoModel"
      @change="onChangeState">
    </todo-condition>

    <todo-list class="list-section"
      :todoModel="todoModel"
      :condition="condition">
    </todo-list>

    <new-todo class="new-todo-section"
      :todoModel="todoModel"
      :condition="condition">
    </new-todo>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
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
  todoModel: TodoModel = new TodoModel()
  condition = -1

  created () {
    this.todoModel.fetch(this.condition)
  }

  onChangeState (value: number) {
    this.condition = value
    this.todoModel.fetch(this.condition)
  }
}
</script>

<style scoped lang="scss">
h1 {
  color: #888;
  text-shadow: 1px 1px 3px #ccc;
}
.condition-section {
  margin-top: 2rem;
}
.list-section {
  margin-top: 0rem;
}
.new-todo-section {
  margin-top: 2rem;
}
</style>
