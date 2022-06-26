<template>
    <div class="menu">
        <el-menu active-text-color="#ffd04b" unique-opened background-color="#545c64"
            class="menu-inner el-menu-vertical-demo" default-active="1" text-color="#fff" router>
            <el-menu-item index="/charts">
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
                <el-menu-item index="/role">角色管理</el-menu-item>
                <el-menu-item index="/cate">商品分类管理</el-menu-item>
                <el-menu-item index="/goods">商品管理</el-menu-item>
                <el-menu-item index="/user">用户管理</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询</span>
                </template>
                <el-menu-item index="/catequery">商品分类查询</el-menu-item>
                <el-menu-item index="/goodsquery">商品查询</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/setting">
                <el-icon>
                    <Setting />
                </el-icon>
                <span>个人设置</span>
            </el-menu-item>

            <el-menu-item index="/about">
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
</script>


<style lang="less" scoped>
.menu {
    width: 200px;
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