<template>
    <div class="menu">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
            text-color="#fff" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1" @click="menuCheck">
                <el-icon>
                    <Odometer />
                </el-icon>
                <span>仪表盘</span>
            </el-menu-item>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <span>超级管理员</span>
                </template>

                <el-menu-item index="2-1">
                    <el-icon>
                        <Stamp />
                    </el-icon>
                    <span>角色管理</span>
                </el-menu-item>

                <el-menu-item index="2-2">
                    <el-icon>
                        <Grid />
                    </el-icon>
                    <span>商品分类管理</span>
                </el-menu-item>

                <el-menu-item index="2-3">
                    <el-icon>
                        <Goods />
                    </el-icon>
                    <span>商品管理</span>
                </el-menu-item>

                <el-menu-item index="2-4">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>用户管理</span>
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item index="3">
                <el-icon>
                    <Setting />
                </el-icon>
                <span>系统工具</span>
            </el-menu-item>

            <el-menu-item index="4">
                <el-icon>
                    <QuestionFilled />
                </el-icon>
                <span>关于我们</span>
            </el-menu-item>

            <el-menu-item index="5">
                <el-icon>
                    <QuestionFilled />
                </el-icon>
                <span>关于我们</span>
            </el-menu-item>

            <el-menu-item index="6">
                <el-icon>
                    <QuestionFilled />
                </el-icon>
                <span>关于我们</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script lang="ts" setup>
import { ref, reactive, unref } from 'vue'
import { useRouter } from "vue-router";
import {
    // Menu as IconMenu,
    Avatar,
    Odometer,
    Setting,
    QuestionFilled,
    Stamp,
    Grid,
    Goods,
    User
} from '@element-plus/icons-vue'

const router = useRouter()

const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}

const menuCheck = (val: any) => {
    switch (val.index) {
        case '1':
            router.push({ name: 'chart' })
            break;

        default:
            break;
    }
}
</script>


<style lang="less" scoped>
.menu {
    height: 100%;
    width: 200px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    :deep(.el-menu-vertical-demo) {
        height: 100%;
        padding-top: 20px;
    }
}
</style>