import { Todo } from '@/types/Todo'
import Storage from '@/logics/Storage'
import todoModel from '@/models/TodoModel'
import TodoModel from '@/models/TodoModel'

describe('TodoModel', () => {
  const storage = new Storage()
  const testData = [
    { id: 0, title: 'todo1', state: 0 },
    { id: 1, title: 'todo2', state: 0 }
  ]

  it('空のタイトルを追加しようとしてもできないこと', () => {
    storage.clear()
    const todoModel = new TodoModel(storage)

    todoModel.add('')
    const result = todoModel.findList(-1)
    expect(result).toEqual([])
  })

  it('1件追加できること', () => {
    storage.clear()
    const todoModel = new TodoModel(storage)

    todoModel.add('todo1')

    const result = todoModel.findList(-1)
    expect(result).toEqual([testData[0]])
  })

  it('2件目を追加できること', () => {
    storage.clear()
    const todoModel = new TodoModel(storage)

    testData.forEach(todo => {
      todoModel.add(todo.title)
    })

    const result = todoModel.findList(-1)
    expect(result).toEqual(testData)
  })

  it('todoを削除できること', () => {
    storage.clear()
    const todoModel = new TodoModel(storage)

    testData.forEach(todo => {
      todoModel.add(todo.title)
    })

    const todos = todoModel.findList(-1)

    todoModel.remove(todos[0])
    let result = todoModel.findList(-1)
    expect(result).toEqual([testData[1]])

    todoModel.remove(todos[1])
    result = todoModel.findList(-1)
    expect(result).toEqual([])
  })

  it('状態を変更できること AND 条件を指定してTodoを抽出できること', () => {
    storage.clear()
    const todoModel = new TodoModel(storage)

    testData.forEach(todo => {
      todoModel.add(todo.title)
    })

    // １件目の状態を変更し、完了・未完了それぞれを抽出して値を検証
    const todos = todoModel.findList(-1)
    todoModel.changeState(todos[0])

    const expectedResult1 = [{ id: 0, title: 'todo1', state: 1 }]
    const expectedResult2 = [{ id: 1, title: 'todo2', state: 0 }]

    let result = todoModel.findList(1)
    expect(result).toEqual(expectedResult1)

    result = todoModel.findList(0)
    expect(result).toEqual(expectedResult2)
  })
})
