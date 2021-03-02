import 'chartjs-adapter-luxon';

import { Box, Card, CardContent, Grid, useTheme } from '@material-ui/core';
import { ChartOptions } from 'chart.js';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { Bar, defaults, Doughnut, Line } from 'react-chartjs-2';

import { TimelineChartProps } from '@/models/timelineChart.interface';
import { formatNumber } from '@/utils/formatNumber';
import { hexToRgbA, STATUS_COLOR } from '@/utils/statusColor';

const TimelineChart = ({ today, timeline }: TimelineChartProps): JSX.Element => {
  const theme = useTheme();

  const dataTimeFormat = 'MM/dd/yyyy';
  const startDate = DateTime.fromFormat(timeline.Data[0].Date, dataTimeFormat).toFormat('DDD');
  const endDate = DateTime.fromFormat(
    timeline.Data[timeline.Data.length - 1].Date,
    dataTimeFormat
  ).toFormat('DDD');
  const todayDate = DateTime.fromFormat(today.UpdateDate, 'dd/MM/yyyy HH:mm').toFormat('DDDD, t');

  defaults.global.defaultFontFamily = theme.typography.fontFamily;
  defaults.global.defaultFontColor = theme.palette.text.primary;
  defaults.global.defaultFontSize = 14;

  const data = useMemo(
    () => ({
      labels: timeline.Data.map((d) => d.Date),
      datasets: [
        {
          label: 'Confirmed',
          fill: true,
          backgroundColor: hexToRgbA(STATUS_COLOR.CONFIRMED, 0.4),
          borderColor: STATUS_COLOR.CONFIRMED,
          pointBackgroundColor: hexToRgbA(STATUS_COLOR.CONFIRMED, 0.8),
          pointHoverBackgroundColor: STATUS_COLOR.CONFIRMED,
          pointHoverBorderColor: 'rgba(220,220,220, 1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 5,
          data: timeline.Data.map((d) => d.Confirmed),
        },
        {
          label: 'Recovered',
          fill: true,
          backgroundColor: hexToRgbA(STATUS_COLOR.RECOVERED, 0.4),
          borderColor: STATUS_COLOR.RECOVERED,
          pointBackgroundColor: hexToRgbA(STATUS_COLOR.RECOVERED, 0.8),
          pointHoverBackgroundColor: STATUS_COLOR.RECOVERED,
          pointHoverBorderColor: 'rgba(220,220,220, 1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 5,
          data: timeline.Data.map((d) => d.Recovered),
        },
        {
          label: 'Hospitalized',
          fill: true,
          backgroundColor: hexToRgbA(STATUS_COLOR.HOSPITALIZED, 0.4),
          borderColor: STATUS_COLOR.HOSPITALIZED,
          pointBackgroundColor: hexToRgbA(STATUS_COLOR.HOSPITALIZED, 0.8),
          pointHoverBackgroundColor: STATUS_COLOR.HOSPITALIZED,
          pointHoverBorderColor: 'rgba(220,220,220, 1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 5,
          data: timeline.Data.map((d) => d.Hospitalized),
        },
        {
          label: 'Deaths',
          fill: true,
          backgroundColor: hexToRgbA(STATUS_COLOR.DEATHS_CHART, 0.4),
          borderColor: STATUS_COLOR.DEATHS_CHART,
          pointBackgroundColor: hexToRgbA(STATUS_COLOR.DEATHS_CHART, 0.8),
          pointHoverBackgroundColor: STATUS_COLOR.DEATHS_CHART,
          pointHoverBorderColor: 'rgba(220,220,220, 1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 5,
          data: timeline.Data.map((d) => d.Deaths),
        },
      ],
    }),
    [timeline]
  );

  const options: ChartOptions = {
    title: {
      display: true,
      text: ['Timeline Summary', `(${startDate} - ${endDate})`],
    },
    tooltips: {
      intersect: false,
      mode: 'index',
      callbacks: {
        label: (tooltipItem, data) => {
          if (
            data.datasets &&
            tooltipItem.datasetIndex !== undefined &&
            tooltipItem.yLabel !== undefined
          ) {
            let label = `${data.datasets[tooltipItem.datasetIndex].label}:` || '';
            label = `${label} ${formatNumber(tooltipItem.yLabel)}`;
            return label;
          }

          return 'null';
        },
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback: (value) => formatNumber(value),
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          type: 'time',
          time: {
            parser: dataTimeFormat,
            unit: 'month',
            minUnit: 'day',
            tooltipFormat: 'DDD',
          },
          gridLines: {
            color: 'rgba(255, 255, 255, .2)',
            zeroLineColor: 'rgba(255, 255, 255, .2)',
          },
        },
      ],
    },
  };

  const dataDoughnut = useMemo(
    () => ({
      datasets: [
        {
          data: [today.Hospitalized, today.Recovered, today.Deaths],
          backgroundColor: [
            STATUS_COLOR.HOSPITALIZED,
            STATUS_COLOR.RECOVERED,
            STATUS_COLOR.DEATHS_CHART,
          ],
          borderWidth: 0,
          // borderAlign: 'inner',
        },
      ],
      labels: ['Hospitalized', 'Recovered', 'Deaths'],
    }),
    [today]
  );

  const doughnutOptions: ChartOptions = {
    title: {
      display: true,
      text: ['Total Cases', `(${todayDate})`],
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          if (
            data.datasets &&
            data.labels &&
            tooltipItem.datasetIndex !== undefined &&
            data.datasets[tooltipItem.datasetIndex] !== undefined &&
            data.datasets[tooltipItem.datasetIndex].data !== undefined &&
            tooltipItem.index !== undefined
          ) {
            const tooltipDatasetIndex = tooltipItem.datasetIndex;
            const datasetIndexed = data.datasets[tooltipDatasetIndex];
            const value = (datasetIndexed.data as number[])[tooltipItem.index];
            const percentage = ((value / today.Confirmed) * 100).toFixed(2);
            let label = `${data.labels[tooltipDatasetIndex]}:` || '';
            label = `${label} ${formatNumber(value)} (${percentage}%)`;
            return label;
          }
          return 'null';
        },
      },
    },
    legend: {
      position: 'left',
    },
    cutoutPercentage: 0,
  };

  const dataBar = useMemo(
    () => ({
      labels: timeline.Data.slice(-30).map((d) => d.Date),
      fill: false,
      datasets: [
        {
          label: 'Recovered',
          data: timeline.Data.slice(-30).map((d) => d.Recovered),
          backgroundColor: hexToRgbA(STATUS_COLOR.RECOVERED, 1),
          borderColor: STATUS_COLOR.RECOVERED,
          borderWidth: 1,
        },
        {
          label: 'Confirmed',
          data: timeline.Data.slice(-30).map((d) => d.Confirmed),
          backgroundColor: hexToRgbA(STATUS_COLOR.CONFIRMED, 1),
          borderColor: STATUS_COLOR.CONFIRMED,
          borderWidth: 1,
        },
      ],
    }),
    [timeline]
  );

  const barStartDate = DateTime.fromFormat(
    timeline.Data.slice(-30)[0].Date,
    dataTimeFormat
  ).toFormat('DDD');
  const barEndDate = DateTime.fromFormat(
    timeline.Data.slice(-30)[timeline.Data.slice(-30).length - 1].Date,
    dataTimeFormat
  ).toFormat('DDD');

  const barOptions: ChartOptions = {
    title: {
      display: true,
      text: ['Confirmed - Recovered', `(${barStartDate} - ${barEndDate})`],
    },
    tooltips: {
      intersect: false,
      mode: 'index',
      itemSort: () => -1,
      callbacks: {
        label: (tooltipItem, data) => {
          if (
            data.datasets &&
            tooltipItem.datasetIndex !== undefined &&
            tooltipItem.yLabel !== undefined
          ) {
            let label = `${data.datasets[tooltipItem.datasetIndex].label}:` || '';
            label = `${label} ${formatNumber(tooltipItem.yLabel)}`;
            return label;
          }
          return 'null';
        },
      },
    },
    legend: {
      reverse: true,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback: (value) => formatNumber(value),
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          type: 'time',
          time: {
            parser: dataTimeFormat,
            unit: 'day',
            tooltipFormat: 'DDD',
          },
          gridLines: {
            color: 'rgba(255, 255, 255, .2)',
            zeroLineColor: 'rgba(255, 255, 255, .2)',
          },
        },
      ],
    },
  };
  return (
    <Box
      sx={{
        mt: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Line data={data} options={options} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs sm={6}>
          <Card>
            <CardContent>
              <Doughnut data={dataDoughnut} options={doughnutOptions} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs sm={6}>
          <Card>
            <CardContent>
              <Bar data={dataBar} options={barOptions} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimelineChart;
