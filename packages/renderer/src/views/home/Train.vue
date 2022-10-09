<template>
    <div class="train">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>继续教育</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="form-wrap">
            <div class="btn-group">
                <el-button @click="add" type="success" style="width: 100px;">添加经历</el-button>
                <el-button style="width: 100px;">导入</el-button>
                <el-button style="width: 100px;">导出</el-button>
            </div>

            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="id" label="编号" width="55px" />

                <el-table-column prop="userid" label="对应用户" width="80px">
                    <template #default="{ row, column, $index }">
                        <span v-if="userData.find((item: any) => item.id === row.userid)">
                            {{ (userData.find((item: any) => item.id === row.userid) as any).name }}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column prop="time" label="培训时间">
                    <template #default="{ row, column, $index }">
                        <span>
                            {{ row.time[0] + '至' + row.time[1] }}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column prop="company" label="机构名称" />

                <el-table-column prop="position" label="培训内容" />

                <el-table-column label="操作" width="120px">
                    <template #default="{ row, column, $index }">
                        <el-button link type="primary" size="small" @click="edit(row)">编辑</el-button>
                        <el-button link type="primary" size="small" @click="del(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[7, 14, 21, 28]"
                background layout="total, sizes, prev, pager, next, jumper" :total="totalPage"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />

            <el-dialog v-model="dialogshow" width="580px">
                <el-form ref="formRef" :model="form" label-width="100px">
                    <el-form-item :label="'对应人员'" prop="userid" :rules="{
                        required: true,
                        message: '请填写对应人员',
                        trigger: 'blur',
                    }">
                        <el-select v-model="form.userid" :disabled="isEdit" placeholder="请选择对应人员">
                            <el-option v-for="(item, index) in userData" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="'培训时间'" prop="time" :rules="{
                        required: true,
                        message: '请填写培训时间',
                        trigger: 'blur',
                    }">
                        <el-date-picker v-model="form.time" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
                            type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
                            :default-value="[new Date(2020, 9, 1), new Date(2022, 10, 1)]" />
                    </el-form-item>

                    <el-form-item :label="'机构名称'" prop="company" :rules="{
                        required: true,
                        message: '请填写机构名称',
                        trigger: 'blur',
                    }">
                        <el-input v-model="form.company" placeholder="请填写机构名称" />
                    </el-form-item>

                    <el-form-item :label="'培训内容'" prop="position" :rules="{
                        required: true,
                        message: '请填写培训内容',
                        trigger: 'blur',
                    }">
                        <el-input v-model="form.position" placeholder="请填写培训内容" />
                    </el-form-item>
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
import { ref, reactive } from 'vue'
import { ArrowRight, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from '../../http'
interface IPubilc {
    [k: string]: any
}

const userData = ref<IPubilc[]>([])
axios.get('/getinfo.json', { params: { page: 1, pageSize: 10000 } }).then(res => {
    userData.value = res.data.result
})

const currentPage = ref(1)
const totalPage = ref(1)
const pageSize = ref(7)
const handleSizeChange = (evt: any) => {
    pageSize.value = evt
    getData()
}
const handleCurrentChange = (evt: any) => {
    currentPage.value = evt
    getData()
}

const tableData = ref([])
const getData = () => {
    axios.get('/gettrain.json', { params: { page: currentPage.value, pageSize: pageSize.value } }).then(res => {
        tableData.value = res.data.result
        totalPage.value = res.data.total
    })
}
getData()

const dialogshow = ref(false)
const isEdit = ref(false)
const edit = (row: any) => {
    dialogshow.value = true;
    form.value = JSON.parse(JSON.stringify(row))
    isEdit.value = true
}

const del = (row: any) => {
    ElMessageBox.confirm(`确定删除【当前经历】吗？`, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
    }).then(() => {
        axios.get('/deletetrain.json', { params: { id: row.id, userid: row.userid } }).then((res: any) => {
            getData()

            ElMessage({
                type: 'success',
                message: res.data.message,
            })
        })
    })
}

const add = () => {
    dialogshow.value = true;
    form.value = JSON.parse(JSON.stringify(defaultForm))
    isEdit.value = false
}

const defaultForm = {
    userid: 2,
    time: '',
    company: '',
    position: ''
}
const form = ref({
    userid: 2,
    time: '',
    company: '',
    position: ''
})

const formRef = ref(null)

const onCancel = () => {
    dialogshow.value = false
    setTimeout(() => {
        form.value = JSON.parse(JSON.stringify(defaultForm))
    }, 100)
}

const onSubmit = () => {
    (formRef.value as any).validate((valid: any, fields: any) => {
        if (valid) {
            let url
            if (isEdit.value) {
                url = '/edittrain.json'
            } else {
                url = '/addtrain.json'
            }

            axios.post(url, {
                ...JSON.parse(JSON.stringify(form.value))
            }).then((res: any) => {
                getData()

                ElMessage({
                    type: 'success',
                    message: res.data.message
                })

                form.value = JSON.parse(JSON.stringify(defaultForm))
                dialogshow.value = false
                setTimeout(() => {
                    (formRef.value as any).resetFields()
                }, 100)
            })
        }
    })
}

const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: any
    rowIndex: any
}) => {
    if ((rowIndex + 1) % 2 === 0) {
        // return 'warning-row'
        return 'success-row'
    }
    // else if (rowIndex % 3 === 0) {
    //     return 'success-row'
    // }
    return ''
}
</script>


<style lang="less" scoped>
.train {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .form-wrap {
        width: 100%;
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
            width: 550px;

            .el-form-item {
                margin-bottom: 30px;
            }

            .record-item {
                box-shadow: 2px 2px 10px #06C;
                border: 1px solid #ccc;
                padding-right: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
                display: flex;

                .title {
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-left: 120px;
                    position: relative;
                    padding-top: 10px;

                    .mt-2 {
                        position: absolute;
                        right: -20px;
                        top: 0;
                        border-radius: 10px;
                    }
                }


                .box {
                    width: 100%;
                }
            }
        }
    }
}
</style>