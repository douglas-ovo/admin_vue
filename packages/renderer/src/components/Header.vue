<template>
    <div class="header">
        <h2>haha</h2>
        <el-dropdown ref="dropdown1" style="margin-right: 30px">
            <div class="userinfo">
                <div class="avatar"></div>
                <div class="un">admin</div>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="quit">退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
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

const router = useRouter()

const dropdown1 = ref()
function handleVisible2(visible: any) {
    if (visible) {
        dropdown1.value.handleClose()
    } else {
        dropdown1.value.handleOpen()
    }
}
function showClick() {
    dropdown1.value.handleOpen()
}
function quit() {
    router.push({ name: 'login' })
    sessionStorage.removeItem('userinfo')
}
</script>


<style lang="less" scoped>
.header {
    height: 100px;
    background: #baccd9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
}

.userinfo {
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .avatar {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background: #f2b9b2;
        margin-right: 10px;
    }
}
</style>