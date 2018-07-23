import moment from 'moment'

const generateDataForChart = ({ rates, average }) => ({
  labels: rates.map(val => {
    return moment(val.date, 'DD.MM.YYYY').format('D MMMM')
  }),
  datasets: [
    {
      label: 'rates',
      data: rates.map(val => val.rate),
      fill: false,
      borderColor: '#007aff',
      cubicInterpolationMode: 'default',
      pointBackgroundColor: '#e2e2e2',
      pointRadius: 3,
      pointBorderWidth: 3,
      datalabels: {
        backgroundColor: context => context.dataset.borderColor,
        color: 'white',
        borderRadius: 8,
        font: {
          weight: '300'
        },
        formatter: context => Number(context).toFixed(2),
        anchor: 'end',
        align: 'top',
        offset: '4'
      }
    },
    {
      label: 'avr',
      data: [average, average, average],
      fill: false,
      borderColor: '#f5f51b',
      lineTension: 0.1,
      datalabels: {
        display: false
      },
      pointRadius: 0,
      pointHoverBackgroundColor: 'transparent',
      pointHoverBorderColor: 'transparent'
    }
  ]
})

export default generateDataForChart
