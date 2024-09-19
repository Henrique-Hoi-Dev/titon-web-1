import { Grid, Typography } from "@mui/material";
import React from "react";

const BaseTitle = ({ children, sx, sxGridText }) => {
  return (
    <>
      {children && (
        <Grid item container direction="row" sx={{ ...sxGridText }}>
          <Typography
            fontSize="32px"
            sx={{ ...sx, fontWeight: "600", color: "white" }}
          >
            {children}
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default BaseTitle;
