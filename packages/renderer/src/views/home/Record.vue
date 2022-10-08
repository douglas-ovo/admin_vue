<template>
    <div class="record">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>工作履历</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="form-wrap">
            <el-form ref="formRef" :model="form" label-width="100px">

                <div class="record-item" v-for="(item, index) in form.record" :key="item.key">
                    <div class="box">
                        <div class="title">
                            <span>工作经历{{index+1}}</span>
                            <el-button class="mt-2" v-if="index!==0" :icon="Delete" type="danger"
                                @click.prevent="del(index)">删除
                            </el-button>
                        </div>
                        <el-form-item :label="'工作时间'" :prop="'record.'+index+'.time'" :rules="{
                          required: true,
                          message: '请填写工作时间',
                          trigger: 'blur',
                        }">
                            <el-date-picker v-model="item.time" type="daterange" start-placeholder="开始日期"
                                end-placeholder="结束日期" :default-value="[new Date(2020, 9, 1), new Date(2022, 10, 1)]" />
                        </el-form-item>

                        <el-form-item :label="'公司名称'" :prop="'record.'+index+'.company'" :rules="{
                          required: true,
                          message: '请填写公司名称',
                          trigger: 'blur',
                        }">
                            <el-input v-model="item.company" placeholder="请填写公司名称" />
                        </el-form-item>

                        <el-form-item :label="'职位名称'" :prop="'record.'+index+'.position'" :rules="{
                          required: true,
                          message: '请填写职位名称',
                          trigger: 'blur',
                        }">
                            <el-input v-model="item.position" placeholder="请填写职位名称" />
                        </el-form-item>
                    </div>
                </div>

                <el-form-item>
                    <el-button type="primary" @click="submit" style="width: 100px;">提交</el-button>
                    <el-button @click="reset" style="width: 100px;">重置</el-button>
                    <el-button @click="add" type="success" style="width: 100px;">添加经历</el-button>
                </el-form-item>
            </el-form>
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
import { ElMessage } from 'element-plus'
import axios from '../../http'

axios.get('/getrecord.json', { params: {} }).then(res => {
    console.log(res);
})

const defaultForm = {
    record: [{ time: '', company: '', position: '', key: Date.now() }]
}
const form = ref({
    record: [{ time: '', company: '', position: '', key: Date.now() }]
})
const del = (index: number) => {
    if (index !== 0) {
        form.value.record.splice(index, 1)
    }
}
const add = () => {
    form.value.record.push({
        key: Date.now(),
        time: '',
        company: '',
        position: '',
    })
}
const submit = () => {
    (formRef.value as any).validate((valid: any, fields: any) => {
        if (valid) {
            ElMessage({
                type: 'success',
                message: '提交成功'
            })
            form.value = JSON.parse(JSON.stringify(defaultForm))
            setTimeout(() => {
                (formRef.value as any).resetFields()
            }, 100)
        }
    })
}

const formRef = ref(null)
const reset = () => {
    form.value = JSON.parse(JSON.stringify(defaultForm))
    setTimeout(() => {
        (formRef.value as any).resetFields()
    }, 100)
}
</script>


<style lang="less" scoped>
.record {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .form-wrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        // flex: 1;
        // overflow-y: scroll;

        .el-form {
            width: 650px;

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