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
                id: 1,
                time: ['2020-10-01', '2020-11-02'],
                company: 'xxx公司1',
                position: 'java工程师'
            },
            {
                userid: 1,
                id: 2,
                time: ['2020-01-01', '2020-11-02'],
                company: 'xxx公司2',
                position: 'java工程师2'
            }
        ],
        train: [
            {
                userid: 1,
                id: 1,
                time: ['2020-10-01', '2020-11-02'],
                company: '中公教育',
                position: '基本培训',
            }
        ],
        case: [
            {
                userid: 1,
                id: 1,
                name: '新能源汽车1',
                year: '2022',
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
                id: 3,
                time: ['2020-10-01', '2020-11-02'],
                company: 'xxx公司2',
                position: 'java工程师2'
            }
        ],
        train: [
            {
                userid: 2,
                id: 2,
                time: ['2020-10-01', '2020-11-02'],
                company: '中公教育',
                position: '基本培训',
            }
        ],
        case: [
            {
                userid: 2,
                id: 2,
                name: '新能源汽车1',
                year: '2019',
                type: 0,
                intro: '新能源汽车专利',
                error: '专利被申请',
                deal: '重置申请'
            },
            {
                userid: 2,
                id: 3,
                name: '新能源汽车2',
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
        response() {
            let train = info.map(item => {
                return item.train
            })
                .reduce((pre, cur) => {
                    return pre.concat(cur)
                }, [])

            return train
        }
    },
    //经典案例
    {
        url: '/getcase.json',
        method: 'get',
        response() {
            let ca = info.map(item => {
                return item.case
            })
                .reduce((pre, cur) => {
                    return pre.concat(cur)
                }, [])

            return ca
        }
    },
]