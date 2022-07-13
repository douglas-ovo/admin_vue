import { MockMethod } from 'vite-plugin-mock'
import role from './modules/role'
import login from "./modules/login";
import chart from './modules/charts'
import cate from './modules/cate'

const api: MockMethod[] = [
    login as MockMethod,
    chart as MockMethod,
    ...role as MockMethod[],
    ...cate as MockMethod[]
]

export default api