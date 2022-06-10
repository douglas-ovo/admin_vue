<template>
    <div class="home">
        <Header />
        <div class="main">
            <Menu />
        </div>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import axios from '../http'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>


<style lang="less" scoped>
.home {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.main {
    flex: 1;
}
</style>