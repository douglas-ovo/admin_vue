<template>
    <div class="login">
        <h1 class="title">hahah</h1>
        <div class="wrap">
            <el-form :model="form" :rules="rules" ref="formDom" label-width="80px" style="width: 450px;">
                <el-form-item label="用户名" prop="username" style="margin-top: 70px;">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="密  码" prop="password" style="margin-top: 30px;">
                    <el-input type="password" v-model="form.password" />
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="handleLogin(formDom)"
                style="margin-top: 30px; width: 370px;margin-left: 80px;">登录
            </el-button>
        </div>
    </div>
</template>


<script lang="ts">
export default {
    name: "Login"
}
</script>
<script lang="ts" setup>
import Base64 from '../utils/encoded'
import axios from '../http'
import { IForm } from '../type'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const form = reactive<IForm>({
    username: '',
    password: ''
})
const rules = reactive<FormRules>({
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入用户密码', trigger: 'blur' },
})

const formDom = ref<FormInstance>()
const handleLogin = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            axios.post('/login.json', { ...form }).then(res => {
                ElMessage({
                    type: res.data.status === 1 ? 'success' : 'error',
                    message: res.data.message
                })
                if (res.data.status === 1) {
                    router.push({ name: 'home' })

                    const base = new Base64()
                    sessionStorage.setItem('userinfo', JSON.stringify({
                        username: base.encode(form.username),
                        password: base.encode(form.password)
                    }))
                }
            })
        }
    })
}
</script>


<style lang="less" scoped>
.login {
    height: 100%;
    background: #2b333e;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
}

.title {
    margin-top: 250px;
}

.wrap {
    height: 300px;
    width: 500px;
    margin-top: 150px;
    background: #fff;
    overflow: hidden;
    border-radius: 10px;
}
</style>