import Mock, { Random } from 'mockjs'
interface IPubilc {
    [k: string]: any
}
let cate: IPubilc[] = [
    {
        id: 1,
        name: '手机',
        status: false,
        setTime: Random.now('week'),
    },
    {
        id: 2,
        name: '食品',
        status: true,
        setTime: Random.now('week'),
    },
    {
        id: 3,
        name: '百货',
        status: true,
        setTime: Random.now('week'),
    },
    {
        id: 4,
        name: '男装',
        status: true,
        setTime: Random.now('week'),
    },
    {
        id: 5,
        name: '女装',
        status: true,
        setTime: Random.now('week'),
    },
    {
        id: 6,
        name: '童装',
        status: true,
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


let goods: IPubilc[] = [
    {
        id: Mock.mock('@id()'),
        name: 'iPhone14',
        setTime: Random.now('week'),
        cate: 1
    },
    {
        id: Mock.mock('@id()'),
        name: '小米粥',
        setTime: Random.now('week'),
        cate: 2
    },
    {
        id: Mock.mock('@id()'),
        name: '公牛插座',
        setTime: Random.now('week'),
        cate: 3
    },
    {
        id: Mock.mock('@id()'),
        name: '短裤男夏季潮流',
        setTime: Random.now('week'),
        cate: 4
    },
    {
        id: Mock.mock('@id()'),
        name: '碎花裙女夏季潮流',
        setTime: Random.now('week'),
        cate: 5
    },
    {
        id: Mock.mock('@id()'),
        name: '儿童速干衣',
        setTime: Random.now('week'),
        cate: 6
    },
]
const pageGoods = (page: any, pageSize: any) => {
    let proportion = pageSize;
    let num = 0;
    let _data = [];
    for (let i = 0; i < goods.length; i++) {
        if (i % proportion == 0 && i != 0) {
            _data.push(goods.slice(num, i));
            num = i;
        }
        if ((i + 1) == goods.length) {
            _data.push(goods.slice(num, (i + 1)));
        }
    }
    return _data[page - 1];
}

export default [
    //分类管理
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
            const { name, status } = option.body
            let have = cate.find(item => item.name === name)
            console.log(have);
            if (!have) {
                cate.unshift({
                    id: Mock.mock('@id()'),
                    name,
                    status,
                    setTime: Random.now('second'),
                })
            }

            return {
                status: 200,
                message: !have ? '添加成功' : '不能添加重复数据'
            }
        }
    },
    {
        url: "/editcate.json",
        method: 'post',
        response(option: any) {
            const { name, status, id } = option.body
            let goodsItem = cate.find(item => item.id === id)
            if (goodsItem) {
                goodsItem.name = name
                goodsItem.status = status
            }

            return {
                status: 200,
                message: '编辑成功'
            }
        }
    },
    {
        url: "/deletecate.json",
        method: 'get',
        response(option: any) {
            const { ids } = option.query
            let id = ids.split(',')
            cate = cate.filter(item => !id.includes(item.id))
            return {
                status: 200,
                message: '删除成功'
            }
        }
    },
    //分类查询
    {
        url: "/querycate.json",
        method: 'post',
        response(option: any) {
            const { keyword } = option.body
            let useArr: any[] = []
            cate.forEach((item) => {
                if (item.name.match(RegExp(keyword))) {
                    useArr.push(item)
                }
            })

            return useArr
        }
    },
    //商品管理
    {
        url: "/getgoods.json",
        method: 'get',
        response(option: any) {
            const { page, pageSize } = option.query
            const totalPage = Math.ceil(goods.length / pageSize)
            return {
                result: pageGoods(page, pageSize),
                total: goods.length,
                totalPage
            }
        }
    },
    {
        url: "/addgoods.json",
        method: 'post',
        response(option: any) {
            const { name, cate } = option.body
            let have = goods.find(item => item.name === name)
            if (!have) {
                goods.unshift({
                    id: Mock.mock('@id()'),
                    name,
                    cate,
                    setTime: Random.now('second'),
                })
            }

            return {
                status: 200,
                message: !have ? '添加成功' : '不能添加重复数据'
            }
        }
    },
    {
        url: "/editgoods.json",
        method: 'post',
        response(option: any) {
            const { name, cate, id } = option.body
            let goodsItem = goods.find(item => item.id === id)
            if (goodsItem) {
                goodsItem.name = name
                goodsItem.cate = cate
            }

            return {
                status: 200,
                message: '编辑成功'
            }
        }
    },
    {
        url: "/deletegoods.json",
        method: 'get',
        response(option: any) {
            const { ids } = option.query
            let id = ids.split(',')
            goods = goods.filter(item => !id.includes(item.id))
            return {
                status: 200,
                message: '删除成功'
            }
        }
    },
]