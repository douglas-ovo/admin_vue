<template>
    <div class="login">
        <div class="left">
            <h1>xx系统</h1>
        </div>
        <div class="right">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username" style="margin-top: 70px;">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password" style="margin-top: 30px;">
                    <el-input v-model="ruleForm.password" type="password" />
                </el-form-item>
                <el-button @click="handleLogin" type="primary" style="margin-top: 30px;width: 380px;margin-left: 80px;">
                    登录</el-button>
            </el-form>
        </div>
    </div>
    <Particles id="tsparticles" class="login-partic" :options="options" />
</template>


<script lang="ts">
export default {
    name: "Login"
}
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import axios from '../http'

const options = reactive({})

const router = useRouter()

const ruleForm = reactive({
    username: '',
    password: ''
})
const rules = reactive<FormRules>({
    username: [
        {
            trigger: 'blur',
            required: true,
            validator: (rule, value, callback) => {
                var passwordreg = /^\w+$/
                if (!passwordreg.test(value)) {
                    callback(
                        new Error(
                            '用户名必须英文字母、数字、下划线组成!'
                        )
                    )
                } else {
                    callback()
                }
            }
        },
        { min: 5, max: 8, message: '请输入5-8位用户名', trigger: 'blur' },
    ],
    password: [
        {
            trigger: 'blur',
            required: true,
            validator: (rule, value, callback) => {
                var passwordreg = /^\w+$/
                if (!passwordreg.test(value)) {
                    callback(
                        new Error(
                            '用户名必须英文字母、数字、下划线组成!'
                        )
                    )
                } else {
                    callback()
                }
            }
        },
        { min: 6, max: 10, message: '请输入6-10位用户密码', trigger: 'blur' },
    ],
})

const ruleFormRef = ref(null)
const handleLogin = () => {
    (ruleFormRef.value as any).validate((valid: any, fields: any) => {
        if (valid) {
            axios.post('/login.json', { ...ruleForm }).then(res => {
                ElMessage({
                    type: res.data.status === 1 ? 'success' : 'error',
                    message: res.data.message
                })
                if (res.data.status === 1) {
                    router.push({ name: 'home' })
                    sessionStorage.setItem('userinfo', JSON.stringify(ruleForm))
                }
            })
        }
    })
}
</script>


<style lang="less" scoped>
.login {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-image: url(@/assets/img/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .right {
        width: 500px;
        height: 350px;
        background: #fff;
        border-radius: 10px;
        padding-right: 40px;
        box-shadow: 2px 2px 10px #06C;
    }
}
</style>