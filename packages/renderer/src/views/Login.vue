<template>
    <div>
        <el-form :model="form" label-width="120px">
            <el-form-item label="用户名">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="用户密码">
                <el-input v-model="form.password" />
            </el-form-item>
        </el-form>
    </div>
</template>


<script lang="ts">
export default {
    name: "Login"
}
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
interface IForm {
    username: string
    password: string
}
const form = reactive<IForm>({
    username: '',
    password: ''
})
</script>


<style lang="less" scoped>
</style>