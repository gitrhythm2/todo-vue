// see: https://gist.github.com/ChuckJHardy/be6819959c345548bc91d45d5fa7282c
// package.json:jestにこのモッククラスの定義を追加すること！
const localStorageMock = (() => {
  let store: any = {}

  return {
    getItem(key: any) {
      return store[key] || null
    },

    setItem(key: any, value: any) {
      store[key] = value.toString()
    },

    removeItem(key: any) {
      delete store[key]
    },

    clear () {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})
