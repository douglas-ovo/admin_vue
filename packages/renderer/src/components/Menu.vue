<template>
    <div class="menu">
        <el-menu active-text-color="#ffd04b" unique-opened background-color="#545c64"
            class="menu-inner el-menu-vertical-demo" default-active="1" text-color="#fff" router>
            <el-menu-item index="/charts">
                <el-icon>
                    <PieChart />
                </el-icon>
                <span>概览</span>
            </el-menu-item>

            <el-menu-item index="/info">
                <el-icon>
                    <User />
                </el-icon>
                <span>基本信息</span>
            </el-menu-item>

            <el-menu-item index="/evaluate">
                <el-icon>
                    <Star />
                </el-icon>
                <span>资格评估</span>
            </el-menu-item>

            <el-menu-item index="/record">
                <el-icon>
                    <Printer />
                </el-icon>
                <span>工作经历</span>
            </el-menu-item>

            <el-menu-item index="/case">
                <el-icon>
                    <Edit />
                </el-icon>
                <span>经典案例</span>
            </el-menu-item>

            <el-menu-item index="/train">
                <el-icon>
                    <School />
                </el-icon>
                <span>继续教育</span>
            </el-menu-item>

            <el-menu-item index="/chat">
                <el-icon>
                    <Message />
                </el-icon>
                <span>在线互动沟通</span>
            </el-menu-item>

            <el-menu-item index="/setting">
                <el-icon>
                    <Setting />
                </el-icon>
                <span>管理员设置</span>
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
    PieChart,
    User,
    Star,
    Printer,
    Edit,
    School,
    Message
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