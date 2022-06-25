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
    },
    {
        id: Mock.mock('@id()'),
        name: '男装',
        status: false,
        setTime: Random.now('week'),
    },
    {
        id: Mock.mock('@id()'),
        name: '女装',
        status: false,
        setTime: Random.now('week'),
    },
    {
        id: Mock.mock('@id()'),
        name: '童装',
        status: false,
        setTime: Random.now('week'),
    },
]

const pageCate = (page: any, pageSize: any) => {
    let proportion = pageSize;
    let num = 0;
    let _data = [];
    for (let i = 0; i < cate.length; i++) {
        if (i % proportion == 0 && i != 0) {
            _data.push(cate.slice(num, i));
            num = i;
        }
        if ((i + 1) == cate.length) {
            _data.push(cate.slice(num, (i + 1)));
        }
    }
    return _data[page - 1];
}

export default [
    {
        url: "/getcate.json",
        method: 'get',
        response(option: any) {
            const { page, pageSize } = option.query
            const totalPage = Math.ceil(cate.length / pageSize)
            return {
                result: pageCate(page, pageSize),
                total: cate.length,
                totalPage
            }
        }
    },
    {
        url: "/addcate.json",
        method: 'post',
        response(option: any) {

        }
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