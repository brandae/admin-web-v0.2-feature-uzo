import './styles.scss'
import { Card } from 'antd'
import { Skeleton } from 'antd'
import { Progress } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

import { abbreviateNumber } from 'helpers/aaabbreviateNumber'

const loading = false

export const GroupedStatisticsView = (props) => {
  const [total, setTotal] = useState(0)
  const [series, setSeries] = useState([])

  const options = {
    chart: {
      width: 150,
      type: 'donut'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 150
        },
        legend: {
          show: false
        }
      }
    }],
    legend: { show: false },
    dataLabels: { enabled: false },
  }

  const generateSeries = () => {
    const series = props.subStats.map( stat => stat.value )
    const total = series.reduce(((acc, curr) => acc + curr ), 0)

    setTotal(total)
    setSeries(series)

    return props.subStats.map( stat => stat.value )
  }

  const getPercent = (val) => ((val / total) * 100).toFixed(0)
  const getBarDisplay = (format, val) => {
    if(format === 'count') return abbreviateNumber((val ?? 0).toFixed(2))
    if(format === "percent") return getPercent(val)
  }

  useEffect(generateSeries, [props.subStats])

  return (
    <Card loading={loading} className='grouped-statistics'>
      <Skeleton loading={loading}>
        <div className='grouped-statistics__title'>
          <div className='grouped-statistics__title_text'>
            { props.title }
          </div>
          <div className='grouped-statistics__title_control' onClick={props.viewAll}>
            View All >
          </div>
        </div>
        <div className='grouped-statistics__subtitle'>{ props.subTitle }</div>
        <div className='grouped-statistics__stats'>
          <div className='grouped-statistics__chart'>
            <ReactApexChart 
              options={options}
              series={series}
              type="donut"
              width={150}
              height={150}
            />
          </div>
          <div className='grouped-statistics__bars'>
            {
              props.subStats.map( (stat, index) => (
                <div className='grouped-statistics__bar'>
                  <div className="bar_title">{ stat.label }</div>
                  <div className='bar_stat'>
                    <Progress percent={getPercent(stat.value)} showInfo={false}/>
                  </div>
                  <div className="bar_count">
                    { getBarDisplay(props.subStatFormat, stat.value) }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div></div>
      </Skeleton>
    </Card>
  )
}