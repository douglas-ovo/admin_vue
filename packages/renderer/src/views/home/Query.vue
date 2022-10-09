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
                <el-table-column prop="id" label="编号" width="55px" />

                <el-table-column prop="name" label="姓名" width="80px" />

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

            <el-dialog v-model="dialogshow" width="580px" destroy-on-close>
                <div class="dialog-wrap" ref="dialog">
                    <div class="self">
                        <div class="c-title">个人信息</div>
                        <div class="con">
                            <div class="con-item">
                                <span>姓名：</span>
                                <div>{{info.name}}</div>
                            </div>
                            <div class="con-item">
                                <span>性别：</span>
                                <div>{{info.gender===1?"男":'女'}}</div>
                            </div>
                            <div class="con-item">
                                <span>学历：</span>
                                <div>
                                    {{info.educational===0?'初中及以下':info.educational===1?'高中':info.educational===2?'统招专科':info.educational===3?'统招本科':info.educational===4?'硕士及以上':"其他"}}
                                </div>
                            </div>
                            <div class="con-item">
                                <span>专业：</span>
                                <div>{{info.major}}</div>
                            </div>
                            <div class="con-item" v-if="info.remark">
                                <span>个人简介：</span>
                                <div>{{info.remark}}</div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <hr>
                    <br>
                    <div class="compan">
                        <div class="c-title">企业信息</div>
                        <div class="con">
                            <div class="con-item">
                                <span>单位名称：</span>
                                <div>{{info.unit}}</div>
                            </div>
                            <div class="con-item">
                                <span>单位地址：</span>
                                <div>{{info.address}}</div>
                            </div>
                            <div class="con-item">
                                <span>联系人：</span>
                                <div>{{info.linkman}}</div>
                            </div>
                            <div class="con-item">
                                <span>联系电话：</span>
                                <div>{{info.phone}}</div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <hr>
                    <br>
                    <div class="exp" v-if="info.record.length!==0">
                        <div class="c-title">工作履历</div>
                        <div class="con" v-for="(item,index) in info.record" :key="index">
                            <div class="con-item">
                                <span>工作时间：</span>
                                <div>{{item.time[0]+'至'+item.time[1]}}</div>
                            </div>
                            <div class="con-item">
                                <span>公司名称：</span>
                                <div>{{item.company}}</div>
                            </div>
                            <div class="con-item">
                                <span>职位名称：</span>
                                <div>{{item.position}}</div>
                            </div>
                            <br>
                        </div>
                    </div>
                    <br v-if="info.record.length!==0">
                    <hr v-if="info.record.length!==0">
                    <br v-if="info.record.length!==0">
                    <div class="train" v-if="info.train.length!==0">
                        <div class="c-title">继续教育</div>
                        <div class="con" v-for="(item,index) in info.train" :key="index">
                            <div class="con-item">
                                <span>培训时间：</span>
                                <div>{{item.time[0]+'至'+item.time[1]}}</div>
                            </div>
                            <div class="con-item">
                                <span>机构名称：</span>
                                <div>{{item.company}}</div>
                            </div>
                            <div class="con-item">
                                <span>培训内容：</span>
                                <div>{{item.position}}</div>
                            </div>
                            <br>
                        </div>
                    </div>
                    <br v-if="info.train.length!==0">
                    <hr v-if="info.train.length!==0">
                    <br v-if="info.train.length!==0">
                    <div class="case" v-if="info.case.length!==0">
                        <div class="c-title">经典案例</div>
                        <div class="con" v-for="(item,index) in info.case" :key="index">
                            <div class="con-item">
                                <span>案例名称：</span>
                                <div>{{item.name}}</div>
                            </div>
                            <div class="con-item">
                                <span>案例年份：</span>
                                <div>{{item.year}}</div>
                            </div>
                            <div class="con-item">
                                <span>所属业务类型：</span>
                                <div>{{info.type===0?'专利':info.type===1?'商标':'版权'}}</div>
                            </div>
                            <div class="con-item">
                                <span>案例基本情况：</span>
                                <div>{{item.intro}}</div>
                            </div>
                            <div class="con-item" v-if="item.error">
                                <span>问题争议点：</span>
                                <div>{{item.error}}</div>
                            </div>
                            <div class="con-item" v-if="item.deal">
                                <span>方案解决：</span>
                                <div>{{item.deal}}</div>
                            </div>
                            <br>
                        </div>
                    </div>
                </div>
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
import axios from '../../http'
interface IPubilc {
    [k: string]: any
}

const currentPage = ref(1)
const pageSize = ref(10)
const handleSizeChange = () => { }
const handleCurrentChange = () => { }

const dialogshow = ref(false)
const info = ref<IPubilc>({})

const dialog = ref(null)
const check = (row: any) => {
    setTimeout(() => {
        info.value = JSON.parse(JSON.stringify(row))
        dialogshow.value = true
    }, 80)

}

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
axios.get('/getinfo.json', { params: { page: currentPage.value, pageSize: pageSize.value } }).then(res => {
    tableData.value = res.data.result
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

.dialog-wrap {
    padding: 20px;
    padding-left: 30px;
    max-height: 450px;
    overflow-y: auto;

    .c-title {
        font-weight: bold;
        font-size: 17px;
        margin: 10px 0;
    }

    .con {
        .con-item {
            display: flex;

            span {
                font-weight: bold;
                color: gray;
            }
        }
    }
}
</style>