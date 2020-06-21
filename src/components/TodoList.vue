<template>
  <div class="container">
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="todo in todos" :key="todo.id">
        <label>
          <input type="checkbox"
            :checked="todo.done"
            @click="onChangeState(todo)">
          <span :class="{ 'text-done': todo.done }">{{ todo.title }}</span>
          <button @click="onTodoRemove(todo)">×</button>
        </label>
      </li>
    </ul>
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

  get labels () {
    return TodoModel.Options.filter(opt => {
      return opt.state >= 0
    })
  }

  get todos (): Todo[] {
    return this.todoModel.todos
  }

  checkedValue (done: boolean): string {
    return done ? 'checked' : ''
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
input[type="checkbox"] {
  appearance: none;
}
input[type="checkbox"] + span::before {
  display: inline-block;
  content: '';
  width: 1.2rem;
  height: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: .5rem;
  // 描画した四角が若干上に位置しているように感じるので、-0.2rem分下に下げる
  margin-bottom: -0.2rem;
  margin-right: .5rem;
}
// チェック時の装飾
input[type="checkbox"]:checked + span::before {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpolyline fill='none' stroke='%230bd' stroke-width='3' points='2,7.3 7.3,12.7 18,2 '/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 0 2px;
}
// フォーカス時
input[type="checkbox"]:focus + span::before {
  border-color: #0bd;
}

.text-done {
  color: #999;
  text-decoration: line-through;
  transition: 0.5s;
}

li {
  padding-left: 0.3rem;
  line-height: 0;
  transition-property: background-color;
  transition-duration: 0.2s;
  labe {
    transition: color 0.4s;
  }
  // 削除ボタンの定義
  button {
    background-color: transparent;
    border: none;
    outline: none;
    display: none;
    color: #af5b5e;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    margin: auto 0;
    font-size: 2rem;
    color: #cc9a9a;
    margin-bottom: 1rem;
    // 下のtransitionは状態を変更した時の装飾
    transition: color 1.2s ease-out;
  }

  &:hover {
    // マウスがオーバーラップした行の背景色を変更
    background-color: #f7f7f7;
    transition-duration: 0.2s;
    // 加えてボタンも表示
    button {
      display: block;
    }
  }
}
</style>
