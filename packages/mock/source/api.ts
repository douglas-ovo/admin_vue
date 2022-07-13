import { MockMethod } from 'vite-plugin-mock'
import role from './modules/role'
import login from "./modules/login";
import chart from './modules/charts'
import cate from './modules/cate'
import user from './modules/user'

const api: MockMethod[] = [
    login as MockMethod,
    chart as MockMethod,
    ...role as MockMethod[],
    ...cate as MockMethod[],
    ...user as MockMethod[]
]

export default api