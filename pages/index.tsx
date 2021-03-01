import { Box, Container, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { getTimeline, getToday } from '@/adapters/covid19';
import CoronavirusIcon from '@/components/icons/CoronavirusIcon';
import TimelineChart from '@/components/TimelineChart';
import TodayDashboard from '@/components/TodayDashboard';
import { Timeline, Today } from '@/models/covid19.interface';

interface Props {
  today: Today;
  timeline: Timeline;
}

const TimelineChartWithNoSSR = dynamic(() => import('@/components/TimelineChart'), { ssr: false });

const Home: NextPage<Props> = (props): JSX.Element => {
  const { today, timeline } = props;
  return (
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
        {/* <TimelineChartWithNoSSR today={today} timeline={timeline} /> */}
        <TimelineChart today={today} timeline={timeline} />
      </Container>
    </Box>
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
