import { Grid, Typography } from "@mui/material";
import React from "react";

const Title = ({ children, sx }) => {
  return (
    <>
      {children && (
        <Grid container direction="row">
          <Typography fontSize="32px" sx={{ ...sx, fontWeight: "500" }}>{children}</Typography>
        </Grid>
      )}
    </>
  );
};

export default Title;
