import React from "react";
import { CircularProgress, Grid } from "@mui/material";

const Loading = ({ sx }) => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    direction="column"
    sx={sx}
    pt={4}
  >
    <CircularProgress color="inherit" />
    <p>Carregando...</p>
  </Grid>
);

export default Loading;
