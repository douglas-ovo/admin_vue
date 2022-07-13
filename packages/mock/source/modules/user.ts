import Mock, { Random } from 'mockjs'
interface IPubilc {
    [k: string]: any
}
const user: IPubilc[] = [
    {
        id: Mock.mock('@id()'),
        name: 'admin',
        auth: 1,
        setTime: Random.now('week'),
    },
    {
        id: Mock.mock('@id()'),
        name: 'test',
        setTime: Random.now('week'),
        auth: 2
    }
]
const userAuthOption: IPubilc = [
    { id: 1, label: '系统管理员' },
    { id: 2, label: '普通管理员' }
]

export default [
    {
        url: '/getuser.json',
        method: 'get',
        response() {
            return user
        }
    },
    {
        url: '/getUserAuthOption.json',
        method: 'get',
        response() {
            return userAuthOption
        }
    },
    {
        url: '/editUser.json',
        method: 'post',
        response(option: any) {
            let { id, auth } = option.body
            let index: any = user.findIndex(item => item.id === id)
            
            user[index].auth = auth

            return user
        }
    }
]