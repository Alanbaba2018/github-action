import React, { useRef, useEffect, useState, useCallback } from 'react'
import * as echarts from "echarts"
import { Form, Input, Row, Col } from 'antd';
import './common-chart.css';
import { useDebounce } from '../hooks'

const Title = '分布频率'

const getSeries = (step, count) => {
  const base = 100
  const E = 2 ** 52
  const times = 100000000

  const getNumber = () => {
    const H = Math.random() * (E - 1)
    return Math.floor((100 * E - H) / (E - H))
  }
  const res = [...new Array(count)].fill(0)
  let index = 0
  for (let i = 0; i < times; i++) {
    const result = getNumber()
    index = Math.floor((result - base) / step)
    if (index <= count - 1) {
      res[index]++
    }
  }
  // 100-200 200-300 300-400 400-500 500-600 >=600
  return res.map((n, index) => {
    const rate = (n / times * 100).toFixed(2)
    return [`${base + index * step} ≤ X < ${base + (index + 1) * step}`, rate]
  })
}

const Step = 10
const Count = 50

const Kick = () => {
  const chartRef = useRef()
  const [form] = Form.useForm()
  const [series, setSeries] = useState(getSeries(Step, Count))

  const formChange = useCallback(() => {
    const { step, count } = form.getFieldsValue()
    if (+step && +count) {
      console.log('set')
      setSeries(getSeries(+step, +count))
    }
  }, [form])

  const onFormChange = useDebounce(formChange, 500)

  

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
          type: 'line',
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
        initialValues={{ step: `${Step}`, count: `${Count}` }}
        onValuesChange={onFormChange}
      >
        <Form.Item name="step" label="步长" className="chart-header-label">
          <Row>
            <Col span={8}>
              <Input size="small" placeholder="step" defaultValue={Step} />
            </Col>
          </Row>
        </Form.Item>
        
        <Form.Item name="count" label="条数" className="chart-header-label">
          <Row>
            <Col span={8}>
              <Input size="small" placeholder="count" defaultValue={Count} />
            </Col>
          </Row>
        </Form.Item>

      </Form>
    </div>
    <div ref={chartRef} className="chart-container" />
  </div>
}

export { Kick }