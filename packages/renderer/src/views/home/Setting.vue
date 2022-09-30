<template>
    <div class="setting">
        <div class="form-wrap">
            <h3>更改管理员信息</h3>
            <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="demo-form">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="新密码" prop="password" style="margin-top: 30px;">
                    <el-input v-model="form.password" type="password" show-password />
                </el-form-item>
                <el-form-item label="确认新密码" prop="cpassword" style="margin-top: 30px;">
                    <el-input v-model="form.cpassword" type="password" show-password />
                </el-form-item>
                <el-button @click="handleLogin" type="primary"
                    style="margin-top: 20px;width: 400px;margin-left: 100px;">
                    确定</el-button>
            </el-form>
        </div>
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

const form = reactive({
    username: '',
    password: '',
    cpassword: ''
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
    cpassword: [
        {
            trigger: 'blur',
            required: true,
            validator: (rule, value, callback) => {
                var passwordreg = /^\w+$/
                if (!passwordreg.test(value)) {
                    callback(
                        new Error(
                            '用户名必须英文字母、数字组成!'
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

const formRef = ref(null)
const handleLogin = () => {
    (formRef.value as any).validate((valid: any, fields: any) => {
        if (valid) {
            if (form.password === form.cpassword) {
                localStorage.setItem('newuserinfo', JSON.stringify({ ...form }))
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

    .form-wrap {
        box-shadow: 2px 2px 10px #06C;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        margin-top: 50px;
    }

    h3 {
        margin: 50px 0 30px 50px;
        margin-top: 0;
    }
}
</style>