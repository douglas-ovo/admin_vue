<template>
    <div>home</div>
    <button @click="router.push({ name: 'login' })">登录</button>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>


<style lang="less" scoped>
</style>