import { Grid, Typography } from "@mui/material";
import React from "react";

const Title = ({ children }) => {
  return (
    <>
      {children && (
        <Grid container direction="row">
          <Typography fontSize="40px" sx={{ fontWeight: "700" }}>{children}</Typography>
        </Grid>
      )}
    </>
  );
};

export default Title;
