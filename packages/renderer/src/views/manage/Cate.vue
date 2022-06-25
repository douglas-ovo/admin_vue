<template>
    <div class="cate">
        <h2>商品分类管理</h2>
        <div class="multiple" style="margin-bottom:30px">
            <el-button @click="handleAdd" style="width:60px">添加
            </el-button>
            <el-button @click="handleDels" style="width:60px" type="danger" :disabled="selOption.length === 0">批量删除
            </el-button>
        </div>
        <div class="cate-content">
            <el-table :data="tableData" stripe highlight-current-row @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />

                <el-table-column label="编号">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.id }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="分类名称">
                    <template #default="scope">
                        <el-tag type="success">{{ scope.row.name }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="状态">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.status ? '启用' : '禁用' }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.setTime }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="large" @click="handleEdit(scope.$index, scope.row)" style="width:50px">编辑
                        </el-button>
                        <el-button size="large" @click="handleDel(scope.$index, scope.row)" style="width:50px"
                            type="danger">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination background layout="prev, pager, next" :page-size="pageInfo.pageSize"
                    :total="pageInfo.total" @current-change="pageChange" />
            </div>
        </div>

        <el-dialog v-model="dialogFormVisible" :title="formTitle" width="600px" ref="dialogForm">
            <el-form :model="form">
                <el-form-item label="分类名称" :label-width="140">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="状态" :label-width="140" style="margin-top: 30px;">
                    <el-switch v-model="form.status" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button size="large" @click="dialogFormVisible = false" style="width:50px">取消</el-button>
                    <el-button size="large" type="primary" @click="handleConfirm" style="width:50px">确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogVisible" title="提示" width="30%" :before-close="handleClose">
            <span>确定删除【】吗？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from '../../http';
import type { FormInstance } from 'element-plus'

const dialogVisible = ref(false)
const handleClose = () => {

}

const dialogForm = ref<FormInstance | null>()

const handleDels = () => {
    dialogVisible.value = true
    console.log(selOption.value);
}
const handleDel = (index: number, row: any) => {
    dialogVisible.value = true
}

const formTitle = ref('添加分类')
const handleAdd = () => {
    form.value = { name: '', status: '' }
    dialogFormVisible.value = true
    formTitle.value = '添加分类'
}

const tableData = ref([])
const pageInfo = reactive({
    page: 1,
    pageSize: 5,
    totalPage: 0,
    total: 0
})
const pageChange = (val: any) => {
    pageInfo.page = val
    getCate()
}
const getCate = () => {
    axios.get('/getcate.json', { params: { page: pageInfo.page, pageSize: pageInfo.pageSize } }).then(res => {
        tableData.value = res.data.result
        pageInfo.totalPage = res.data.totalPage
        pageInfo.total = res.data.total
    })
}
getCate()

const dialogFormVisible = ref(false)

const form = ref({
    name: '',
    status: '',
})

const handleEdit = (index: number, row: any) => {
    dialogFormVisible.value = true
    formTitle.value = '编辑分类'
    form.value = { ...row }
}

const selOption = ref([])
const handleSelectionChange = (val: any) => {
    selOption.value = val
}

const handleConfirm = () => {

}
</script>


<style lang="less" scoped>
.cate {
    width: 100%;
    padding: 50px;
    padding-bottom: 0;

    h2 {
        .title();
    }
}

.cate-content {
    .el-table {
        height: 350px;
    }

    .page {
        padding-right: 30px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
}
</style>