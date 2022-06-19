<template>
    <div class="cate">
        <h2>商品分类管理</h2>
        <div class="cate-content"></div>
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
.cate {
    width: 100%;
    padding: 50px;

    h2 {
        .title();
    }
}
</style>