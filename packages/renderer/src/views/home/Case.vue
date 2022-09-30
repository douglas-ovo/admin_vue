<template>
    <div class="case">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>经典案例</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="form-wrap">
            <el-form :model="form" ref="formRef" label-width="120px" :rules="rules">
                <el-form-item label="案例名称" prop="name">
                    <el-input v-model="form.name" placeholder="请填写案例名称" />
                </el-form-item>

                <el-form-item class="date" label="案例年份" prop="year">
                    <el-date-picker v-model="form.year" type="year" placeholder="请选择案例年份" />
                </el-form-item>

                <el-form-item label="所属业务类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择所属业务类型" style="width:100%">
                        <el-option v-for="(item,index) in type" :label="item.message" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="案例基本情况" prop="intro">
                    <el-input v-model="form.intro" type="textarea" placeholder="请填写案例基本情况简介" />
                </el-form-item>

                <div class="bottom">
                    <el-form-item label="问题争议点" prop="error">
                        <el-input v-model="form.error" type="textarea" />
                    </el-form-item>

                    <el-form-item label="方案解决" prop="deal">
                        <el-input v-model="form.deal" type="textarea" />
                    </el-form-item>
                </div>

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
    year: '',
    type: '',
    intro: '',
    error: '',
    deal: ''
}

const form = ref({
    name: '',
    year: '',
    type: '',
    intro: '',
    error: '',
    deal: ''
})

const type = ref([
    { value: 0, message: '专利' },
    { value: 1, message: '商标' },
    { value: 2, message: '版权' },
])

const rules = reactive<FormRules>({
    name: [{ required: true, message: '请填写案例名称', trigger: 'blur' }],
    year: [{ required: true, message: '请选择案例年份', trigger: 'blur' }],
    type: [{ required: true, message: '请选择案例所属业务类型', trigger: 'change' }],
    intro: [{ required: true, message: '请填写案例基本情况简介', trigger: 'change' }],
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
</script>


<style lang="less" scoped>
.case {
    width: 100%;
}

.form-wrap {
    display: flex;
    justify-content: space-around;
}

.el-form {
    box-shadow: 2px 2px 10px #06C;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    width: 650px;

    .el-form-item {
        margin-top: 30px;
    }

    .bottom {
        display: flex;
    }

    .date :deep(.el-input) {
        width: 100%;

        .el-input__wrapper {
            width: 100%
        }
    }
}
</style>