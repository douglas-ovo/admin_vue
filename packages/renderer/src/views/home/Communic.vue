<template>
    <div class="communic">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>在线互动沟通</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="com-list">
            <div class="user" v-for="item in comList" :key="item.id" @click="communicate(item)">
                <img :src="item.avatar" alt="">
                <span>{{item.name}}</span>
                <p :class="['tag',`tag${item.status}`]">
                    {{status(item)}}
                </p>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const communicate = (item: any) => {

}

const status = (item: any) => {
    let sta
    if (item.status === 0) {
        sta = '离线'
    } else if (item.status === 1) {
        sta = '在线'
    } else {
        sta = '忙碌'
    }
    return sta
}

const comList = ref([
    {
        id: 0,
        name: '科创知识产权',
        avatar: 'https://img0.baidu.com/it/u=2264664417,2109988758&fm=253&fmt=auto&app=138&f=PNG?w=265&h=265',
        status: 1
    },
    {
        id: 1,
        name: '智慧芽知识产权',
        avatar: 'https://img2.baidu.com/it/u=2893147358,3393430132&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        status: 0
    },
    {
        id: 2,
        name: '智享知识产权',
        avatar: 'https://img2.baidu.com/it/u=1338017924,2404379381&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=450',
        status: 2
    }
])
</script>


<style lang="less" scoped>
.com-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .user {
        position: relative;
        display: flex;
        align-items: center;
        height: 100px;
        width: 450px;
        background: #f0f0f0;
        border-radius: 10px;
        margin-left: 50px;
        margin-bottom: 50px;
        padding: 30px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: scale(1.1);
        }

        img {
            height: 70px;
            width: 70px;
            border-radius: 50%;
        }

        span {
            margin-left: 30px;
            font-size: 20px;
            font-weight: bold;
        }

        .tag {
            position: absolute;
            right: 0;
            top: 0;
            color: rgb(15, 221, 60);
            width: 80px;
            height: 30px;
            background: linear-gradient(to right, #fbd3e9, #bb377d);
            border-radius: 0 10px 0 10px;
            line-height: 30px;
            text-align: center;

            &.tag0 {
                color: #ccc;
            }

            &.tag2 {
                color: rgb(235, 195, 18);
            }
        }
    }
}
</style>