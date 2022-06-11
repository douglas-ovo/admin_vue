<template>
  <h2>{{ text }} electron+vite+ts+mock</h2>
  <button @click="handleClick">点击</button>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const text = ref('')
axios.get("/userinfo.json").then(res => {
  text.value = res.data
  console.log(res);
})
const handleClick = () => {
  ElMessage('this is a message.')
}
</script>

<style>
#app {
  font-size: 12px;
}
</style>
