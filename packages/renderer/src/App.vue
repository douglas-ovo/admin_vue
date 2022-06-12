<template>
  <!-- <h3>{{ counter }}</h3>
  <button @click="store.increment()">add</button> -->
  <router-view />
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import useStore from './store'
const store = useStore()
const { counter } = storeToRefs(store)

const text = ref('')
axios.get("/userinfo.json").then(res => {
  text.value = res.data
})
const handleClick = () => {
  ElMessage('this is a message.')
}
</script>

<style lang="less" scoped>
.container {
  width: 200px;
  height: 200px
}
</style>
