<template>
  <div id="myChart" style="width:100%;height: 100%;"></div>
</template>

<script>
// @ is an alias to /src
import 'echarts/map/js/china'

const option = {
  title: {
    text: '实时疫情地图',
    x: 'center',
    textStyle: {
      color: '#9c0505'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '地区：{b}<br/>确诊：{c}'
  },
  series: [
    {
      type: 'map',
      map: 'china',
      data: [],
      label: {
        show: true,
        color: 'red',
        fontSize: 10
      },
      zoom: 1.0,
      itemStyle: {
        borderColor: 'blue'
      },
      emphasis: {
        label: {
          color: '#055',
          fontSize: 12
        },
        itemStyle: {
          areaColor: 'yellow'
        }
      }
    }
  ],
  visualMap: {
    type: 'piecewise',
    show: true,
    pieces: [
      { min: 10000 },
      {
        min: 1000,
        max: 9999
      },
      {
        min: 100,
        max: 999
      },
      {
        min: 10,
        max: 99
      },
      {
        min: 1,
        max: 9
      },
      { value: 0 }
    ],
    inRange: {
      color: ['#fff', '#ffaa85', '#660208']
    },
    itemWidth: 10,
    itemHeight: 10
  },
  toolbox: {
    show: true,
    orient: 'horizontal',
    left: 'right',
    top: 'top',
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  }
}
export default {
  name: 'ChinaEpidemic',
  data: () => ({
    myEchart: ''
  }),
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.myEchart = this.$echarts.init(document.getElementById('myChart'))
      this.myEchart.showLoading()
      this.getData()
      window.onresize = this.myEchart.resize
    },
    getData () {
      this.$axios.get('https://lab.isaaclin.cn/nCoV/api/area').then((res) => {
        const arr = res.data.results.filter(item => {
          if (item.countryName === '中国') return item
        })
        const lists = arr.map(item => {
          return {
            name: item.provinceShortName,
            value: item.currentConfirmedCount
          }
        })
        console.log(lists)
        option.series[0].data = lists
        this.myEchart.setOption(option)
        this.myEchart.hideLoading()
      })
    }
  }
}
</script>
