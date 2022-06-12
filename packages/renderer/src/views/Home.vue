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
    name: "Home"
}
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
</script>


<style lang="less" scoped>
.home {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.main {
    flex: 1;
    display: flex;
}
</style>