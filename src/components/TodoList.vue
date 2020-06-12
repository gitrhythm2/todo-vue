<template>
  <div>
    <table class="table table-sm table-hover">
      <thead class="thead-light">
        <tr>
          <th>タスク</th>
          <th class="cell-state">状態</th>
          <th class="cell-remove">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.title }}</td>
          <td class="cell-state">
            <a href="#" class="badge badge-pill badge-primary"
              @click="onChangeState(todo)">
              {{ statusLabel(todo.done) }}
            </a>
          </td>
          <td class="cell-remove">
            <a href="#" class="badge badge-pilll badge-primary"
              @click="onTodoRemove(todo)">削除
            </a>
          </td>
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

  get todos (): Todo[] {
    return this.todoModel.todos
  }

  statusLabel (done: boolean) {
    return done ? '完了' : '未完了'
  }

  onChangeState (todo: Todo): void {
    this.todoModel.changeState(todo)
  }

  onTodoRemove (todo: Todo): void {
    this.todoModel.remove(todo)
  }
}
</script>

<style scoped lang="scss">
table .cell-state {
  text-align: center;
  width: 5rem;
}
table .cell-remove {
  text-align: center;
  width: 3rem;
}
</style>
