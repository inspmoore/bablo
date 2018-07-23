import React, { Component } from 'react'
import { Line, Chart } from 'react-chartjs-2'
import generateDataForChart from '../tools/generateDataForChart'
import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
import datalabels from 'chartjs-plugin-datalabels'
import { localized } from '../LocaleProvider'

/* @desc Shows the charts of rates and the average
    Props:
    rates [array] - rates to be shown
    average [number] - average to be shown in yellow
*/

class RatesChart extends Component {
  // options for the chart.js
  graphOpts = {
    legend: false,
    layout: {
      padding: {
        top: 30
      }
    },
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback: () => null
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
            color: 'rgb(177, 177, 177)',
            drawBorder: false
          },
          ticks: {
            fontColor: 'rgb(177, 177, 177)'
          }
        }
      ]
    }
  }

  componentDidMount() {
    // a plugin for the chart.js - labels for the value points
    Chart.plugins.register({
      beforeDraw: function(chartInstance) {
        var ctx = chartInstance.chart.ctx
        ctx.fillStyle = '#212427'
        ctx.fillRect(
          0,
          0,
          chartInstance.chart.width,
          chartInstance.chart.height
        )
      }
    })
  }

  render() {
    const { rates, average } = this.props
    return (
      <Line
        data={generateDataForChart({ rates, average })}
        options={this.graphOpts}
        height={250}
      />
    )
  }
}

RatesChart.propTypes = {
  rates: PropTypes.arrayOf(
    PropTypes.shape({
      rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      date: PropTypes.string
    })
  ).isRequired,
  average: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

export default localized(RatesChart)
