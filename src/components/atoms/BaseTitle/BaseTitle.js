import { Grid, Typography } from '@mui/material';
import React from 'react';

const BaseTitle = ({ children, sx, sxGridText, fontSize = '32px' }) => {
  return (
    <>
      {children && (
        <Grid item container direction="row" sx={{ ...sxGridText }}>
          <Typography fontSize={fontSize} sx={{ ...sx, fontWeight: '600', color: 'white' }}>
            {children}
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default BaseTitle;
