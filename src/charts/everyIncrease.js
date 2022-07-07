import React, { useRef, useEffect, useState } from 'react'
import * as echarts from "echarts"
import { Form, Input, Row, Col } from 'antd';
import './common-chart.css';

const Title = '每日增量'
//1 2 3  4  5   
// 4 7 10 13 16 19 
// 每日解锁量 初次解锁量  解锁间隔 解锁次数
const getSeries = (a, b, c, d, e) => {
  const series = []
  let day = 0
  const start = +new Date(2022, 7, 1)
  let prev = 0
  const actualTimes = Math.floor(d / e)
  const leftRatio = 1 - actualTimes * e / d
  const baseCount = c * a * (100 - b) * 0.01
  while(true) {
    let g = 0
    if (day >= c && day % c === 0) {
      const f = Math.floor(day / c)
      if (f <= actualTimes) {
        g = f * baseCount / d * e
      } else {
        const everyUnlockNumber = e <= d ? baseCount / d * e : baseCount
        g = baseCount * leftRatio + actualTimes * everyUnlockNumber
      }
    }
    const amount = a * (b * 0.01) + g
    series.push([start + day * 24 * 3600 * 1000, Math.round(amount)])
    if (prev > 35000000) break
    prev+=amount
    day++
  }
  return series
}

const EveryIncrease = () => {
  const chartRef = useRef()
  const [form] = Form.useForm()
  const [series, setSeries] = useState(getSeries(50000, 5, 3, 60, 1))

  const onFormChange = () => {
    console.log(form.getFieldsValue())
    const { amount, ratio, interval, times, accelerateRate } = form.getFieldsValue()
    if (+amount && +ratio && +interval && +times && +accelerateRate) {
      setSeries(getSeries(+amount, +ratio, +interval, +times, +accelerateRate))
    }
  }
  

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current)
    const option = {
      color: ['#00DDFF'],
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
      grid: {
        show: false,
        left: '3%',
        right: '4%',
        bottom: 60,
        containLabel: true
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 0,
          end: 5
        }
      ],
      xAxis: [
        {
          type: 'time',
          boundaryGap: false,
          splitLine:{
            show:false
      　　 }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine:{
            show:false
      　　 }
        }
      ],
      series: [
        {
          name: '增量',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: series
        }
      ]
    }
    chartInstance.setOption(option)
  }, [series])
  return <div className="chart-wrap">
    <div className="chart-header">
      <Form
        form={form}
        layout="inline"
        initialValues={{ amount: '50000', ratio: '5', interval: '3', times: '60', accelerateRate: '1' }}
        onValuesChange={onFormChange}
      >
        <Form.Item name="amount" label="每日产出(a)" className="chart-header-label">
          <Row>
            <Col span={18}>
              <Input size="small" placeholder="daily lock number" defaultValue={50000} />
            </Col>
          </Row>
        </Form.Item>
        
        <Form.Item name="ratio" label="首次解锁(b)" className="chart-header-label">
          <Row>
            <Col span={8}>
              <Input size="small" placeholder="First unlock ratio" defaultValue={5} addonAfter="%" />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name="interval" label="解锁间隔(c)" className="chart-header-label">
          <Row>
            <Col span={8}>
              <Input size="small" placeholder="unlock interval" defaultValue={3} addonAfter="天" />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name="times" label="解锁次数(d)" className="chart-header-label">
          <Row>
            <Col span={8}>
              <Input size="small" placeholder="unlock times" defaultValue={60} addonAfter="次" />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name="accelerateRate" label="加速率(e)" className="chart-header-label">
          <Row>
            <Col span={8}>
              <Input size="small" placeholder="acceleration rate" defaultValue={1} />
            </Col>
          </Row>
        </Form.Item>

      </Form>
    </div>
    <div ref={chartRef} className="chart-container" />
  </div>
}

export { EveryIncrease }