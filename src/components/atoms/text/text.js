import { Typography } from "@mui/material";
import React from "react";

const Text = ({ children, center, type, sx, fontSize }) => {
  return (
    <Typography
      variant="p"
      align={center && "center"}
      sx={{
        ...sx,
        fontSize: `${fontSize ? fontSize : '18px'}`,
      }}
    >
      {children}
    </Typography>
  );
};

export default Text;
