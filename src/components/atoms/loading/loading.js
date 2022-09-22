import React from "react";
import { CircularProgress, Grid } from "@mui/material";

const Loading = ({ sx, color }) => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    direction="column"
    sx={sx}
    pt={4}
  >
    <CircularProgress sx={{ color: `${color ? color : "black"}` }} />
    <p style={{ color: `${color ? color : "black"}` }}>Carregando...</p>
  </Grid>
);

export default Loading;
