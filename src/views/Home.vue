<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :propsMsg="propsMsg" />
    <input v-model="myInput" />
    <input v-model="firstInput" />
    <input v-model="secondInput" />
    <div>{{ state.total }}</div>
    <br />
    <input v-model="state.first" />
    <input v-model="state.second" />
    <div>{{ state.total2 }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { reactive, ref, watchEffect, watch } from 'vue'
import store from '@/store/index'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  // data() {
  //   return {
  //     myInput: ''
  //   }
  // },
  // watch: {
  //   myInput(newVal, oldVal) {
  //     console.log(newVal, oldVal)
  //     this.$store.commit('setHomeInput', newVal)
  //   }
  // }
  setup() {
    const propsMsg = reactive({
      msg: 'Hello',
      name: 'Jiangzi',
      age: 18
    })
    const myInput = ref()
    const firstInput = ref()
    const secondInput = ref()
    const state = reactive({
      first: 0,
      second: 0,
      total: '',
      total2: 0
    })
    // setInterval(() => {
    //   state.first++
    //   state.second++
    // }, 1000)
    watchEffect(() => {
      console.log(myInput.value)
      store.commit('setHomeInput', myInput.value)
      state.total = firstInput.value + secondInput.value
      state.total2 = state.first + state.second
    })
    watch([firstInput, secondInput], ([newFirst], [newSecond]) => {
      console.log(newFirst, newSecond)
    })
    return {
      propsMsg,
      myInput,
      firstInput,
      secondInput,
      state
    }
  }
}
</script>
