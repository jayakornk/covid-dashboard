import { Timeline, Today } from './covid19.interface';

export interface TimelineChartProps {
  timeline: Timeline;
  today: Today;
}
export interface IChartProps {
  options: ApexCharts.ApexOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: any[];
}
