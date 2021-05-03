import { Box, Container, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { getTimeline, getToday } from '@/adapters/covid19';
import Footer from '@/components/Footer';
import CoronavirusIcon from '@/components/icons/CoronavirusIcon';
import TodayDashboard from '@/components/TodayDashboard';
import { Timeline, Today } from '@/models/covid19.interface';

const TimelineChart = dynamic(() => import('@/components/TimelineChart'), {
  ssr: false,
});

interface Props {
  today: Today;
  timeline: Timeline;
}

const Home: NextPage<Props> = (props): JSX.Element => {
  const { today, timeline } = props;
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
          <TodayDashboard today={today} />
          <TimelineChart today={today} timeline={timeline} />
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
