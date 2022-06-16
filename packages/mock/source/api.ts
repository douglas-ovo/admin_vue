import { MockMethod } from 'vite-plugin-mock'
import Mock, { Random } from 'mockjs'
import { IPubilc, role, roleAuthOption } from './data.js'

const api: MockMethod[] = [
    {
        url: '/login.json',
        method: 'post',
        response(option: any) {
            const newUserinfo = JSON.parse(localStorage.getItem('newuserinfo') as string)
            let un, pw
            if (newUserinfo) {
                un = option.body.username === newUserinfo.username
                pw = option.body.password === newUserinfo.password
            } else {
                un = option.body.username === 'admin'
                pw = option.body.password === '123123'
            }

            return {
                status: un && pw ? 1 : 2,
                message: un && pw ? '登录成功' : '登录失败，请检查密码或账号是否正确'
            }
        }
    },
    {
        url: '/charts.json',
        method: 'get',
        response(option: any) {
            return {
                chart1: {
                    title: {
                        text: '商品销量',
                        left: 'center',
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '销量',
                            type: 'bar',
                            colorBy: 'data',
                            data: [
                                Mock.mock({
                                    "number|1-100": 100
                                }).number, Mock.mock({
                                    "number|1-100": 100
                                }).number, Mock.mock({
                                    "number|1-100": 100
                                }).number, Mock.mock({
                                    "number|1-100": 100
                                }).number, Mock.mock({
                                    "number|1-100": 100
                                }).number, Mock.mock({
                                    "number|1-100": 100
                                }).number
                            ]
                        }
                    ]
                },
                chart2: {
                    title: {
                        text: '分类销量',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    label: {
                        position: 'outer',
                        alignTo: 'labelLine',
                        bleedMargin: 50
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 10
                    },
                    series: [
                        {
                            type: 'pie',
                            data: [
                                {
                                    value: Mock.mock({
                                        "number|1-100": 1000
                                    }).number,
                                    name: '直接访问'
                                },
                                {
                                    value: Mock.mock({
                                        "number|1-100": 1000
                                    }).number,
                                    name: '联盟广告'
                                },
                                {
                                    value: Mock.mock({
                                        "number|1-100": 1000
                                    }).number,
                                    name: '搜索引擎'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    },
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
            let index: any = role.findIndex(item => item.id === option.body.id)
            role[index].status = option.body.status
        }
    }
]

export default api