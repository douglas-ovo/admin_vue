<template>
    <div class="about">
        <h3>作者：liutao@163.com</h3>
        <div class="jishu">
            <h4>技术栈</h4>
            <ul>
                <li><a href="https://github.com/electron/electron">electorn</a></li>
                <li></li><a href="https://github.com/vuejs/vue">vue3</a></li>
                <li></li><a href="https://github.com/vitejs/vite">vite</a></li>
                <li></li><a href="https://github.com/microsoft/TypeScript">typescript</a></li>
                <li></li><a href="https://github.com/vuejs/pinia">pinia</a></li>
                <li></li><a href="https://github.com/nuysoft/Mock">mock</a></li>
            </ul>
        </div>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
</script>


<style lang="less" scoped>
.jishu {

    ul,
    li {
        list-style: circle;
    }
}
</style>