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
import axios from '../../http';

const container1 = ref<HTMLElement | null>(null)
const container2 = ref<HTMLElement | null>(null)
const initChart = () => {
    axios.get('/charts.json', { params: {} }).then(res => {        
        const myChart1 = echarts.init(container1.value as HTMLElement)
        myChart1.setOption(res.data.chart1);
        const myChart2 = echarts.init(container2.value as HTMLElement)
        myChart2.setOption(res.data.chart2)
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