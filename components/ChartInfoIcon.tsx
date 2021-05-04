import {
  ClickAwayListener,
  IconButton,
  makeStyles,
  Tooltip,
  TooltipProps,
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { useState } from 'react';

interface IStyleProps {
  maxWidth: string | number;
}

const useStyles = makeStyles({
  info: {
    position: 'absolute',
    top: '3px',
    left: '3px',
    zIndex: 2,
  },
  infoBoxMaxWidth: {
    maxWidth: (props: IStyleProps) => props.maxWidth,
  },
  infoButton: {
    padding: 0,
  },
  infoIcon: {
    fontSize: '1.25rem',
  },
});

interface IChartInfoIconProps {
  title: TooltipProps['title'];
  maxWidth?: string | number;
}

const ChartInfoIcon = ({ title, maxWidth = 300 }: IChartInfoIconProps): JSX.Element => {
  const styleProps = {
    maxWidth,
  };
  const classes = useStyles(styleProps);

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        className={classes.info}
        classes={{ tooltip: classes.infoBoxMaxWidth }}
        title={title}
        placement="bottom-start"
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <IconButton
          className={classes.infoButton}
          onClick={handleTooltipOpen}
          aria-label="graph info toggle button"
        >
          <InfoOutlined className={classes.infoIcon} />
        </IconButton>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default ChartInfoIcon;
