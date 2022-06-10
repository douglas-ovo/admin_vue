import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const userinfo = (options: any) => {
    return Mock.mock({
        "string|1-10": "★"
    })
}
const list = (options: any) => { }

const login = (options: any) => {
    let un = options.body.username === 'admin'
    let pw = options.body.password === '123123'

    return {
        status: un && pw ? 1 : 2,
        message: un && pw ? '登录成功' : '登录失败'
    }
}

const api: MockMethod[] = [
    { url: '/login.json', method: 'post', response: login },
    { url: '/userinfo.json', method: 'get', response: userinfo },
    { url: '/list.json', method: 'get', response: list },
]

export default api