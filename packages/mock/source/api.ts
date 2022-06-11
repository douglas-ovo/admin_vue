import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const api: MockMethod[] = [
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