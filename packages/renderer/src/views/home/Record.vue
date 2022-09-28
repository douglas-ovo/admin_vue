<template>
    <div class="record">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>工作经历</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="form-wrap">
            <el-form ref="formRef" :model="form" label-width="120px">
                <div class="record" v-for="(item, index) in form.record" :key="item.key">
                    <el-form-item :label="'工作时间' + index" :prop="'record.'+index+'.time'" :rules="{
                      required: true,
                      message: '请填写工作时间',
                      trigger: 'blur',
                    }">
                        <el-input v-model="item.time" />
                    </el-form-item>

                    <el-form-item :label="'公司名称' + index" :prop="'record.'+index+'.company'" :rules="{
                      required: true,
                      message: '请填写公司名称',
                      trigger: 'blur',
                    }">
                        <el-input v-model="item.company" />
                    </el-form-item>

                    <el-form-item :label="'职位名称' + index" :prop="'record.'+index+'.position'" :rules="{
                      required: true,
                      message: '请填写职位名称',
                      trigger: 'blur',
                    }">
                        <el-input v-model="item.position" />
                    </el-form-item>

                    <el-button class="mt-2" v-if="index!==0" @click.prevent="del(index)">删除</el-button>
                </div>

                <el-form-item>
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click="add">添加经历</el-button>
                    <el-button @click="reset">重置</el-button>
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
import { ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

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

</style>