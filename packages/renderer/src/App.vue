<template>
  <h2>{{ text }} electron+vite+ts+mock</h2>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const text = ref('')
axios.get("/userinfo.json").then(res => {
  text.value = res.data
  console.log(res);
})
axios.get('/list.json').then(res => {
  console.log(res);
})
</script>

<style>
#app {
  font-size: 12px;
}
</style>
