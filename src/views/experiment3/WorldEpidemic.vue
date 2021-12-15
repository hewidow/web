<template>
  <div id="myChart" style="width: 100%;height: 100%;"></div>
</template>

<script>

export default {
  name: 'WorldEpidemic',
  data () {
    return {
      myEchart: '',
      newArr: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.myEchart = this.$echarts.init(document.getElementById('myChart'))
      this.myEchart.showLoading()
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['累计确诊']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        yAxis: {
          type: 'category',
          data: []
        },
        xAxis: {
          type: 'value'
        },
        dataZoom: [
          {
            type: 'slider',
            yAxisIndex: [0],
            start: 90,
            end: 100
          }
        ],
        series: [
          {
            name: '累计确诊',
            type: 'bar',
            smooth: true,
            data: []
          }
        ]
      }
      this.$axios.get('https://lab.isaaclin.cn/nCoV/api/area').then((res) => {
        const arr = res.data.results
        for (let i = 0; i < arr.length; ++i) {
          let fg = false
          for (let j = 0; j < this.newArr.length; ++j) {
            if (this.newArr[j].countryName === arr[i].countryName) {
              this.newArr[j].confirmedCount += arr[i].confirmedCount
              fg = true
              break
            }
          }
          if (!fg) {
            this.newArr.push({
              countryName: arr[i].countryName,
              confirmedCount: arr[i].confirmedCount
            })
          }
        }
        this.newArr.sort(function (a, b) {
          return a.confirmedCount - b.confirmedCount
        })
        const yData = []
        const xData = []
        this.newArr.forEach(e => {
          yData.push(e.countryName)
          xData.push(e.confirmedCount)
        })
        option.yAxis.data = yData
        option.series[0].data = xData
        this.myEchart.setOption(option)
        this.myEchart.hideLoading()
      })
      window.onresize = this.myEchart.resize
    }
  }
}
</script>
