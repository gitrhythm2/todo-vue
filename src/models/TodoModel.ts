
import Storage from '@/logics/Storage'
import { Todo } from '@/types/Todo'

export default class TodoModel {
  private storage: Storage
  private todos: Todo[]

  options = [
    { state: -1, label: '全て' },
    { state: 0, label: '未完了' },
    { state: 1, label: '完了' }
  ]

  constructor (storage: Storage) {
    this.storage = storage
    this.todos = this.storage.fetch()
  }

  findList (condition: number): Todo[] {
    // condition = -1は全てのTODOが対象
    return this.todos.filter(todo => {
      return (condition === -1) ? true : todo.state === condition
    })
  }

  add (title: string): void {
    const trimedTitle = title.trim()
    if (trimedTitle === '') {
      return
    }

    this.todos.push({
      id: this.storage.nextId++,
      title: trimedTitle,
      state: 0
    })

    this.storage.save(this.todos)
  }

  changeState (todo: Todo): void {
    const index = this.todos.indexOf(todo)
    if (index === -1) {
      throw new Error('TodoModel:changeState todo not found.')
    }

    this.todos[index].state = (this.todos[index].state === 0) ? 1 : 0
    this.storage.save(this.todos)
  }

  remove (todo: Todo): void {
    const index = this.todos.indexOf(todo)
    if (index === -1) {
      throw new Error('TodoModel:remove todo not found.')
    }

    this.todos.splice(index, 1)
    this.storage.save(this.todos)
  }
}
