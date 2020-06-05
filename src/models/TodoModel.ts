
import { Todo } from '@/types/Todo'

export default class TodoModel {
  private todos: Todo[]

  options = [
    { state: -1, label: '全て' },
    { state: 0, label: '未完了' },
    { state: 1, label: '完了' }
  ]

  constructor () {
    this.todos = [
      {
        id: 1,
        title: 'task1',
        state: 0
      },
      {
        id: 2,
        title: 'task2',
        state: 1
      }
    ]
  }

  findList (): Todo[] {
    return this.todos
  }

  changeState (todo: Todo): void {
    todo.state = (todo.state === 0) ? 1 : 0
  }

  remove (todo: Todo): void {
    const index = this.todos.indexOf(todo)
    if (index === -1) {
      return
    }

    this.todos.splice(index, 1)
  }
}
