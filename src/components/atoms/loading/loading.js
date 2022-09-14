import React from "react";
import { CircularProgress, Grid } from "@mui/material";

const Loading = ({ sx, titulo }) => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    direction="column"
    sx={sx}
    pt={4}
  >
    <CircularProgress color="inherit" />
    <p>{titulo}...</p>
  </Grid>
);

export default Loading;
