import React, { useRef, useEffect } from 'react'
import * as echarts from "echarts"
import './lockAmount.css';

const Title = '每日解锁量'

const LockAmount = () => {
  const chartRef = useRef()
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current)
    const option = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: Title,
        left: 'center',
        textStyle: {
          color: '#FFFFFF'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        show: false
      },
      toolbox: {
        show: false
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        }
      ]
    }
    chartInstance.setOption(option)
  }, [])
  return <div className="chart-wrap">
    <div ref={chartRef} className="chart-container" />
  </div>
}

export { LockAmount }