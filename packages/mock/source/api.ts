import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const userinfo = (options: any) => {
    return Mock.mock({
        "string|1-10": "★"
    })
}
const list = (options: any) => { }
const login = ({ params }: any) => {
    return {
        status: params ? 200 : 404,
        message: '登录成功'
    }
}

const api: MockMethod[] = [
    { url: 'login.json', method: 'post', response: login },
    { url: '/userinfo.json', method: 'get', response: userinfo },
    { url: '/list.json', method: 'get', response: list },
]

export default api