import { TimelineData } from './covid19.interface';
import { WithChildren } from './withChildren.interface';

export type StatusBoxProps = WithChildren<{
  bgcolor: string;
  amount: number;
  subamount?: number;
  label: string;
  last7days: TimelineData[];
  selector: string;
}>;
