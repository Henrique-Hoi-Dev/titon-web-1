import { Grid } from "@mui/material";
import React from "react";
import { useMediaQuery } from "react-responsive";

const ContentMain = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 1100 });

  return (
    <Grid mt={1} justifyContent="center" alignItems="center">
      {children}
    </Grid>
  );
};

export default ContentMain;
