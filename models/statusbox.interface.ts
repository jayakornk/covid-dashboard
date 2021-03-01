import { WithChildren } from './withChildren.interface';

export type StatusBoxProps = WithChildren<{
  bgcolor: string;
  amount: number;
  subamount?: number;
  label: string;
}>;
