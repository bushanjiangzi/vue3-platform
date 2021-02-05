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
    <el-transfer
      v-model="value"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入城市拼音"
      :data="data"
    />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { reactive, ref, watchEffect, watch } from 'vue'
import store from '@/store/index'
import testCommonApi from '@/lib/testCommonApi'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    const generateData = () => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      const spell = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          spell: spell[index]
        })
      })
      return data
    }
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.spell.indexOf(query) > -1
      }
    }
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
    const { propsMsg, myInput } = testCommonApi()
    // const propsMsg = reactive({
    //   msg: 'Hello',
    //   name: 'Jiangzi',
    //   age: 18
    // })
    // const myInput = ref()
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
