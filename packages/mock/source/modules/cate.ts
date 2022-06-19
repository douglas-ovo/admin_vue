import Mock, { Random } from 'mockjs'
interface IPubilc {
    [k: string]: any
}
const cate: IPubilc[] = [
    {
        id: Mock.mock('@id()'),
        name: '手机',
        status: true,
        setTime: Random.now('week'),
    },
    {
        id: Mock.mock('@id()'),
        name: '食品',
        status: false,
        setTime: Random.now('week'),
    },
    {
        id: Mock.mock('@id()'),
        name: '百货',
        status: false,
        setTime: Random.now('week'),
    }
]

export default [
    {
        url: "/getcate.json",
        method: 'get',
        response(option: any) { }
    },
    {
        url: "/addcate.json",
        method: 'post',
        response(option: any) { }
    },
    {
        url: "/editcate.json",
        method: 'post',
        response(option: any) { }
    },
    {
        url: "/deletecate.json",
        method: 'get',
        response(option: any) { }
    }
]