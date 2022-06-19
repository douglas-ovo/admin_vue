import Mock, { Random } from 'mockjs';
export const charts = {
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
}