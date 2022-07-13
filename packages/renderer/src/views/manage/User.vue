<template>
    <div class="role">
        <div class="role__wrap">
            <h2>用户管理</h2>
            <el-table :data="tableData" stripe highlight-current-row>
                <el-table-column label="编号">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.id }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="用户名">
                    <template #default="scope">
                        <el-tag type="success" size="large">{{ scope.row.name }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="权限">
                    <template #default="scope">
                        <el-tag type="warning" size="large">{{ scope.row.auth.name }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.setTime }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" style="width:100px;">
                    <template #default="scope">
                        <el-button size="large" type="primary" @click="handleEdit(scope.$index, scope.row)"
                            style="width:50px">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog v-model="dialogFormVisible" title="编辑用户" width="600px">
                <el-form :model="form">
                    <el-form-item label="权限" :label-width="formLabelWidth">
                        <el-select v-model="form.auth" placeholder="请选择用户权限">
                            <el-option v-for="item in userAuthOption" :label="item.name" :value="item.id" />
                        </el-select>
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
import { log } from 'console';
import { ElMessage } from 'element-plus';
import { ref, reactive, unref } from 'vue'
import axios from '../../http';

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = ref({
    auth: 1,
    status: '',
    id: ''
})


axios.get('/getrole.json', { params: {} }).then(res => {
    userAuthOption.value = res.data

    axios.get('/getuser.json', { params: {} }).then(res => {
        tableData.value = res.data.map((item: any) => {
            return {
                ...item,
                auth: userAuthOption.value.find((it: any) => it.id === item.auth)
            }
        })
    })
})

const handleEdit = (index: number, row: any) => {
    dialogFormVisible.value = true
    form.value = { ...row }
    form.value.auth = row.auth.id
}

const handleConfirm = () => {
    axios.post('/editUser.json', { id: form.value.id, auth: form.value.auth }).then(res => {
        tableData.value = res.data.map((item: any) => {
            return {
                ...item,
                auth: userAuthOption.value.find((it: any) => it.id === item.auth)
            }
        })
        ElMessage({
            type: 'success',
            message: '编辑成功'
        })
        dialogFormVisible.value = false
    })
}

const tableData = ref([])
const userAuthOption = ref<any>([])
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