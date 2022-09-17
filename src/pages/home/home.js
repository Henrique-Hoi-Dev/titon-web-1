import React from 'react';
import { Grid } from '@mui/material';

const Home = () => {
  return (
    <Grid
      container
      justifyContent="flex-start"
      minHeight="88vh"
      padding={1}
      spacing={2}
    >
      <Grid
        item
        container
        spacing={2}
        mt={1}
        mb={1}
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ color: "#fff" }}
      >
        HOME
      </Grid>
    </Grid>   
  );
}

export default Home;