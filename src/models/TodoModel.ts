
import { Todo } from '@/types/Todo'
import firebase, { firestore } from 'firebase/app'
import 'firebase/firestore'
import TodoRepository from '@/repositories/TodoRepository'

type TodoSnapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>

export default class TodoModel {
  static readonly Options = [
    { state: -1, label: '全て' },
    { state: 0, label: '未完了' },
    { state: 1, label: '完了' }
  ]

  private todoRepo = new TodoRepository()
  todos: Todo[]

  constructor () {
    this.todos = []
  }

  async fetch (condition: number): Promise<void> {
    this.todos = await this.todoRepo.fetch(condition)
  }

  async add (title: string): Promise<number | void> {
    const trimedTitle = title.trim()
    if (trimedTitle === '') {
      return setTimeout(() => {
        return Promise.resolve()
      }, 0)
    }

    const newTodo = {
      title: title,
      done: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }

    await this.todoRepo.add(newTodo)
  }

  async changeState (todo: Todo): Promise<void> {
    const index = this.todos.indexOf(todo)
    if (index === -1) {
      throw new Error('TodoModel:changeState todo not found.')
    }
    this.todos[index].done = !this.todos[index].done

    await this.todoRepo.update(todo)
  }

  async remove (todo: Todo): Promise<void> {
    await this.todoRepo.remove(todo)

    const index = this.todos.indexOf(todo)
    if (index === -1) {
      throw new Error('TodoModel:remove todo not found.')
    }
    this.todos.splice(index, 1)
  }
}
