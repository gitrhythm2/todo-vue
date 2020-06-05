
import { Todo } from '@/types/Todo'

export default class Storage {
  private key: string
  nextId: number

  constructor () {
    this.key = 'gitrhytym-todo-demo'
    this.nextId = 0
  }

  fetch (): Todo[] {
    const todos: Todo[] = JSON.parse(
      localStorage.getItem(this.key) || '[]'
    )
    todos.forEach((todo, index) => {
      todo.id = index
    })

    this.nextId = todos.length
    return todos
  }

  save (todos: Todo[]): void {
    localStorage.setItem(this.key, JSON.stringify(todos))
  }
}
