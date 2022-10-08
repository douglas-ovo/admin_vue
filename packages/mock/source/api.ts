import { MockMethod } from 'vite-plugin-mock'
import login from "./modules/login";
// import role from './modules/role'
import cate from './modules/cate'
import info from './modules/info'

const api: MockMethod[] = [
    login as MockMethod,
    // ...role as MockMethod[],
    ...cate as MockMethod[],
    ...info as MockMethod[]
]

export default api