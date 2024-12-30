<template>
  <div>
    <h1>测试页面 - ECharts 图谱可视化</h1>
    <div>
      <!-- 调整图表大小的按钮 -->
      <button @click="resizeChart">调整图表大小</button>
    </div>
    <!-- 图表容器 -->
    <div id="chart-container" :style="{ width: chartWidth, height: chartHeight }"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'TestPage',

  data() {
    return {
      chartWidth: '100%', // 初始宽度
      chartHeight: '400px', // 初始高度
    }
  },

  mounted() {
    this.loadLocalData()
  },

  methods: {
    loadLocalData() {
      fetch('/data/les-miserables.json')
        .then((response) => response.json())
        .then((data) => {
          this.initChart(data)
        })
        .catch((error) => {
          console.error('加载本地数据失败：', error)
        })
    },

    initChart(graph) {
      const chartDom = document.getElementById('chart-container')
      const myChart = echarts.init(chartDom)

      const option = {
        tooltip: {},
        legend: [
          {
            data: graph.categories.map(function (a) {
              return a.name
            }),
          },
        ],
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            label: {
              show: true,
              position: 'right',
              formatter: '{b}',
            },
            labelLayout: {
              hideOverlap: true,
            },
            scaleLimit: {
              min: 0.4,
              max: 2,
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3,
            },
          },
        ],
      }

      myChart.setOption(option)
      window.addEventListener('resize', myChart.resize)
    },

    resizeChart() {
      // 动态调整图表容器大小
      this.chartWidth = '80%' // 新的宽度
      this.chartHeight = '1200px' // 新的高度
    },
  },
}
</script>

<style scoped>
#chart-container {
  width: 100%;
  /* 默认宽度 */
  height: 400px;
  /* 默认高度 */
  transition: all 0.3s;
  /* 平滑过渡效果 */
}
</style>
