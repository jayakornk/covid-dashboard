import { useTheme } from '@material-ui/core';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';

import { TimelineData } from '@/models/covid19.interface';
import { IChartProps } from '@/models/timelineChart.interface';
import { formatNumber } from '@/utils/formatNumber';

import { fixDate } from './TimelineChart';

interface IStatusBoxChartProps {
  bgcolor: string;
  label: string;
  last7days: TimelineData[];
  selector: string;
}

const StatusBoxChart = ({
  bgcolor,
  label,
  last7days,
  selector,
}: IStatusBoxChartProps): JSX.Element => {
  const theme = useTheme();

  const statusChart = useMemo<IChartProps>(
    () => ({
      options: {
        chart: {
          type: 'area',
          height: 100,
          sparkline: {
            enabled: true,
          },
          background: 'transparent',
          fontFamily: theme.typography.fontFamily,
        },
        stroke: {
          curve: 'straight',
          width: 2,
          colors: [theme.palette.getContrastText(bgcolor)],
        },
        fill: {
          opacity: 0.3,
        },
        xaxis: {
          type: 'datetime',
          crosshairs: {
            width: 1,
          },
        },
        yaxis: {
          labels: {
            show: false,
            formatter: (val) => {
              return formatNumber(val);
            },
          },
        },
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topRight',
            offsetY: -30,
          },
          x: {
            format: 'dd MMM yyyy',
          },
        },
        theme: {
          mode: theme.palette.mode,
        },
        colors: [bgcolor],
        // yaxis: {
        //   min: 0,
        // },
      },
      series: [
        {
          name: label,
          data: last7days.map((day) => [fixDate(day.Date), day[selector as keyof TimelineData]]),
        },
      ],
    }),
    [last7days]
  );

  return (
    <div>
      <Chart options={statusChart.options} series={statusChart.series} type="area" height={100} />
      <style jsx>
        {`
          :global(.apexcharts-tooltip-title),
          :global(.apexcharts-tooltip-y-group) {
            padding-top: 2px;
            padding-bottom: 2px;
          }
        `}
      </style>
    </div>
  );
};

export default StatusBoxChart;
