<template>
    <div class="header">
        <div class="left">
            <h2>xx系统</h2>
        </div>
        <el-dropdown>
            <div class="right">
                <div class="avatar"></div>
                <div class="un">admin</div>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
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
import { useRouter } from 'vue-router';

const router = useRouter()

const exit = () => {
    sessionStorage.removeItem('userinfo')
    router.push({ name: 'login' })
}
</script>


<style lang="less" scoped>

.header {
    height: 12%;
    background: #74787a;
    display: flex;
    align-items: center;
    padding: 0 5%;
    justify-content: space-between;
    color: #fff;
}

.right {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

    .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #c08eaf;
        margin-right: 8px;
    }

    .un {
        color: #fff;
    }
}
</style>