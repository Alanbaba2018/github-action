import React, { useRef, useEffect, useState, useCallback } from 'react'
import * as echarts from "echarts"
import { Form, Input, Row, Col } from 'antd';
import './lockAmount.css';

const Title = '每日最大流通量'
// 5w * 5%,  5w * 5%, 5w * 5%, 
const getSeries = (a, b, c, d) => {
  const series = []
  let day = 1
  const start = +new Date(2022, 7, 1)
  let prev = 0
  while(true) {
    const amount = a * (b * 0.01) + a * Math.floor((day - 1) / c) / d
    series.push([start + (day - 1) * 24 * 3600 * 1000, Math.round(prev + amount)])
    if (prev > 35000000) break
    prev+=amount
    day++
  }
  return series
}

const LockAmount = () => {
  const chartRef = useRef()
  const [form] = Form.useForm()
  const [series, setSeries] = useState(getSeries(5000, 5, 3, 60))

  const onFormChange = () => {
    console.log(form.getFieldsValue())
    const { amount, ratio, interval, times } = form.getFieldsValue()
    if (amount && ratio && interval && times) {
      setSeries(getSeries(+amount, +ratio, +interval, +times))
    }
  }
  

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
      grid: {
        show: false,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
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
          name: '解锁量',
          type: 'line',
          smooth: true,
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
        initialValues={{ amount: '50000', ratio: '5', interval: '3', times: '60' }}
        onValuesChange={onFormChange}
      >
        <Form.Item name="amount" label="每日产出" className="chart-header-label">
          <Row>
            <Col span={18}>
              <Input size="small" placeholder="daily lock number" defaultValue={50000} />
            </Col>
          </Row>
        </Form.Item>
        
        <Form.Item name="ratio" label="首次解锁" className="chart-header-label">
          <Row>
            <Col span={12}>
              <Input size="small" placeholder="First unlock ratio" defaultValue={5} addonAfter="%" />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name="interval" label="解锁间隔" className="chart-header-label">
          <Row>
            <Col span={12}>
              <Input size="small" placeholder="unlock interval" defaultValue={3} addonAfter="天" />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name="times" label="解锁次数" className="chart-header-label">
          <Row>
            <Col span={12}>
              <Input size="small" placeholder="unlock times" defaultValue={60} addonAfter="天" />
            </Col>
          </Row>
        </Form.Item>

      </Form>
    </div>
    <div ref={chartRef} className="chart-container" />
  </div>
}

export { LockAmount }