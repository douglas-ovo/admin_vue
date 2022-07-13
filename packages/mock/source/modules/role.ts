import Mock, { Random } from 'mockjs'
interface IPubilc {
    [k: string]: any
}

const role: IPubilc[] = [
    {
        id: 1,
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
        id: 2,
        name: '普通管理员',
        status: false,
        setTime: Random.now('week'),
        auth: [
            { id: 2, label: '商品管理' },
            { id: 3, label: '商品分类管理' },
        ]
    }
]

const roleAuthOption: IPubilc = [
    { id: 1, label: '角色管理' },
    { id: 2, label: '商品管理' },
    { id: 3, label: '商品分类管理' },
    { id: 4, label: '用户管理' },
]

const user: IPubilc[] = [
    {
        id: Mock.mock('@id()'),
        name: 'admin',
        role: 1,
        setTime: Random.now('week'),
    },
    {
        id: Mock.mock('@id()'),
        name: 'test',
        setTime: Random.now('week'),
        role: 2
    }
]

export default [
    {
        url: '/getrole.json',
        method: 'get',
        response() {
            return role
        }
    },
    {
        url: '/getRoleAuthOption.json',
        method: 'get',
        response() {
            return roleAuthOption
        }
    },
    {
        url: '/editRole.json',
        method: 'post',
        response(option: any) {
            let { id, status, auth } = option.body
            auth = auth.split(',').map((id: any) => parseInt(id))

            let index: any = role.findIndex(item => item.id === id)
            role[index].status = status

            let newAuth: any[] = []
            roleAuthOption.map((item: any) => {
                let newAuthitem = {}
                auth.forEach((element: any) => {
                    if (item.id === element) {
                        newAuthitem = item
                    }
                });
                newAuth.push(newAuthitem)
            })
            newAuth = newAuth.filter(item => {
                return item.id !== undefined
            })

            role[index].auth = newAuth

            return role
        }
    },
    {
        url: '/getuser.json',
        method: 'get',
        response() {
            return user
        }
    },
    {
        url: '/editUser.json',
        method: 'post',
        response(option: any) {
            let { id, role } = option.body
            let index: any = user.findIndex(item => item.id === id)

            user[index].role = role

            return user
        }
    }
]