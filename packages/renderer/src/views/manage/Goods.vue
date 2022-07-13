<template>
    <div class="cate">
        <h2>商品管理</h2>

        <div class="multiple" style="margin-bottom:30px">
            <el-button @click="handleAdd" style="width:60px">添加
            </el-button>
            <el-button @click="delTipsShow = true" style="width:60px" type="danger" :disabled="curItems.length === 0">
                批量删除
            </el-button>
        </div>

        <div class="cate-content">
            <el-table :data="tableData" stripe highlight-current-row @selection-change="selectionChange">
                <el-table-column type="selection" width="55" />

                <el-table-column label="编号">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span>{{ scope.row.id }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="商品名称">
                    <template #default="scope">
                        <el-tag type="success" size="large">{{ scope.row.name }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="所属分类">
                    <template #default="scope">
                        <el-tag type="warning" size="large">{{ scope.row.cate.name }}</el-tag>
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
                        <el-button size="large" type="primary" @click="handleEdit(scope.$index, scope.row)"
                            style="width:50px">编辑
                        </el-button>
                        <el-button size="large" @click="delTipsShow = true; curItem = scope.row" style="width:50px"
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

        <el-dialog v-model="editShow" :title="formTitle" width="600px" ref="dialogForm">
            <el-form :model="form">
                <el-form-item label="商品名称" :label-width="140">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="所属分类" :label-width="140" style="margin-top: 30px;">
                    <el-select v-model="form.cate" placeholder="选择商品所属分类">
                        <el-option v-for="item in cateData" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button size="large" @click="editShow = false" style="width:50px">取消</el-button>
                    <el-button size="large" type="primary" @click="editConfirm" style="width:50px">确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="delTipsShow" title="提示" width="30%">
            <span>确定删除【{{ deltitle }}】吗？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="delTipsShow = false">取消</el-button>
                    <el-button type="primary" @click="handleDel">确定</el-button>
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
import { ref, reactive, computed } from 'vue'
import axios from '../../http';
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const delTipsShow = ref(false)

const dialogForm = ref<FormInstance | null>()

const handleDel = () => {
    delTipsShow.value = true
    let ids = ''
    if (curItems.value.length) {
        curItems.value.forEach((item: any, index: number) => {
            if (index === 0) {
                ids += item.id
            } else {
                ids += ',' + item.id
            }
        })
    } else {
        ids = (curItem.value as any).id
    }

    axios.get('/deletegoods.json', { params: { ids } }).then(res => {
        if (res.data.status === 200) {
            delTipsShow.value = false
            getGoods()
            ElMessage({
                type: 'success',
                message: res.data.message
            })
        }
    })
}

const deltitle = computed(() => {
    let str: string = ''
    if (curItems.value.length) {
        curItems.value.forEach((item: any, index: number) => {
            if (index === 0) {
                str += item.name
            } else {
                str += ',' + item.name
            }
        })
    } else {
        str = (curItem.value as any).name
    }
    return str
})

const formTitle = ref('添加商品')

const handleAdd = () => {
    form.value = { name: '', cate: '' }
    editShow.value = true
    formTitle.value = '添加商品'
}

const tableData = ref([])
const cateData = ref<any>([])

const pageInfo = reactive({
    page: 1,
    pageSize: 5,
    totalPage: 0,
    total: 0
})

const pageChange = (val: any) => {
    pageInfo.page = val
    getGoods()
}

const getGoods = () => {
    axios.get('/getgoods.json', { params: { page: pageInfo.page, pageSize: pageInfo.pageSize } }).then(res => {
        tableData.value = res.data.result.map((item: any) => {
            return {
                ...item,
                cate: cateData.value.find((it: any) => it.id === item.cate)
            }
        })
        pageInfo.totalPage = res.data.totalPage
        pageInfo.total = res.data.total
        console.log(tableData.value);

    })
}
axios.get('/getcate.json', { params: { page: 1, pageSize: 1000 } }).then(res => {
    cateData.value = res.data.result
    getGoods()
})

const editShow = ref(false)

const form = ref({
    name: '',
    cate: '',
})

const handleEdit = (index: number, row: any) => {
    editShow.value = true
    curItem.value = row
    formTitle.value = '编辑商品'
    form.value = { ...row }
    form.value.cate = row.cate.id
}

const curItem = ref({})
const curItems = ref([])

const selectionChange = (val: any) => {
    curItems.value = val
}

const editConfirm = () => {
    let url: string = ''
    if (formTitle.value === '添加商品') {
        url = '/addgoods.json'
    } else {
        url = "/editgoods.json"
    }

    axios.post(url, { ...form.value, id: (curItem.value as any).id }).then(res => {
        if (res.data.status === 200) {
            editShow.value = false
            getGoods()
            ElMessage({
                type: 'success',
                message: res.data.message
            })
        }
    })
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