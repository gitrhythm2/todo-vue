
import { Todo } from '@/types/Todo'
import firebase, { firestore } from 'firebase/app'
import 'firebase/firestore'

type TodoSnapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>

export default class TodoRepository {
  async fetch (condition: number): Promise<Todo[]> {
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

    return newTodos
  }

  async add (todo: any): Promise<void> {
    if (todo === null) {
      throw new Error('todo is null.')
    }

    this.collection()
      .add(todo)
      .catch(error => {
        throw error
      })
  }

  async update (todo: Todo): Promise<void> {
    this.collection()
      .doc(todo.id)
      .update(todo)
  }

  async remove (todo: Todo): Promise<void> {
    await this.collection()
      .doc(todo.id)
      .delete()
  }

  private collection () {
    return firebase.firestore().collection('todos')
  }

  private findAll (): Promise<TodoSnapshot> {
    return this.collection()
      .orderBy('createdAt')
      .get()
  }

  private findByCondition (condition: number): Promise<TodoSnapshot> {
    if (condition !== 0 && condition !== 1) {
      throw new Error('Bad argument[condition]')
    }

    const done = (condition === 1)
    return this.collection()
      .where('done', '==', done)
      .orderBy('createdAt')
      .get()
  }
}
