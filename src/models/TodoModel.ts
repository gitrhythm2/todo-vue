
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

  add (title: string): void {
    const trimedTitle = title.trim()
    if (trimedTitle === '') {
      return
    }

    const max = this.todos.reduce((result, todo) => {
      return result.id > todo.id ? result : todo
    })

    this.todos.push({
      id: max.id + 1,
      title: trimedTitle,
      state: 0
    })
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
