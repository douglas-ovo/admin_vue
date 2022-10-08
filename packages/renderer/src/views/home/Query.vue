<template>
    <div class="query">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>信息检索</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="search">
            <el-form :model="form" ref="formRef" label-width="80px">
                <el-form-item label="关键词">
                    <el-input v-model="form.name" style="width: 200px;" />
                </el-form-item>

                <el-form-item label="工作年限">
                    <el-input-number v-model="form.years" :min="1" :max="30" />
                </el-form-item>

                <el-form-item label="业务类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择所属业务类型" style="width:100%">
                        <el-option v-for="(item,index) in type" :label="item.message" :value="item.value" />
                    </el-select>
                </el-form-item>

                <div class="btn">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="onReset">重置</el-button>
                </div>
            </el-form>
        </div>

        <div class="table">
            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="id" label="编号" />

                <el-table-column prop="name" label="姓名" />

                <el-table-column prop="gender" label="性别">
                    <template #default="{ row, column, $index }">
                        <span>
                            {{row.gender===1?'男':'女'}}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column prop="educational" label="学历">
                    <template #default="{ row, column, $index }">
                        <span>
                            {{row.educational===0?'初中及以下':row.educational===1?'高中':row.educational===2?'统招专科':row.educational===3?'统招本科':row.educational===4?'硕士及以上':"其他"}}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column prop="unit" label="单位名称" />

                <el-table-column prop="phone" label="联系电话" />

                <el-table-column label="操作">
                    <template #default="{ row, column, $index }">
                        <el-button link type="primary" size="small" @click="check(row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                background layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import axios from '../../http'

const currentPage = ref(1)
const pageSize = ref(10)
const handleSizeChange = () => { }
const handleCurrentChange = () => { }

const check = (row: any) => { }

const form = ref({
    name: '',
    type: '',
    years: 2
})

const type = ref([
    { value: 0, message: '专利' },
    { value: 1, message: '商标' },
    { value: 2, message: '版权' },
])

const onSubmit = () => { }
const onReset = () => {
    form.value = {
        name: '',
        type: '',
        years: 2
    }
}

const tableData = ref([])
axios.get('/getinfo.json', { params: {} }).then(res => {
    tableData.value = res.data
})

const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: any
    rowIndex: any
}) => {
    if (rowIndex === 1) {
        return 'warning-row'
    } else if (rowIndex === 3) {
        return 'success-row'
    }
    return ''
}
</script>


<style lang="less" scoped>
.query {
    width: 100%;

    .search {
        padding: 0 50px;

        .el-form {
            display: flex;
            justify-content: space-between;
        }
    }

    .table {
        display: flex;
        flex-direction: column;
        padding: 0 50px;
        margin-top: 30px;

        .el-table {
            height: 360px;
            overflow-y: auto;
        }

        .el-pagination {
            align-self: flex-end;
            padding: 10px 0;
        }
    }
}
</style>