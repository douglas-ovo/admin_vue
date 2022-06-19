<template>
    <div class="role">
        <div class="role__wrap">
            <h2>角色管理</h2>
            <el-table :data="tableData" stripe highlight-current-row>
                <el-table-column label="编号">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.id }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="类型" width="200px">
                    <template #default="scope">
                        <el-tag type="success">{{ scope.row.name }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="状态" width="100px">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.status ? '启用' : '禁用' }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="权限">
                    <template #default="scope">
                        <div>
                            <el-tag v-for="item in scope.row.auth" style="margin: 5px;" :key="item.id" effect="dark">{{
                                    item.label
                            }}
                            </el-tag>
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
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog v-model="dialogFormVisible" title="编辑管理员" width="600px">
                <el-form :model="form">
                    <el-form-item label="权限" :label-width="formLabelWidth">
                        <el-select multiple v-model="form.auth" placeholder="请选择角色权限">
                            <el-option v-for="item in roleAuthOption" :label="item.label" :value="item.id" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="状态" :label-width="formLabelWidth" style="margin-top: 30px;">
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
        </div>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref, reactive, unref } from 'vue'
import axios from '../../http';

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = ref({
    auth: [],
    status: '',
    id: ''
})

axios.get('/getrole.json', { params: {} }).then(res => {
    tableData.value = res.data
})

axios.get('/getRoleAuthOption.json', { params: {} }).then(res => {
    roleAuthOption.value = res.data
})

const handleEdit = (index: number, row: any) => {
    dialogFormVisible.value = true
    form.value = { ...row }
    form.value.auth = row.auth.map((item: any) => item.id)
}

const handleConfirm = () => {
    let auth = form.value.auth.join()
    axios.post('/editRole.json', { id: form.value.id, status: form.value.status, auth }).then(res => {
        tableData.value = res.data
        ElMessage({
            type: 'success',
            message: '编辑成功'
        })
        dialogFormVisible.value = false
    })
}

const tableData = ref([])
const roleAuthOption = ref<any>([])
</script>


<style lang="less" scoped>
.role {
    width: 100%;

    h2 {
        .title();
    }
}

.role__wrap {
    padding: 50px;
}
</style>