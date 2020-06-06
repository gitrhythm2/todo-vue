import { Todo } from '@/types/Todo'
import Storage from '@/logics/Storage'

describe('Storage', () => {
  const storage: Storage = new Storage()
  const todos = [
    { id: 0, title: 'todo1', state: 0 }
  ]

  it('初期状態は空であること', () => {
    const result: Todo[] = storage.fetch()
    expect(result.length).toEqual(0)
  })

  it('1件TODOを登録・取得して内容が一致していること', () => {
    storage.save(todos)
    expect(storage.fetch()).toEqual(todos)
  })

  it('2件目を追加しても登録時と取得時で内容が一致していること', () => {
    todos.push({
      id: 1, title: 'todo2', state: 1
    })
    storage.save(todos)
    expect(storage.fetch()).toEqual(todos)
  })

  it('先頭のTODOを削除して登録した場合、IDが振り直されて２件目を取得されること', () => {
    todos.shift()
    storage.save(todos)
    expect(storage.fetch()).toEqual([{
      id: 0, title: 'todo2', state: 1
    }])
  })

  it('storageをクリアできること', () => {
    storage.clear()
    expect(storage.fetch()).toEqual([])
  })
})
