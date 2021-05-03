import { Box, Card, CardContent, Typography, useTheme } from '@material-ui/core';
import dynamic from 'next/dynamic';
import React from 'react';

import { StatusBoxProps } from '@/models/statusbox.interface';
import { formatNumber } from '@/utils/formatNumber';

const StatusBoxChart = dynamic(() => import('./StatusBoxChart'), {
  ssr: false,
});

const StatusBox = ({
  bgcolor,
  amount,
  subamount,
  label,
  last7days,
  selector,
}: StatusBoxProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        bgcolor: '#fff',
      }}
    >
      <Box
        sx={{
          bgcolor: bgcolor,
          color: theme.palette.getContrastText(bgcolor),
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingBottom: '4rem',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <CardContent>
            <Box display="flex" flexDirection="column-reverse">
              <Typography variant="h5" component="h2">
                <Box
                  component="span"
                  sx={{
                    fontWeight: 'fontWeightMedium',
                  }}
                >
                  {label}
                </Box>
              </Typography>
              <Typography variant="h3">
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {formatNumber(amount)}
                  </Box>
                  {subamount ? (
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 'fontWeightMedium',
                        fontSize: 'h5.fontSize',
                        ml: 1,
                      }}
                    >
                      ({subamount > 0 ? '+' : ''}
                      {formatNumber(subamount)})
                    </Box>
                  ) : (
                    ''
                  )}
                </Box>
              </Typography>
            </Box>
          </CardContent>
        </Box>
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            color: theme.palette.text.primary,
          }}
        >
          <StatusBoxChart
            bgcolor={bgcolor}
            label={label}
            last7days={last7days}
            selector={selector}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default StatusBox;
