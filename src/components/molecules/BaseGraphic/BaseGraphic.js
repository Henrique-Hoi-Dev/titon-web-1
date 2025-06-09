import React from 'react'
import ReactApexChart from 'react-apexcharts'
import './style.css'

class BaseGraphic extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: 'Renda',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 66, 66, 66],
        },
        {
          name: 'Gastos',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 114, 114, 32],
        },
        {
          name: 'Lucro líquido',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 41, 41, 41],
        },
      ],
      options: {
        colors: ['#1877F2', '#F03D3D', '#0BB07B'],
        chart: {
          type: 'bar',
          height: 350,
        },
        legend: {
          position: 'bottom',
          offsetY: 10,
          colors: ['#fff'], // cores das legendas

          labels: {
            colors: ['#fff'], // cores das legendas
            style: {
              fontSize: '14px',
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['transparent'],
        },
        xaxis: {
          labels: {
            style: {
              fontSize: '14px',
              colors: [
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#fff',
                '#fff',
              ], // cores das legendas
            },
          },
          categories: [
            'JAN',
            'FEV',
            'MAR',
            'ABR',
            'MAI',
            'JUN',
            'JUL',
            'AGO',
            'SET',
            'OUT',
            'NOV',
            'DEZ',
          ],
        },
        yaxis: {
          labels: {
            style: {
              colors: ['#fff'],
              fontSize: '14px',
            },
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return 'R$: ' + val + ',00'
            },
          },
        },
      },
    }
  }

  render() {
    return (
      <div id="chart" style={{ height: '430px' }}>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
          width={520}
        />
      </div>
    )
  }
}

export default BaseGraphic
