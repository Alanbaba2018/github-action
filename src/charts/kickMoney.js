import React, { useRef, useEffect, useState, useCallback } from 'react'
import * as echarts from "echarts"
import { Form, Input, Button } from 'antd';
import './common-chart.css';
import { useDebounce } from '../hooks'
import { jsonToExcel } from './util'

const Title = '收益分布'

const ExcelData = []

const InitialValue = { 
  m: { rate: 60, a: 70, b: 29, c: 1 },
  n: { rate: 20, a: 80, b: 19, c: 1 },
  p: { rate: 20, a: 90, b: 9, c: 1 },
  r: { rate: 2, a: 5, b: 100, c: 0 }
}

function getRandomUsrs(count, a, b, ratios) {
  let i = 0
  const res = []
  const level1 = Math.floor(a * count * 0.01)
  const level2 = Math.floor((a + b) * count * 0.01)
  while (i++ < count) {
    if (i < level1) {
      res.push(100 + Math.floor(Math.random() * 100 * (ratios[0] - 1)))
    } else if (i < level2) {
      res.push(100 * ratios[0] + Math.floor(Math.random() * 100 * (ratios[1] - ratios[0])))
    } else {
      res.push(100 * ratios[1] + Math.floor(Math.random() * 100 * (ratios[2] - ratios[1])))
    }
  }
  return res
}

const E = 2 ** 52

const getSeries = params => {
  ExcelData.length = 0
  const base = 100
  const counts = []
  const loop = 10000
  const series = []
  let step = 100
  while(step <= 2000) {
    counts.push(step)
    if (step >= 1000) {
      step += 1000
    } else {
      step+=200
    }
  }
  const ratios = Object.values(params.r)
  const getNumber = () => {
    const H = Math.random() * (E - 1)
    return Math.floor((100 * E - H) / (E - H))
  }
  // H = E - 1; 100 + 99 * H /(E - H)
  counts.forEach(count => {
    let i = 0
    let sum = 0
    
    // 玩loop局
    while(i++ < loop) {
      const spot = getNumber()
      let earn = 0
      // count多人玩
      // 1-30u
      const p1 = Math.floor(count * params.m.rate * 0.01)
      // 30-70u
      const p2 = Math.floor(count * params.n.rate * 0.01)
      // 70-100u
      const p3 = Math.floor(count * params.p.rate * 0.01)
      
      let realCounts = getRandomUsrs(p1, params.m.a, params.m.b, ratios)
      earn = realCounts.reduce((acc, cur) => {
        const money = Math.floor(1 + Math.random() * 29)
        if (cur > spot) {
          acc += money
        } else {
          acc +=  (base - cur) / base * money
        }
        return acc
      }, earn)
      realCounts = getRandomUsrs(p2, params.n.a, params.n.b, ratios)
      earn = realCounts.reduce((acc, cur) => {
        const money = Math.floor(30 + Math.random() * 40)
        if (cur > spot) {
          acc += money
        } else {
          acc +=  (base - cur) / base * money
        }
        return acc
      }, earn)
      realCounts = getRandomUsrs(p3, params.p.a, params.p.b, ratios)
      earn = realCounts.reduce((acc, cur) => {
        const money = Math.floor(70 + Math.random() * 30)
        if (cur > spot) {
          acc += money
        } else {
          acc +=  (base - cur) / base * money
        }
        return acc
      }, earn)
      ExcelData.push(
        { 
          '彩票金额': spot,
          '当次收益': earn,
          '下注人数': count,
          '1-30u占比': `${params.m.rate}%`,
          [`1-30u(1-${ratios[0]})占比`]: `${params.m.a}%`,
          [`1-30u(${ratios[0]}-${ratios[1]})占比`]: `${params.m.b}%`,
          [`1-30u(${ratios[1]}-${ratios[2]})占比`]: `${params.m.c}%`,
          '30-70u占比': params.n.rate + "%",
          [`30-70u(1-${ratios[0]})占比`]: params.n.a + "%",
          [`30-70u(${ratios[0]}-${ratios[1]})占比`]: params.n.b + "%",
          [`30-70u(${ratios[1]}-${ratios[2]})占比`]: params.n.c + "%",
          '70-100u占比': params.p.rate + "%",
          [`70-100u(1-${ratios[0]})占比`]: params.p.a + "%",
          [`70-100u(${ratios[0]}-${ratios[1]})占比`]: params.p.b + "%",
          [`70-100u(${ratios[1]}-${ratios[2]})占比`]: params.p.c + "%",
        })
      // console.log(`spot: ${spot}, earn: ${earn}, count: ${count}`)
      sum += earn
    }
    series.push([`${count}人`, sum])
  })
  
  return series
}


const ChooseHeader = ({ ratios, value = {}, onChange, isRatio = false }) => {
  const [rate, setRate] = useState(0)
  const [a, setA] = useState(40)
  const [b, setB] = useState(40)
  const [c, setC] = useState(20)

  const triggerChange = (changedValue) => {
    onChange?.({ [`rate`]: rate, [`a`]: a, [`b`]: b, [`c`]: c, ...value, ...changedValue });
  };

  const onRateChange = (e) => {
    const _rate = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(_rate)) {
      return;
    }
    if (!(`rate` in value)) {
      setRate(_rate);
    }
    triggerChange({ [`rate`]: _rate });
  }


  const onAChange = e => {
    const _n = parseInt(e.target.value || '0', 10);
    if (!(`a` in value)) {
      setA(_n);
    }
    triggerChange({ [`a`]: _n })
  }

  const onBChange = e => {
    const _n = parseInt(e.target.value || '0', 10)
    if (!(`b` in value)) {
      setB(_n);
    }
    triggerChange({ [`b`]: _n });
  }

  const onCChange = e => {
    const _n = parseInt(e.target.value || '0', 10)
    if (!(`c` in value)) {
      setC(_n);
    }
    triggerChange({ [`c`]: _n });
  }

  return (
    <span>
      <Input
        type="text"
        size="small"
        addonBefore={isRatio ? `1 - ` : "比例"}
        value={value[`rate`]}
        onChange={onRateChange}
        style={{ width: 100 }}
      />
      <Input
        type="text"
        size="small"
        addonBefore={!isRatio && `1-${ratios[0]}倍`}
        value={value[`a`]}
        onChange={onAChange}
        style={{ width: 100 }}
      />
      <Input
        type="text"
        size="small"
        addonBefore={!isRatio && `${ratios[0]}-${ratios[1]}倍`}
        value={value[`b`]}
        onChange={onBChange}
        style={{ width: 100 }}
      />
      {!isRatio && <Input
        type="text"
        size="small"
        addonBefore={!isRatio && `${ratios[1]}-${ratios[2]}倍`}
        value={value[`c`]}
        onChange={onCChange}
        style={{ width: 100 }}
      />}
    </span>
  );
}

const KickMoney = () => {
  const chartRef = useRef()
  const [form] = Form.useForm()
  const [series, setSeries] = useState()
  const [ratios, setRatios] = useState([])

  const formChange = useCallback(() => {
    const params = form.getFieldsValue()
    const series = getSeries(params)
    const pas = [...Object.values(params.m), ...Object.values(params.n), ...Object.values(params.p), ...Object.values(params.r)]
    if (pas.every(val => val !== "")) {
      setRatios(Object.values(params.r))
      setSeries(series)
    }
  }, [form])

  const download = () => {
    const defaultCellStyle = {
      font: { name: 'Verdana', sz: 13, color: 'FF00FF88' },
      fill: { fgColor: { rgb: 'FFFFAA00' } }
    }
    const opts = {
      cellStyles: true,
      defaultCellStyle: defaultCellStyle,
      showGridLines: false
    }
    jsonToExcel({
      json: ExcelData,
      sheetName: '彩票收益',
      fileName: '彩票收益.xlsx',
      opts,
      retType: 'file'
    })
  }

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
        initialValues={InitialValue}
        onValuesChange={onFormChange}
      >
        <Form.Item name="m" label={`1 - 30u`} className="chart-header-label">
          <ChooseHeader ratios={ratios} />
        </Form.Item>
        <Form.Item name="n" label={`30- 70u`} className="chart-header-label">
          <ChooseHeader ratios={ratios}  />
        </Form.Item>
        <Form.Item name="p" label={`70-100u`} className="chart-header-label">
          <ChooseHeader ratios={ratios}  />
        </Form.Item>
        <Form.Item name="r" label={`用户倍数`} className="chart-header-label">
          <ChooseHeader ratios={ratios} isRatio  />
        </Form.Item>
        <Form.Item className="chart-header-label">
          <Button size="small" type="primary" onClick={download}>下载</Button>
        </Form.Item>
      </Form>
    </div>
    <div ref={chartRef} className="chart-container" />
  </div>
}

export { KickMoney }