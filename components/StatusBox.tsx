import { Box, Card, CardContent, Typography, useTheme } from '@material-ui/core';
import React from 'react';

import { StatusBoxProps } from '@/models/statusbox.interface';
import { formatNumber } from '@/utils/formatNumber';

const StatusBox = ({ bgcolor, amount, subamount, label }: StatusBoxProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Card>
      <Box
        sx={{
          bgcolor: bgcolor,
          color: theme.palette.getContrastText(bgcolor),
          textAlign: 'center',
        }}
      >
        <CardContent>
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
        </CardContent>
      </Box>
    </Card>
  );
};

export default StatusBox;
