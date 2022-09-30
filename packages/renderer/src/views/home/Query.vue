<template>
    <div class="query">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>信息检索</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="search">
            <el-form :model="form" ref="formRef" label-width="100px">
                <el-form-item label="关键词">
                    <el-input v-model="form.name" style="width: 200px;" />
                </el-form-item>

                <el-form-item label="所属业务类型" prop="type">
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
                <el-table-column prop="date" label="年份" width="180" />

                <el-table-column prop="name" label="姓名" width="180" />

                <el-table-column prop="gender" label="性别" />

                <el-table-column prop="case" label="经典案例" />

                <el-table-column prop="type" label="业务类型" />

                <el-table-column prop="phone" label="联系电话" />
            </el-table>

            <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                background layout="total, sizes, prev, pager, next, jumper" :total="100" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
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

const currentPage = ref(1)
const pageSize = ref(10)
const handleSizeChange = () => { }
const handleCurrentChange = () => { }

const form = ref({
    name: '',
    type: ''
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
        type: ''
    }
}

interface User {
    date: string
    name: string
    gender: string,
    case: string,
    phone: number,
    type: string
}

const tableData: User[] = [
    {
        date: '2022',
        name: '张三',
        gender: '男',
        case: '新能源汽车',
        phone: 10010,
        type: '版权'
    },
    {
        date: '2022',
        name: '张三',
        gender: '男',
        case: '新能源汽车',
        phone: 10010,
        type: '版权'
    },
    {
        date: '2022',
        name: '张三',
        gender: '男',
        case: '新能源汽车',
        phone: 10010,
        type: '版权'
    },
    {
        date: '2022',
        name: '张三',
        gender: '男',
        case: '新能源汽车',
        phone: 10010,
        type: '版权'
    },
    {
        date: '2022',
        name: '张三',
        gender: '男',
        case: '新能源汽车',
        phone: 10010,
        type: '版权'
    },
    {
        date: '2022',
        name: '张三',
        gender: '男',
        case: '新能源汽车',
        phone: 10010,
        type: '版权'
    },
    {
        date: '2022',
        name: '张三',
        gender: '男',
        case: '新能源汽车',
        phone: 10010,
        type: '版权'
    },
    {
        date: '2022',
        name: '张三',
        gender: '男',
        case: '新能源汽车',
        phone: 10010,
        type: '版权'
    }
]

const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: User
    rowIndex: number
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

    :deep(.el-table .warning-row) {
        --el-table-tr-bg-color: var(--el-color-warning-light-9);
    }

    :deep(.el-table .success-row) {
        --el-table-tr-bg-color: var(--el-color-success-light-9);
    }

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

        .el-table {
            max-height: 360px;
            overflow-y: auto;
        }

        .el-pagination {
            align-self: flex-end;
            padding: 10px 0;
        }
    }
}
</style>