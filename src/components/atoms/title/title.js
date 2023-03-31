import { Grid, Typography } from "@mui/material";
import React from "react";

const Title = ({ children, sx, sxGridText }) => {
  return (
    <>
      {children && (
        <Grid item container direction="row" sx={{ ...sxGridText }}>
          <Typography fontSize="32px" sx={{ ...sx, fontWeight: "500" }}>
            {children}
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default Title;
