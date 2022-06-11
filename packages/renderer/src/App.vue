<template>
  <h2>{{ text }} electron+vite+ts+mock</h2>
  <button @click="handleClick">点击</button>
  <div ref="container" class="container"></div>
  <h3>{{ counter }}</h3>
  <button @click="store.increment()">add</button>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts';
import { storeToRefs } from 'pinia'
import useStore from './store'
const store = useStore()
const { counter } = storeToRefs(store)

const container = ref<HTMLElement | null>(null)
const initChart = () => {
  const myChart = echarts.init(container.value as HTMLElement)
  myChart.setOption({
    title: {
      text: 'ECharts 入门示例'
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
}
const text = ref('')
axios.get("/userinfo.json").then(res => {
  text.value = res.data
})
const handleClick = () => {
  ElMessage('this is a message.')
}
onMounted(() => {
  initChart()
})
</script>

<style lang="less">
#app {
  height: 100%;
}

.container {
  width: 200px;
  height: 200px
}
</style>
