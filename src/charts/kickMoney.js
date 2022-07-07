import React, { useRef, useEffect, useState, useCallback } from 'react'
import * as echarts from "echarts"
import { Form, Input, Row, Col, Button } from 'antd';
import './common-chart.css';
import { useDebounce } from '../hooks'

const Title = '收益分布'

const getSeries = (money, step = 20, count = 30) => {
  const base = 100
  const E = 2 ** 52
  const times = 10000

  const getNumber = () => {
    const H = Math.random() * (E - 1)
    return Math.floor((100 * E - H) / (E - H))
  }
  const spot = getNumber()
  const res = [...new Array(count + 1)].fill(0)
  let index = 0
  for (let i = 0; i < times; i++) {
    const result = getNumber()
    index = Math.floor((result - base) / step)
    if (index <= count - 1) {
      res[index] += (spot - result) * money
    } else {
      res[count] += (spot - result) * money
    }
  }
  // 100-200 200-300 300-400 400-500 500-600 >=600
  return {
    series: res.map((n, index) => {
      if (index === res.length - 1) return [`X≥${base + index * step}`, n]
      return [`${base + index * step}≤X<${base + (index + 1) * step}`, n]
    }),
    spot,
  }
}

const KickMoney = () => {
  const chartRef = useRef()
  const [form] = Form.useForm()
  const [spot, setSpot] = useState('')
  const [series, setSeries] = useState(getSeries(100).series)

  const formChange = useCallback(() => {
    const { money } = form.getFieldsValue()
    if (+money) {
      const { spot: _spot, series: _series } = getSeries(+money)
      setSeries(_series)
      setSpot(_spot)
    }
  }, [form])

  const onFormChange = useDebounce(formChange, 500)

  useEffect(() => {
    formChange()
  }, [formChange])

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current)
    const option = {
      color: ['#37A2FF', '#FF0087', '#FFBF00'],
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
      xAxis: [
        {
          type: 'category',
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
          name: '比例',
          type: 'bar',
          smooth: true,
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
        initialValues={{ money: `100` }}
        onValuesChange={onFormChange}
      >
        <Form.Item name="money" label="投注金额" className="chart-header-label">
          <Row>
            <Col span={8}>
              <Input size="small" placeholder="money" defaultValue={100} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name="spot" label="彩票金额" className="chart-header-label">
          <Row>
            <Col span={8}>
              <Input disabled size="small" placeholder="money" value={spot} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="">
          <Button onClick={formChange}>刷新</Button>
        </Form.Item>
      </Form>
    </div>
    <div ref={chartRef} className="chart-container" />
  </div>
}

export { KickMoney }