<template>
    <div class="cate-query">
        <h2>商品查询</h2>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import axios from '../../http';
import { ElMessage, FormInstance, FormRules } from 'element-plus'
</script>


<style lang="less" scoped>
.cate-query {
    width: 100%;
    padding: 50px;
    padding-bottom: 0;

    h2 {
        .title();
    }
}
</style>