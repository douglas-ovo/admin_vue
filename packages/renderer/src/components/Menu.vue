<template>
    <div class="menu">
        <el-menu active-text-color="#ffd04b" unique-opened background-color="#545c64"
            class="menu-inner el-menu-vertical-demo" default-active="1" text-color="#fff" @select="handleSelect">
            <el-menu-item index="1">
                <el-icon>
                    <TrendCharts />
                </el-icon>
                <span>概览</span>
            </el-menu-item>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <span>超级管理员</span>
                </template>
                <el-menu-item index="2-1">角色管理</el-menu-item>
                <el-menu-item index="2-2">商品分类管理</el-menu-item>
                <el-menu-item index="2-3">商品管理</el-menu-item>
                <el-menu-item index="2-4">用户管理</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询</span>
                </template>
                <el-menu-item index="3-1">商品分类查询</el-menu-item>
                <el-menu-item index="3-2">商品查询</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="4">
                <el-icon>
                    <Setting />
                </el-icon>
                <span>个人设置</span>
            </el-menu-item>

            <el-menu-item index="5">
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
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router";
import {
    Setting,
    QuestionFilled,
    TrendCharts,
    Avatar,
    Search
} from '@element-plus/icons-vue'

const router = useRouter()

const handleSelect = (key: string, keyPath: string[]) => {
    switch (key) {
        case '1':
            router.push({ name: 'charts' })
            break;
        case '2-1':
            router.push({ name: 'role' })
            break;
        case '4':
            router.push({ name: 'setting' })
            break;
        case '5':
            router.push({ name: 'about' })
            break;
    }
}
</script>


<style lang="less" scoped>
.menu {
    width: 250px;
    height: 100%;
    user-select: none;
    flex-shrink: 0;

    .menu-inner {
        height: 100%;
        padding-top: 20px;

        .el-menu-item {
            height: 60px;
        }
    }
}
</style>