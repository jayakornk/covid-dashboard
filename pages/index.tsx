import { Box, Container, Paper, Typography, useTheme } from '@material-ui/core';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { getTimeline, getToday } from '@/adapters/covid19';
import Footer from '@/components/Footer';
import CoronavirusIcon from '@/components/icons/CoronavirusIcon';
import TodayDashboard from '@/components/TodayDashboard';
import { Timeline, Today } from '@/models/covid19.interface';

const TimelineChart = dynamic(() => import('@/components/TimelineChart'), {
  ssr: false,
});

interface Props {
  today?: Today;
  timeline?: Timeline;
}

const Home: NextPage<Props> = (props): JSX.Element => {
  const { today, timeline } = props;
  const theme = useTheme();

  return (
    <>
      <Box my={6} clone>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            <Box fontWeight="fontWeightMedium" component="span" display="flex" alignItems="center">
              <span>Covid Dashboard</span>{' '}
              <Box ml={2} clone>
                <CoronavirusIcon fontSize="inherit" />
              </Box>
            </Box>
          </Typography>
          {today?.UpdateDate && timeline?.UpdateDate ? (
            <>
              <TodayDashboard today={today} timeline={timeline} />
              <TimelineChart today={today} timeline={timeline} />
            </>
          ) : (
            <>
              <Paper
                sx={{
                  padding: '3rem',
                  textAlign: 'center',
                }}
              >
                <Image src="/images/maintenance.svg" width={430} height={380} />
                <Typography variant="h5" component="h2" sx={{ marginTop: '2rem' }}>
                  Sorry, the API services are down for maintenance!
                </Typography>
                <Typography variant="h6" component="h2">
                  We&apos;ll be back shortly.
                </Typography>
              </Paper>
            </>
          )}
        </Container>
      </Box>
      <Box py={2} textAlign="center">
        <Footer />
      </Box>
    </>
  );
};

Home.getInitialProps = async () => {
  const today = await getToday();
  const timeline = await getTimeline();

  return {
    today,
    timeline,
  };
};

export default Home;
