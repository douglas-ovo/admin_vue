<template>
    <div class="chat">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>在线互动沟通</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="search">
            <el-form :model="form" ref="formRef" label-width="80px">
                <el-form-item label="关键词">
                    <el-input v-model="form.name" style="width: 200px;" />
                </el-form-item>

                <el-form-item label="工作年限">
                    <el-input-number v-model="form.years" :min="1" :max="30" />
                </el-form-item>

                <el-form-item label="业务类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择所属业务类型" style="width:100%">
                        <el-option v-for="(item,index) in type" :label="item.message" :value="item.value" />
                    </el-select>
                </el-form-item>

                <div class="btn">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="onReset">重置</el-button>
                </div>
            </el-form>
        </div>

        <div class="com-list">
            <div class="user" v-for="item in comList" :key="item.id" @click="communicate(item)">
                <img :src="item.avatar" alt="">
                <div class="info">
                    <div>{{item.name}}</div>
                    <div>工作年限：<span>{{item.years}}年</span></div>
                    <div>个人简介：<span>{{item.remark}}</span></div>
                </div>
                <p :class="['tag',`tag${item.status}`]">
                    {{status(item)}}
                </p>
            </div>
        </div>

        <el-dialog v-model="chat" :title="title" width="40%">
            <div class="chat-box" ref="chatRef">
                <div class="chat-item" v-for="(item,index) in chatMsg" :key="index">
                    <div class="ta" v-if="item.from===0">
                        <div class="avatar">TA</div>
                        <div class="msg">{{item.content}}</div>
                    </div>

                    <div class="wo" v-else>
                        <div class="msg">{{item.content}}</div>
                        <div class="avatar">我</div>
                    </div>
                </div>
            </div>

            <div class="chat-input">
                <el-input v-model="inputMsg" type="textarea" resize="none" @keydown.prevent.enter="send" />
                <el-button class="btn" type="primary" @click="send" style="width: 100px;">发送</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const chatRef = ref<Element | null>(null)
const inputMsg = ref('')
interface Imsg {
    content: string,
    from: number
}

const form = ref({
    name: '',
    type: '',
    years: 2
})

const type = ref([
    { value: 0, message: '专利' },
    { value: 1, message: '商标' },
    { value: 2, message: '版权' },
])

const onSubmit = () => { }
const onReset = () => {
    form.value = {
        name: '',
        type: '',
        years: 2
    }
}

const send = () => {
    if (inputMsg.value.trim() !== '') {
        let msg: Imsg = {
            content: inputMsg.value,
            from: 1
        }
        chatMsg.value.push(msg)

        inputMsg.value = ''

        if (chatRef.value) {
            nextTick(() => {
                if (chatRef.value)
                    chatRef.value.scrollTop = chatRef.value.clientHeight
            })
        }
    }
}

const chat = ref(false)
const chatMsg = ref<Imsg[]>([])
const title = ref('')

const communicate = (item: any) => {
    chat.value = true
    title.value = item.name
    chatMsg.value = item.msg
    nextTick(() => {
        if (chatRef.value)
            chatRef.value.scrollTop = chatRef.value.clientHeight
    })
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

interface Icom {
    id: number,
    name: string,
    avatar: string,
    status: number,
    msg: Imsg[],
    years: number,
    remark: string
}

const comList = ref<Icom[]>([
    {
        id: 0,
        name: '张三三',
        avatar: 'https://img0.baidu.com/it/u=2264664417,2109988758&fm=253&fmt=auto&app=138&f=PNG?w=265&h=265',
        status: 1,
        years: 5,
        remark: '聊聊？',
        msg: [
            { content: '你好啊', from: 0 },
            { content: 'hello', from: 1 },
            { content: '在吗', from: 0 }
        ]
    },
    {
        id: 1,
        name: '李思思',
        avatar: 'https://img2.baidu.com/it/u=2893147358,3393430132&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        status: 0,
        years: 10,
        remark: '从业十年',
        msg: [
            { content: '在忙吗', from: 1 },
            { content: '有事？', from: 0 },
        ]
    },
    {
        id: 2,
        name: '张三疯',
        years: 3,
        remark: '欢迎来访',
        avatar: 'https://img2.baidu.com/it/u=1338017924,2404379381&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=450',
        status: 2,
        msg: [
            { content: '有空吗', from: 0 },
        ]
    }
])
</script>


<style lang="less" scoped>
.chat {
    width: 100%
}

.search {
    padding: 0 50px;

    .el-form {
        display: flex;
        justify-content: space-between;
    }
}

.com-list {
    margin-top: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .user {
        position: relative;
        display: flex;
        align-items: center;
        height: 100px;
        width: 250px;
        background: #f0f0f0;
        border-radius: 10px;
        margin-left: 50px;
        margin-bottom: 50px;
        padding: 10px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: scale(1.1);
        }

        img {
            height: 70px;
            width: 70px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .info {
            font-size: 15px;

            div:nth-child(1) {
                font-weight: bold;
            }

            div:not(:nth-child(1)) {
                color: gray;
            }

            span {
                font-weight: bold;
            }
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

.chat-box {
    max-height: 300px;
    overflow-y: auto;
    background: #f0f0f0;
    padding: 10px;

    .chat-item {
        margin-bottom: 10px;

        .avatar {
            width: 50px;
            font-size: 30px;
            height: 50px;
            color: #fff;
            font-weight: bold;
            line-height: 50px;
            text-align: center;
            border-radius: 50%;
        }

        .msg {
            min-height: 50px;
            line-height: 50px;
            margin: 0 10px;
            padding: 0 30px;
            background: skyblue;
            border-radius: 25px;
        }

        .ta {
            .msg {
                background: pink;
            }
        }

        .ta {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .avatar {
                background: #bb377d;
            }
        }

        .wo {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .avatar {
                background: indigo;
            }
        }
    }
}

.chat-input {
    display: flex;
    flex-direction: column;

    .btn {
        align-self: flex-end;
    }
}

/deep/.el-overlay .el-overlay-dialog .el-dialog .el-dialog__body {
    padding: 0;
    padding-bottom: 10px;
}
</style>