
import { Todo } from '@/types/Todo'
import firebase, { firestore } from 'firebase/app'
import 'firebase/firestore'

type TodoSnapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>

export default class TodoModel {
  public todos: Todo[]

  options = [
    { state: -1, label: '全て' },
    { state: 0, label: '未完了' },
    { state: 1, label: '完了' }
  ]

  constructor () {
    this.todos = []
  }

  async fetch (condition: number): Promise<void> {
    let snapShot: TodoSnapshot
    if (condition === -1) {
      snapShot = await this.findAll()
    } else {
      snapShot = await this.findByCondition(condition)
    }

    const newTodos: Todo[] = []
    snapShot.docs.forEach(doc => {
      const todo: Todo = doc.data() as Todo
      todo.id = doc.id
      // console.log('id:' + todo.id + 'title:' + todo.title + ' - state:' + todo.state)
      newTodos.push(todo)
    })
    this.todos = newTodos
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

    this.collection()
      .add(newTodo)
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id)
        this.todos.unshift({
          id: docRef.id,
          title: newTodo.title,
          done: newTodo.done,
          createdAt: newTodo.createdAt
        })
      })
      .catch(error => {
        console.error('Error adding document: ', error)
      })
  }

  async changeState (todo: Todo): Promise<void> {
    const index = this.todos.indexOf(todo)
    if (index === -1) {
      throw new Error('TodoModel:changeState todo not found.')
    }
    this.todos[index].done = !this.todos[index].done

    this.collection()
      .doc(todo.id)
      .update(this.todos[index])
  }

  async remove (todo: Todo): Promise<void> {
    await this.collection()
      .doc(todo.id)
      .delete()

    const index = this.todos.indexOf(todo)
    if (index === -1) {
      throw new Error('TodoModel:remove todo not found.')
    }
    this.todos.splice(index, 1)
  }

  private collection () {
    return firebase.firestore().collection('todos')
  }

  private findAll (): Promise<TodoSnapshot> {
    return this.collection()
      .orderBy('createdAt', 'desc')
      .get()
  }

  private findByCondition (condition: number): Promise<TodoSnapshot> {
    if (condition !== 0 && condition !== 1) {
      throw new Error('Bad argument[condition]')
    }

    const done = (condition === 1)
    return this.collection()
      .orderBy('createdAt', 'desc')
      .where('done', '==', done)
      .get()
  }
}
