<template>
    <div class="charts">
        <div class="container " ref="container1"></div>
        <div class="container " ref="container2"></div>
    </div>
</template>


<script lang="ts">
export default {
    name: ""
}
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts';
const container1 = ref<HTMLElement | null>(null)
const container2 = ref<HTMLElement | null>(null)
const initChart = () => {
    const myChart1 = echarts.init(container1.value as HTMLElement)
    myChart1.setOption({
        title: {
            text: '商品销量'
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
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    });
    const myChart2 = echarts.init(container2.value as HTMLElement)
    myChart2.setOption({
        title: {
            text: '分类销量'
        },
        series: [
            {
                type: 'pie',
                data: [
                    {
                        value: 335,
                        name: '直接访问'
                    },
                    {
                        value: 234,
                        name: '联盟广告'
                    },
                    {
                        value: 1548,
                        name: '搜索引擎'
                    }
                ]
            }
        ]
    })
}

onMounted(() => {
    initChart()
})
</script>


<style lang="less" scoped>
.charts {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.container {
    width: 400px;
    height: 400px;
}
</style>