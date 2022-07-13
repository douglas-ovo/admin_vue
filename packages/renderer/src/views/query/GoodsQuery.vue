<template>
    <div class="cate-query">
        <h2>商品查询</h2>
        <el-input v-model="keyword" class="search w-50 m-2" size="large" placeholder="请输入分类名" :suffix-icon="Search" />
        <div class="btn">
            <div>
                <el-button type="primary" @click="query">查询</el-button>
                <el-button @click="reset">重置</el-button>
            </div>
            <div>查到{{ data.length }}条数据</div>
        </div>
        <div class="table">
            <el-table :data="data" style="width: 100%" height="350" empty-text="暂无数据">
                <el-table-column prop="id" label="编号" />
                <el-table-column prop="name" label="商品名称" />
                <el-table-column prop="status" label="商品分类">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.cate.name }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="setTime" label="创建时间" />
            </el-table>
        </div>

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
import { Search } from '@element-plus/icons-vue'
const keyword = ref('')

const data = ref([])
const cateData = ref([])

const query = () => {
    axios.post('/querygoods.json', { keyword: keyword.value }).then(res => {
        data.value = res.data.map((item: any) => {
            return {
                ...item,
                cate: cateData.value.find((it: any) => it.id === item.cate)
            }
        })
    })
}
axios.get('/getcate.json', { params: { page: 1, pageSize: 1000 } }).then(res => {
    cateData.value = res.data.result
})

const reset = () => {
    keyword.value = ''
    data.value = []
}
</script>


<style lang="less" scoped>
.cate-query {
    flex: 1;
    padding: 50px;
    padding-bottom: 0;

    h2 {
        .title();
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
    }

    .search {
        width: 100%;
    }
}
</style>