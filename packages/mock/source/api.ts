import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const api: MockMethod[] = [
    {
        url: '/login.json',
        method: 'post',
        response(option: any) {
            let un = option.body.username === 'admin'
            let pw = option.body.password === '123123'
            return {
                status: un && pw ? 1 : 2,
                message: un && pw ? '登录成功' : '登录失败，请检查密码或账号是否正确'
            }
        }
    },
    {
        url: '/userinfo.json',
        method: 'get',
        response() {
            return Mock.mock({
                "string|1-10": "★"
            })
        }
    },
]

export default api