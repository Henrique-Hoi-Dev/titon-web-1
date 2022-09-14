import React from "react";
import Title from "components/atoms/title/title";
import RoutleTitle from "components/atoms/routeTitle/routeTitle";
import { Divider, Grid } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const ContentHeader = ({ title, route, children }) => {
  const isMobile = useMediaQuery({ maxWidth: 1100 });

  return (
    <>
      <Grid
        container
        mt="10px"
        paddingLeft={2}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          width: "100%",
        }}
      >
        {children}
      </Grid>
    </>
  );
};

export default ContentHeader;
