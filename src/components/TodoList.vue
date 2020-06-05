<template>
  <div>
    <table border="1" align="center">
      <thead>
        <tr>
          <th>ID</th>
          <th>タスク</th>
          <th>状態</th>
          <th>-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.title }}</td>
          <td><a href="#" @click="onChangeState(todo)">
            {{ labels[todo.state] }}
          </a></td>
          <td><a href="#" @click="onTaskRemove(todo)">削除</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Todo } from '@/types/Todo'
import TodoModel from '@/models/TodoModel'

@Component
export default class TodoList extends Vue {
  @Prop({ type: Object, required: true })
  todoModel!: TodoModel

  @Prop({ type: Number, required: true })
  condition!: number

  get labels (): { [key: number]: string } {
    return this.todoModel.options.reduce((result, opt) => {
      return Object.assign(result, { [opt.state]: opt.label })
    })
  }

  get todos (): Todo[] {
    return this.todoModel.findList(this.condition)
  }

  onChangeState (todo: Todo): void {
    this.todoModel.changeState(todo)
  }

  onTaskRemove (todo: Todo): void {
    this.todoModel.remove(todo)
  }
}
</script>
