import Mock, { Random } from 'mockjs'

export interface IPubilc {
    [k: string]: any
}
export const role: IPubilc[] = [
    {
        id: Mock.mock('@id()'),
        name: '系统管理员',
        status: true,
        setTime: Random.now('week'),
        auth: [
            { id: 1, label: '角色管理' },
            { id: 2, label: '商品管理' },
            { id: 3, label: '商品分类管理' },
            { id: 4, label: '用户管理' },
        ]
    },
    {
        id: Mock.mock('@id()'),
        name: '普通管理员',
        status: false,
        setTime: Random.now('week'),
        auth: [
            { id: 2, label: '商品管理' },
            { id: 3, label: '商品分类管理' },
        ]
    }
]
export const roleAuthOption: IPubilc = [
    { id: 1, label: '角色管理' },
    { id: 2, label: '商品管理' },
    { id: 3, label: '商品分类管理' },
    { id: 4, label: '用户管理' },
]