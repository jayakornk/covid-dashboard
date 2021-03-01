import { Box, Grid, Typography } from '@material-ui/core';
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
      <Box textAlign="right" mt={1}>
        <Typography>Last update: {lastUpdate}</Typography>
      </Box>
    </div>
  );
};

export default TodayDashboard;
