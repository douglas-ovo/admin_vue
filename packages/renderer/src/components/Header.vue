<template>
    <div class="header">
        <div class="left">
            <h2>知识产权从业人员信息化管理系统</h2>
        </div>
        <el-dropdown>
            <div class="right">
                <div class="avatar" :style="avatar"></div>
                <div class="un">{{ username }}</div>
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
import { computed, ref } from "vue";
import Mock from 'mockjs';

const router = useRouter()

const username = computed(() => {
    if (localStorage.getItem('newuserinfo')) {
        return JSON.parse(localStorage.getItem('newuserinfo') as string).username
    } else {
        return JSON.parse(sessionStorage.getItem('userinfo') as string).username
    }
})

const avatar = computed(() => {
    let color = Mock.mock('@color()')
    return {
        background: color
    }
})

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