import { Grid, Paper } from "@mui/material";
import { templateContext } from "components/templates/main/main";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";

const Content = () => {
  const { openMenu } = useContext(templateContext);
  
  const isDesktop = useMediaQuery({ maxWidth: 1230 });

  return (
    <Grid
      sx={{overflowY: 'scroll'}}
      p={"10px"}
      ml={`${openMenu && !isDesktop  ? "268px" : "60px"}`}
      width={`${openMenu && !isDesktop  ? "calc(100% - 268px)" : "calc(100% - 60px)"}`}
      height={"calc(100vh - 66px)"}
      component={Paper}
    >
      <Outlet />
    </Grid>
  );
};

export default Content;
