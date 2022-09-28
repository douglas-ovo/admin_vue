<template>
    <div class="info">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="form-wrap">
            <el-form :model="form" ref="formRef" label-width="120px" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请填写人员姓名" />
                </el-form-item>

                <el-form-item label="学历" prop="educational" style="width:100%">
                    <el-select v-model="form.educational" placeholder="请选择人员学历">
                        <el-option v-for="(item,index) in educational" :label="item.message" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="专业" prop="major">
                    <el-input v-model="form.major" placeholder="请填写人员专业" />
                </el-form-item>

                <el-form-item label="工作单位" prop="unit">
                    <el-input v-model="form.unit" placeholder="请填写人员工作单位" />
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                    <el-input v-model="form.remark" type="textarea" :rows="3" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="width:200px">提交</el-button>
                    <el-button @click="onReset" style="width:200px">重置</el-button>
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
import { ElMessage, FormRules } from 'element-plus'

const defaultForm = {
    name: '',
    educational: '',
    major: '',
    unit: '',
    remark: ''
}

const form = ref({
    name: '',
    educational: '',
    major: '',
    unit: '',
    remark: ''
})

const formRef = ref(null)
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
            }, 100)
        }
    })
}

const onReset = () => {
    form.value = JSON.parse(JSON.stringify(defaultForm))
    setTimeout(() => {
        (formRef.value as any).resetFields()
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
    major: [{ required: true, message: '请填写人员姓名', trigger: 'blur' }],
    unit: [{ required: true, message: '请填写人员姓名', trigger: 'blur' }]
})
</script>


<style lang="less" scoped>
.info {
    width: 100%;
    display: flex;
    flex-direction: column;

    .form-wrap {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .el-form {
            width: 650px;

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