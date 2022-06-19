import { MockMethod } from 'vite-plugin-mock'
import { roles } from './modules/role'
import { login } from "./modules/login";
import { charts } from './modules/charts'

const api: MockMethod[] = [
    login as MockMethod,
    charts as MockMethod,
    ...roles as MockMethod[]
]

export default api