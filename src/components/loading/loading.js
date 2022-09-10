import React from "react";
import { CircularProgress, Grid } from "@mui/material";

const Loading = ({ sx }) => {

  return (
    <Grid
      container
      mt={1}
      alignItems="flex-start"
      justifyContent="center"
      direction="row-reverse"
      sx={sx}
    >
      <CircularProgress 
        color="success"
        sx={{ 
          width: "20px!important", 
          height: "20px!important",
          color: "black!important",
        }}
      />
      <p style={{ marginRight: "15px" }}>Carregando...</p>
    </Grid>
  )
}

export default Loading;
