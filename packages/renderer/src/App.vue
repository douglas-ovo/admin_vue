<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import axios from './http'
import { ref } from 'vue'
import { useRoute } from "vue-router";

const route = useRoute()
console.log(route);


const text = ref('')
axios.get("/userinfo.json").then(res => {
  text.value = res.data
  console.log(res);
})
axios.get('/list.json').then(res => {
  console.log(res);
})
</script>

<style lang="less" scoped>
</style>
