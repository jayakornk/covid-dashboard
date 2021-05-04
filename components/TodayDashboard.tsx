import { Grid, Link, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';

import { TodayDashboardProps } from '@/models/todayDashboard.interface';
import { STATUS_COLOR } from '@/utils/statusColor';

import StatusBox from './StatusBox';

const TodayDashboard = ({ today, timeline }: TodayDashboardProps): JSX.Element => {
  const lastUpdate = DateTime.fromFormat(today.UpdateDate, 'dd/MM/yyyy HH:mm').toFormat('DDDD, t');
  const last7days = timeline.Data.slice(-14);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs>
          <StatusBox
            bgcolor={STATUS_COLOR.CONFIRMED}
            amount={today.Confirmed}
            label="Confirmed"
            last7days={last7days}
            selector="Confirmed"
          />
        </Grid>
        <Grid item xs>
          <StatusBox
            bgcolor={STATUS_COLOR.DEATHS}
            amount={today.Deaths}
            subamount={today.NewDeaths}
            label="Deaths"
            last7days={last7days}
            selector="NewDeaths"
          />
        </Grid>
        <Grid item xs>
          <StatusBox
            bgcolor={STATUS_COLOR.RECOVERED}
            amount={today.Recovered}
            label="Recovered"
            last7days={last7days}
            selector="Recovered"
          />
        </Grid>
        <Grid item xs>
          <StatusBox
            bgcolor={STATUS_COLOR.HOSPITALIZED}
            amount={today.Hospitalized}
            subamount={today.NewHospitalized}
            label="Hospitalized"
            last7days={last7days}
            selector="NewHospitalized"
          />
        </Grid>
        <Grid item xs={6}>
          <StatusBox
            bgcolor={STATUS_COLOR.NEW_CONFIRMED}
            amount={today.NewConfirmed}
            label="New Case"
            last7days={last7days}
            selector="NewConfirmed"
          />
        </Grid>
        <Grid item xs={6} sm>
          <StatusBox
            bgcolor={STATUS_COLOR.NEW_RECOVERED}
            amount={today.NewRecovered}
            label="Discharged"
            last7days={last7days}
            selector="NewRecovered"
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        mt={1}
        flexDirection={{
          sm: 'row-reverse',
        }}
      >
        <Grid item xs={12} sm order={2}>
          <Typography>
            Source:{' '}
            <Link
              color="secondary"
              href="https://covid19.th-stat.com/th/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://covid19.th-stat.com
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm order={1}>
          <Typography
            textAlign={{
              sm: 'right',
            }}
          >
            Last update: {lastUpdate}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default TodayDashboard;
