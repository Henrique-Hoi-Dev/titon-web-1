import React from 'react';
import { CircularProgress, Grid } from '@mui/material';

const BaseLoading = ({ sx, color, title }) => (
  <Grid
    item
    container
    alignItems="center"
    justifyContent="center"
    direction="column"
    sx={sx}
    pt={4}
  >
    <CircularProgress sx={{ color: `${color ? color : '#F1F3F9'}` }} />
    <p style={{ color: `${color ? color : '#F1F3F9'}` }}>
      {title ? title : 'Carregando...'}
    </p>
  </Grid>
);

export default BaseLoading;
