import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const SButton = styled(Button)({
  fontSize: "14px",
  backgroundColor: "#6FDED5",
  color: "black",
  minHeight: "40px",
  "&:hover": {
    backgroundColor: "#6FDED5",
  },
});
