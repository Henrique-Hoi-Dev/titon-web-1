import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="h6" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function Progress({ progressPercent, setProgressPercent }) {
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgressPercent((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 0));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box 
      sx={{ 
        width: '100%',
        ".css-eglki6-MuiLinearProgress-root": { 
          backgroundColor: "blue",
          height: "10px",
          borderRadius: "8px"
        }
      }}
    >
      <LinearProgressWithLabel value={progressPercent} />
    </Box>
  );
}
