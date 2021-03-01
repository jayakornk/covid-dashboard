import { Box, Card, CardContent, Typography, useTheme } from '@material-ui/core';
import React from 'react';

import { StatusBoxProps } from '@/models/statusbox.interface';
import { formatNumber } from '@/utils/formatNumber';

const StatusBox = ({ bgcolor, amount, subamount, label }: StatusBoxProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Card>
      <Box bgcolor={bgcolor} color={theme.palette.getContrastText(bgcolor)} textAlign="center">
        <CardContent>
          <Typography variant="h3">
            <Box display="inline-flex" alignItems="center">
              <Box fontWeight="fontWeightMedium" component="span">
                {formatNumber(amount)}
              </Box>
              {subamount ? (
                <Box fontWeight="fontWeightMedium" fontSize="h5.fontSize" component="span" ml={1}>
                  ({subamount > 0 ? '+' : ''}
                  {formatNumber(subamount)})
                </Box>
              ) : (
                ''
              )}
            </Box>
          </Typography>
          <Typography variant="h5" component="h2">
            <Box fontWeight="fontWeightMedium" component="span">
              {label}
            </Box>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default StatusBox;
