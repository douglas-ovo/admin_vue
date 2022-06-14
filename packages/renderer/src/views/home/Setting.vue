<template>
    <div class="setting">
        <h3>更改用户信息</h3>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password" style="margin-top: 30px;">
                <el-input v-model="ruleForm.password" type="password" show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="cpassword" style="margin-top: 30px;">
                <el-input v-model="ruleForm.cpassword" type="password" show-password />
            </el-form-item>
            <el-button @click="handleLogin" type="primary" style="margin-top: 30px;width: 420px;margin-left: 80px;">
                确定</el-button>
        </el-form>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const ruleForm = reactive({
    username: '',
    password: '',
    cpassword: ''
})
const rules = reactive<FormRules>({
    username: [
        { type: 'string', required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 8, message: '请输入5-8位用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入用户密码', trigger: 'blur' },
        { min: 6, max: 10, message: '请输入6-10位用户密码', trigger: 'blur' },
    ],
    cpassword: [
        { required: true, message: '请输入用户密码', trigger: 'blur' },
        { min: 6, max: 10, message: '请输入6-10位用户密码', trigger: 'blur' },
    ],
})

const ruleFormRef = ref(null)
const handleLogin = () => {
    (ruleFormRef.value as any).validate((valid: any, fields: any) => {
        if (valid) {
            if (ruleForm.password === ruleForm.cpassword) {
                localStorage.setItem('newuserinfo', JSON.stringify({ ...ruleForm }))
                router.push({ name: 'login' })
                ElMessage({
                    type: 'success',
                    message: '修改用户信息成功，请重新登录'
                })
            } else {
                ElMessage({
                    type: 'warning',
                    message: '请保证密码一致'
                })
            }
        }
    })
}
</script>


<style lang="less" scoped>
.setting {
    width: 100%;
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
        margin: 50px 0 30px 50px;
    }
}
</style>