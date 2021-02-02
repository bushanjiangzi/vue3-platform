<template>
  <div class="hello">
    <h1>{{ propsMsg.msg }} {{ propsMsg.name }} {{ propsMsg.age }}</h1>
    <div>{{ homeInput }}</div>
  </div>
</template>

<script>
import { computed } from 'vue'
import store from '@/store/index'
export default {
  name: 'HelloWorld',
  props: {
    propsMsg: {
      type: Object,
      require: true
    }
  },
  // computed: {
  //   homeInput() {
  //     return this.$store.state.homeInput
  //   }
  // },
  setup() {
    const msg = 'Hello Jiangzi'
    const homeInput = computed(() => {
      return store.state.homeInput
    })
    return {
      msg,
      homeInput
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
