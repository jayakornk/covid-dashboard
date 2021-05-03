import { Box, Card, CardContent, Grid, useTheme } from '@material-ui/core';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';

import { IChartProps, TimelineChartProps } from '@/models/timelineChart.interface';
import { formatNumber } from '@/utils/formatNumber';
import { STATUS_COLOR } from '@/utils/statusColor';

const TimelineChart = (props: TimelineChartProps): JSX.Element => {
  const { today, timeline } = props;
  const theme = useTheme();
  const { height } = useWindowDimensions();

  const dataTimeFormat = 'MM/dd/yyyy';
  const startDate = DateTime.fromFormat(timeline.Data[0].Date, dataTimeFormat).toFormat('DDD');
  const endDate = DateTime.fromFormat(
    timeline.Data[timeline.Data.length - 1].Date,
    dataTimeFormat
  ).toFormat('DDD');
  const todayDate = DateTime.fromFormat(today.UpdateDate, 'dd/MM/yyyy HH:mm').toFormat('DDDD, t');

  const last14Days = timeline.Data.slice(-14);

  const setChartHeight = (percent: number) => {
    const calHeight = height * percent;
    return calHeight <= 300 ? 300 : calHeight;
  };

  const fixDate = (date: string) => {
    return DateTime.fromFormat(date, dataTimeFormat).plus({ day: 1 }).toMillis();
  };

  const avgGrowthRate = (arr: number[]) => {
    const sum = arr.reduce((acc, cur) => acc + cur);
    const avg = sum / arr.length;
    const absChange = arr[arr.length - 1] - arr[0];
    const res = (absChange / avg) * 100;

    return res.toFixed(2);
  };

  const timelineChart = useMemo<IChartProps>(
    () => ({
      options: {
        chart: {
          id: 'timeline-summary',
          type: 'area',
          zoom: {
            type: 'x',
            autoScaleYaxis: true,
          },
          fontFamily: theme.typography.fontFamily,
          toolbar: {
            autoSelected: 'zoom',
            export: {
              csv: {
                filename: `Timeline Summary (${startDate} - ${endDate})`,
                dateFormatter: (timestamp) => {
                  if (timestamp) {
                    return DateTime.fromMillis(timestamp)
                      .minus({ day: 1 })
                      .toFormat('ccc LLL dd yyyy');
                  }
                  return undefined;
                },
              },
              svg: {
                filename: `Timeline Summary (${startDate} - ${endDate})`,
              },
              png: {
                filename: `Timeline Summary (${startDate} - ${endDate})`,
              },
            },
          },
        },
        annotations: {
          xaxis: [
            {
              x: fixDate(timeline.Data[timeline.Data.length - 14].Date),
              x2: fixDate(timeline.Data[timeline.Data.length - 1].Date),
              fillColor: STATUS_COLOR.CONFIRMED,
              label: {
                text: `Growth Rate: ${avgGrowthRate(last14Days.map((x) => x.Confirmed))} %`,
                style: {
                  background: STATUS_COLOR.CONFIRMED,
                  color: theme.palette.getContrastText(STATUS_COLOR.CONFIRMED),
                  fontSize: '14px',
                },
              },
            },
          ],
        },
        title: {
          text: 'Timeline Summary',
          align: 'center',
          margin: 15,
          style: {
            fontSize: '14px',
          },
        },
        subtitle: {
          text: `(${startDate} - ${endDate})`,
          align: 'center',
          margin: 0,
          style: {
            fontSize: '14px',
          },
        },
        fill: {
          type: 'gradient',
          colors: [
            STATUS_COLOR.CONFIRMED,
            STATUS_COLOR.RECOVERED,
            STATUS_COLOR.HOSPITALIZED,
            STATUS_COLOR.DEATHS_CHART,
          ],
          gradient: {
            shade: theme.palette.mode,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 3,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetY: -16,
          fontSize: '14px',
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              fontSize: '14px',
            },
          },
          tooltip: {
            style: {
              fontSize: '14px',
            },
          },
        },
        yaxis: {
          forceNiceScale: true,
          labels: {
            formatter: (val) => {
              return formatNumber(val);
            },
            style: {
              fontSize: '14px',
            },
          },
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy',
          },
          style: {
            fontSize: '14px',
          },
        },
        theme: {
          mode: theme.palette.mode,
        },
        colors: [
          STATUS_COLOR.CONFIRMED,
          STATUS_COLOR.RECOVERED,
          STATUS_COLOR.HOSPITALIZED,
          STATUS_COLOR.DEATHS_CHART,
        ],
        responsive: [
          {
            breakpoint: theme.breakpoints.values.md,
            options: {
              chart: {
                toolbar: {
                  tools: {
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                  },
                },
              },
              legend: {
                position: 'top',
                horizontalAlign: 'center',
                offsetY: -16,
                fontSize: '13px',
              },
              yaxis: {
                forceNiceScale: false,
                labels: {
                  formatter: (val: number) => {
                    return val >= 1000 ? `${+val / 1000}k` : val;
                  },
                  style: {
                    fontSize: '13px',
                  },
                },
              },
            },
          },
        ],
      },
      series: [
        {
          name: 'Confirmed',
          data: timeline.Data.map((d) => [fixDate(d.Date), d.Confirmed]),
        },
        {
          name: 'Recovered',
          data: timeline.Data.map((d) => [fixDate(d.Date), d.Recovered]),
        },
        {
          name: 'Hospitalized',
          data: timeline.Data.map((d) => [fixDate(d.Date), d.Hospitalized]),
        },
        {
          name: 'Deaths',
          data: timeline.Data.map((d) => [fixDate(d.Date), d.Deaths]),
        },
      ],
    }),
    [timeline]
  );

  const dailyNewStatus = useMemo<IChartProps>(
    () => ({
      options: {
        chart: {
          id: 'daily-new-status',
          type: 'line',
          zoom: {
            enabled: false,
          },
          fontFamily: theme.typography.fontFamily,
          toolbar: {
            tools: {
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            },
            export: {
              csv: {
                filename: `Daily New Status`,
                dateFormatter: (timestamp) => {
                  if (timestamp) {
                    return DateTime.fromMillis(timestamp)
                      .minus({ day: 1 })
                      .toFormat('ccc LLL dd yyyy');
                  }
                  return undefined;
                },
              },
              svg: {
                filename: `Daily New Status`,
              },
              png: {
                filename: `Daily New Status`,
              },
            },
          },
        },
        annotations: {
          points: [
            {
              x: fixDate(last14Days[2].Date),
              y: last14Days[2].NewConfirmed,
              seriesIndex: 0,
              marker: {
                size: 0,
              },
              label: {
                text: `Growth Rate: ${avgGrowthRate(last14Days.map((x) => x.NewConfirmed))} %`,
                borderRadius: +theme.shape.borderRadius,
                style: {
                  background: STATUS_COLOR.CONFIRMED,
                  color: theme.palette.getContrastText(STATUS_COLOR.CONFIRMED),
                  fontSize: '14px',
                },
              },
            },
            {
              x: fixDate(last14Days[5].Date),
              y: last14Days[5].NewHospitalized,
              seriesIndex: 1,
              marker: {
                size: 0,
              },
              label: {
                text: `Growth Rate: ${avgGrowthRate(last14Days.map((x) => x.NewHospitalized))} %`,
                borderRadius: +theme.shape.borderRadius,
                style: {
                  background: STATUS_COLOR.HOSPITALIZED,
                  color: theme.palette.getContrastText(STATUS_COLOR.HOSPITALIZED),
                  fontSize: '14px',
                },
              },
            },
            {
              x: fixDate(last14Days[8].Date),
              y: last14Days[8].NewRecovered,
              seriesIndex: 2,
              marker: {
                size: 0,
              },
              label: {
                text: `Growth Rate: ${avgGrowthRate(last14Days.map((x) => x.NewRecovered))} %`,
                borderRadius: +theme.shape.borderRadius,
                style: {
                  background: STATUS_COLOR.RECOVERED,
                  color: theme.palette.getContrastText(STATUS_COLOR.RECOVERED),
                  fontSize: '14px',
                },
              },
            },
            {
              x: fixDate(last14Days[11].Date),
              y: last14Days[11].NewDeaths,
              seriesIndex: 3,
              marker: {
                size: 0,
              },
              label: {
                text: `Growth Rate: ${avgGrowthRate(last14Days.map((x) => x.NewDeaths))} %`,
                borderRadius: +theme.shape.borderRadius,
                style: {
                  background: STATUS_COLOR.DEATHS_CHART,
                  color: theme.palette.getContrastText(STATUS_COLOR.DEATHS_CHART),
                  fontSize: '14px',
                },
              },
            },
          ],
        },
        title: {
          text: 'Daily New Status (Last 14 Days)',
          align: 'center',
          margin: 15,
          style: {
            fontSize: '14px',
          },
        },
        subtitle: {
          text: `(${DateTime.fromFormat(
            timeline.Data[timeline.Data.length - 14].Date,
            dataTimeFormat
          ).toFormat('DDD')} - ${endDate})`,
          align: 'center',
          margin: 0,
          style: {
            fontSize: '14px',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
          width: 2,
        },
        markers: {
          size: 3,
          strokeWidth: 0,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetY: -16,
          fontSize: '14px',
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              fontSize: '14px',
            },
          },
          tooltip: {
            style: {
              fontSize: '14px',
            },
          },
        },
        yaxis: {
          forceNiceScale: true,
          labels: {
            formatter: (val) => {
              return formatNumber(val);
            },
            style: {
              fontSize: '14px',
            },
          },
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy',
          },
          style: {
            fontSize: '14px',
          },
        },
        theme: {
          mode: theme.palette.mode,
        },
        colors: [
          STATUS_COLOR.CONFIRMED,
          STATUS_COLOR.RECOVERED,
          STATUS_COLOR.HOSPITALIZED,
          STATUS_COLOR.DEATHS_CHART,
        ],
        responsive: [
          {
            breakpoint: theme.breakpoints.values.md,
            options: {
              chart: {
                toolbar: {
                  tools: {
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                  },
                },
              },
              annotations: {
                points: [
                  {
                    x: fixDate(last14Days[2].Date),
                    y: last14Days[2].NewConfirmed,
                    seriesIndex: 0,
                    marker: {
                      size: 0,
                    },
                    label: {
                      text: `GR: ${avgGrowthRate(last14Days.map((x) => x.NewConfirmed))} %`,
                      borderRadius: +theme.shape.borderRadius,
                      style: {
                        background: STATUS_COLOR.CONFIRMED,
                        color: theme.palette.getContrastText(STATUS_COLOR.CONFIRMED),
                        fontSize: '12px',
                      },
                    },
                  },
                  {
                    x: fixDate(last14Days[5].Date),
                    y: last14Days[5].NewHospitalized,
                    seriesIndex: 1,
                    marker: {
                      size: 0,
                    },
                    label: {
                      text: `GR: ${avgGrowthRate(last14Days.map((x) => x.NewHospitalized))} %`,
                      borderRadius: +theme.shape.borderRadius,
                      style: {
                        background: STATUS_COLOR.HOSPITALIZED,
                        color: theme.palette.getContrastText(STATUS_COLOR.HOSPITALIZED),
                        fontSize: '12px',
                      },
                    },
                  },
                  {
                    x: fixDate(last14Days[8].Date),
                    y: last14Days[8].NewRecovered,
                    seriesIndex: 2,
                    marker: {
                      size: 0,
                    },
                    label: {
                      text: `GR: ${avgGrowthRate(last14Days.map((x) => x.NewRecovered))} %`,
                      borderRadius: +theme.shape.borderRadius,
                      style: {
                        background: STATUS_COLOR.RECOVERED,
                        color: theme.palette.getContrastText(STATUS_COLOR.RECOVERED),
                        fontSize: '12px',
                      },
                    },
                  },
                  {
                    x: fixDate(last14Days[11].Date),
                    y: last14Days[11].NewDeaths,
                    seriesIndex: 3,
                    marker: {
                      size: 0,
                    },
                    label: {
                      text: `GR: ${avgGrowthRate(last14Days.map((x) => x.NewDeaths))} %`,
                      borderRadius: +theme.shape.borderRadius,
                      style: {
                        background: STATUS_COLOR.DEATHS_CHART,
                        color: theme.palette.getContrastText(STATUS_COLOR.DEATHS_CHART),
                        fontSize: '12px',
                      },
                    },
                  },
                ],
              },
              legend: {
                position: 'top',
                horizontalAlign: 'center',
                offsetY: -16,
                fontSize: '13px',
              },
              yaxis: {
                forceNiceScale: false,
                labels: {
                  formatter: (val: number) => {
                    return val >= 1000 ? `${+val / 1000}k` : val;
                  },
                  style: {
                    fontSize: '13px',
                  },
                },
              },
            },
          },
        ],
      },
      series: [
        {
          name: 'Confirmed',
          data: last14Days.map((d) => [fixDate(d.Date), d.NewConfirmed]),
        },
        {
          name: 'Recovered',
          data: last14Days.map((d) => [fixDate(d.Date), d.NewRecovered]),
        },
        {
          name: 'Hospitalized',
          data: last14Days.map((d) => [fixDate(d.Date), d.NewHospitalized]),
        },
        {
          name: 'Deaths',
          data: last14Days.map((d) => [fixDate(d.Date), d.NewDeaths]),
        },
      ],
    }),
    [timeline]
  );

  const totalCasesChart = useMemo<IChartProps>(
    () => ({
      options: {
        chart: {
          type: 'pie',
          fontFamily: theme.typography.fontFamily,
        },
        title: {
          text: 'Total Cases',
          align: 'center',
          margin: 15,
          style: {
            fontSize: '14px',
          },
        },
        subtitle: {
          text: `(${todayDate})`,
          align: 'center',
          margin: 0,
          style: {
            fontSize: '14px',
          },
        },
        labels: ['Hospitalized', 'Recovered', 'Deaths'],
        stroke: {
          show: false,
          width: 1,
        },
        legend: {
          offsetY: setChartHeight(0.4) / 2 - 32,
          fontSize: '14px',
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              return formatNumber(val);
            },
            style: {
              fontSize: '14px',
            },
          },
        },
        tooltip: {
          fillSeriesColor: false,
          style: {
            fontSize: '14px',
          },
        },
        theme: {
          mode: theme.palette.mode,
        },
        colors: [STATUS_COLOR.HOSPITALIZED, STATUS_COLOR.RECOVERED, STATUS_COLOR.DEATHS_CHART],
        responsive: [
          {
            breakpoint: theme.breakpoints.values.md,
            options: {
              legend: {
                position: 'bottom',
                offsetY: 0,
              },
            },
          },
        ],
      },
      series: [today.Hospitalized, today.Recovered, today.Deaths],
    }),
    [today]
  );

  const barStartDate = DateTime.fromFormat(last14Days[0].Date, dataTimeFormat).toFormat('DDD');
  const barEndDate = DateTime.fromFormat(
    last14Days[last14Days.length - 1].Date,
    dataTimeFormat
  ).toFormat('DDD');
  const confirmedRecoveredChart = useMemo<IChartProps>(
    () => ({
      options: {
        chart: {
          type: 'bar',
          fontFamily: theme.typography.fontFamily,
          stacked: true,
          toolbar: {
            tools: {
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            },
            export: {
              csv: {
                filename: `Confirmed - Recovered (${barStartDate} - ${barEndDate})`,
                dateFormatter: (timestamp) => {
                  if (timestamp) {
                    return DateTime.fromMillis(timestamp)
                      .minus({ day: 1 })
                      .toFormat('ccc LLL dd yyyy');
                  }
                  return undefined;
                },
              },
              svg: {
                filename: `Confirmed - Recovered (${barStartDate} - ${barEndDate})`,
              },
              png: {
                filename: `Confirmed - Recovered (${barStartDate} - ${barEndDate})`,
              },
            },
          },
        },
        title: {
          text: 'Confirmed - Recovered',
          align: 'center',
          margin: 15,
          style: {
            fontSize: '14px',
          },
        },
        subtitle: {
          text: `(${barStartDate} - ${barEndDate})`,
          align: 'center',
          margin: 0,
          style: {
            fontSize: '14px',
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          fontSize: '14px',
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              fontSize: '14px',
            },
          },
          tooltip: {
            style: {
              fontSize: '14px',
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              return formatNumber(val);
            },
            style: {
              fontSize: '14px',
            },
          },
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy',
          },
          style: {
            fontSize: '14px',
          },
        },
        theme: {
          mode: theme.palette.mode,
        },
        colors: [STATUS_COLOR.RECOVERED, STATUS_COLOR.CONFIRMED],
        responsive: [
          {
            breakpoint: theme.breakpoints.values.md,
            options: {
              yaxis: {
                forceNiceScale: false,
                labels: {
                  formatter: (val: number) => {
                    return val >= 1000 ? `${+val / 1000}k` : val;
                  },
                  style: {
                    fontSize: '13px',
                  },
                },
              },
            },
          },
        ],
      },
      series: [
        {
          name: 'Recovered',
          data: last14Days.map((d) => [fixDate(d.Date), d.Recovered]),
        },
        {
          name: 'Confirmed',
          data: last14Days.map((d) => [fixDate(d.Date), d.Confirmed]),
        },
      ],
    }),
    [timeline]
  );

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
              <Chart
                type="area"
                series={timelineChart.series}
                options={timelineChart.options}
                height={setChartHeight(0.6)}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Chart
                type="line"
                series={dailyNewStatus.series}
                options={dailyNewStatus.options}
                height={setChartHeight(0.6)}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
            }}
          >
            <CardContent
              sx={{
                height: '100%',
              }}
            >
              <Chart
                type="pie"
                series={totalCasesChart.series}
                options={totalCasesChart.options}
                height={setChartHeight(0.4)}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
            }}
          >
            <CardContent
              sx={{
                height: '100%',
              }}
            >
              <Chart
                type="bar"
                series={confirmedRecoveredChart.series}
                options={confirmedRecoveredChart.options}
                height={setChartHeight(0.4)}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimelineChart;
