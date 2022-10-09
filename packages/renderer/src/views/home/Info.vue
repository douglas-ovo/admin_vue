<template>
    <div class="info">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="form-wrap">
            <div class="btn-group">
                <el-button @click="add" type="success" style="width: 100px;">添加信息</el-button>
                <el-button style="width: 100px;">导入</el-button>
                <el-button style="width: 100px;">导出</el-button>
            </div>

            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="id" label="编号" width="55px" />

                <el-table-column prop="name" label="姓名" width="80px" />

                <el-table-column prop="gender" label="性别" width="80px">
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

                <el-table-column label="操作" width="120px">
                    <template #default="{ row, column, $index }">
                        <el-button link type="primary" size="small" @click="edit(row)">编辑</el-button>
                        <el-button link type="primary" size="small" @click="del(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                background layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />


            <el-dialog v-model="dialogshow" width="770px">
                <el-form :model="form" ref="formRef" label-width="100px" :rules="rules">
                    <div class="form">
                        <div class="company">
                            <div class="title">企业信息</div>
                            <el-form-item label="单位名称" prop="unit">
                                <el-input v-model="form.unit" placeholder="请填写单位名称" />
                            </el-form-item>

                            <el-form-item label="单位地址" prop="address">
                                <el-input v-model="form.address" placeholder="请填写单位地址" />
                            </el-form-item>

                            <el-form-item label="联系人" prop="linkman">
                                <el-input v-model="form.linkman" placeholder="请填写联系人" />
                            </el-form-item>

                            <el-form-item label="联系电话" prop="phone">
                                <el-input v-model="form.phone" placeholder="请填写联系电话" />
                            </el-form-item>
                        </div>

                        <div class="personal">
                            <div class="title">个人信息</div>
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="form.name" placeholder="请填写人员姓名" />
                            </el-form-item>

                            <el-form-item label="性别" prop="gender">
                                <el-radio-group v-model="form.gender" placeholder="请选择人员性别">
                                    <el-radio :label="1">男</el-radio>
                                    <el-radio :label="0">女</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="学历" prop="educational" style="width:100%">
                                <el-select v-model="form.educational" placeholder="请选择人员学历">
                                    <el-option v-for="(item,index) in educational" :label="item.message"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>

                            <el-form-item label="专业" prop="major">
                                <el-input v-model="form.major" placeholder="请填写人员专业" />
                            </el-form-item>

                            <el-form-item label="个人简介" prop="remark">
                                <el-input v-model="form.remark" type="textarea" />
                            </el-form-item>
                        </div>
                    </div>
                </el-form>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="onSubmit" style="width:100px">确认</el-button>
                        <el-button @click="onCancel" style="width:100px">取消</el-button>
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
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { ElMessage, FormRules, ElMessageBox } from 'element-plus'
import axios from '../../http'

const formRef = ref(null)
const tableData = ref([])
axios.get('/getinfo.json', { params: {} }).then(res => {
    tableData.value = res.data
})

const dialogshow = ref(false)

const add = () => {
    dialogshow.value = true;
    form.value = JSON.parse(JSON.stringify(defaultForm))
}

const edit = (row: any) => {
    console.log(row);
    dialogshow.value = true;
    form.value = JSON.parse(JSON.stringify(row));
    // setTimeout(() => {
    //     (formRef.value as any).resetFields()
    // }, 100)
}

const del = (row: any) => {
    ElMessageBox.confirm(`确定删除【${row.name}】吗？`, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
    }).then(() => {
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
    })
}

const currentPage = ref(1)
const pageSize = ref(10)
const handleSizeChange = () => { }
const handleCurrentChange = () => { }

const defaultForm = {
    name: '',
    educational: 3,
    major: '',
    unit: '',
    remark: '',
    address: '',
    linkman: '',
    phone: '',
    gender: 1
}

const form = ref({
    name: '',
    educational: '',
    major: '',
    unit: '',
    remark: '',
    address: '',
    linkman: '',
    phone: '',
    gender: ""
})

const onSubmit = () => {
    (formRef.value as any).validate((valid: any, fields: any) => {
        if (valid) {
            ElMessage({
                type: 'success',
                message: '提交成功'
            })
            form.value = JSON.parse(JSON.stringify(defaultForm))
            setTimeout(() => {
                (formRef.value as any).resetFields()
                dialogshow.value = false
            }, 100)
        }
    })
}

const onCancel = () => {
    dialogshow.value = false
    setTimeout(() => {
        form.value = JSON.parse(JSON.stringify(defaultForm))
    }, 100)
}

const educational = reactive([
    { value: 0, message: '初中及以下' },
    { value: 1, message: '高中' },
    { value: 2, message: '统招专科' },
    { value: 3, message: '统招本科' },
    { value: 4, message: '硕士及以上' },
    { value: 5, message: '其他' },
])

const rules = reactive<FormRules>({
    name: [{ required: true, message: '请填写人员姓名', trigger: 'blur' }],
    educational: [{ required: true, message: '请填写人员姓名', trigger: 'change' }],
    major: [{ required: true, message: '请填写人员专业', trigger: 'blur' }],
    unit: [{ required: true, message: '请填写单位名称', trigger: 'blur' }],
    address: [{ required: true, message: '请填写单位地址', trigger: 'blur' }],
    linkman: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
    phone: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
    gender: [{ required: true, message: '请选择人员性别', trigger: 'change' }],
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
.info {
    width: 100%;
    height: 100%;
    // overflow-y: auto;
    display: flex;
    flex-direction: column;

    .form-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 50px;

        .btn-group {
            margin-bottom: 20px;
        }

        .el-table {
            height: 360px;
            overflow-y: auto;
        }

        .el-pagination {
            align-self: flex-end;
            padding: 10px 0;
        }

        .el-form {
            padding: 20px;
            width: 750px;

            .form {
                display: flex;

                .title {
                    text-align: center;
                    font-weight: bold;
                }

                >div {
                    flex: 1;
                }
            }

            .el-form-item {
                margin-top: 30px;

                .el-select {
                    width: 100%;
                }
            }
        }
    }

}
</style>