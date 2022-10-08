import Mock, { Random } from 'mockjs'
interface IPubilc {
    [k: string]: any
}

let info: IPubilc[] = [
    {
        id: 1,
        name: '张三三',
        educational: 3,
        major: '物联网工程',
        unit: 'xxx有限公司',
        remark: '练习时长两年半',
        address: '重庆市渝北区',
        linkman: '张三',
        phone: '10010',
        gender: 1,
        record: [
            {
                userid: 1,
                id: Mock.mock('@id()'),
                time: '2020',
                company: 'xxx公司1',
                position: 'java工程师'
            }
        ],
        train: [
            {
                userid: 1,
                id: Mock.mock('@id()'),
                time: '2019',
                company: '中公教育',
                position: '基本培训',
            }
        ],
        case: [
            {
                userid: 1,
                id: Mock.mock('@id()'),
                name: '新能源汽车1',
                year: '2020',
                type: 0,
                intro: '新能源汽车专利',
                error: '专利被申请',
                deal: '重置申请'
            }
        ]
    },
    {
        id: 2,
        name: '李思思',
        educational: 3,
        major: '物联网工程',
        unit: 'xxx有限公司',
        remark: '练习时长两年半',
        address: '',
        linkman: '张三',
        phone: '10010',
        gender: 0,
        record: [
            {
                userid: 2,
                id: Mock.mock('@id()'),
                time: '2022',
                company: 'xxx公司2',
                position: 'java工程师2'
            }
        ],
        train: [
            {
                userid: 2,
                id: Mock.mock('@id()'),
                time: '2019',
                company: '中公教育',
                position: '基本培训',
            }
        ],
        case: [
            {
                userid: 2,
                id: Mock.mock('@id()'),
                name: '新能源汽车1',
                year: '2020',
                type: 0,
                intro: '新能源汽车专利',
                error: '专利被申请',
                deal: '重置申请'
            }
        ]
    }
]

export default [
    //基本信息
    {
        url: '/getinfo.json',
        method: 'get',
        response() {
            return info
        }
    },
    //工作履历
    {
        url: '/getrecord.json',
        method: 'get',
        response() {
            let record = info.map(item => {
                return item.record
            })
                .reduce((pre, cur) => {
                    return pre.concat(cur)
                }, [])

            return record
        }
    },
    //继续教育
    {
        url: '/gettrain.json',
        method: 'get',
        response() { }
    },
    //经典案例
    {
        url: '/getcase.json',
        method: 'get',
        response() { }
    },
]