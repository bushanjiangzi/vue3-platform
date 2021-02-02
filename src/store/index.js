import { createStore } from 'vuex'

export default createStore({
  state: {
    homeInput: ''
  },
  mutations: {
    setHomeInput(state, data) {
      state.homeInput = data
    }
  },
  actions: {},
  modules: {}
})
