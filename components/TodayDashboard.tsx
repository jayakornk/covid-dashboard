import { Grid, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';

import { Today } from '@/models/covid19.interface';
import { STATUS_COLOR } from '@/utils/statusColor';

import StatusBox from './StatusBox';

const TodayDashboard = ({ today }: { today: Today }): JSX.Element => {
  const lastUpdate = DateTime.fromFormat(today.UpdateDate, 'dd/MM/yyyy HH:mm').toFormat('DDDD, t');
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs>
          <StatusBox bgcolor={STATUS_COLOR.CONFIRMED} amount={today.Confirmed} label="Confirmed" />
        </Grid>
        <Grid item xs>
          <StatusBox
            bgcolor={STATUS_COLOR.DEATHS}
            amount={today.Deaths}
            subamount={today.NewDeaths}
            label="Deaths"
          />
        </Grid>
        <Grid item xs>
          <StatusBox bgcolor={STATUS_COLOR.RECOVERED} amount={today.Recovered} label="Recovered" />
        </Grid>
        <Grid item xs>
          <StatusBox
            bgcolor={STATUS_COLOR.HOSPITALIZED}
            amount={today.Hospitalized}
            subamount={today.NewHospitalized}
            label="Hospitalized"
          />
        </Grid>
        <Grid item xs sm={6}>
          <StatusBox
            bgcolor={STATUS_COLOR.NEW_CONFIRMED}
            amount={today.NewConfirmed}
            label="New Case"
          />
        </Grid>
        <Grid item xs sm={6}>
          <StatusBox
            bgcolor={STATUS_COLOR.NEW_RECOVERED}
            amount={today.NewRecovered}
            label="Discharged"
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
            <a href="https://covid19.th-stat.com/th/api" target="_blank" rel="noopener noreferrer">
              https://covid19.th-stat.com
            </a>
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
