import React from "react";
import { TextField } from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const PickerDate = ({
  minWidth,
  size,
  label,
  readOnly,
  height,
  ...props
}) => {
  return (
    <MobileDatePicker
      {...props}
      label={label}
      inputFormat="yyyy-MM-dd"
      renderInput={props => (
        <TextField
          size={`${size === "medium" ? "medium" : "small"}`}
          {...props}
          sx={{
            width: `${minWidth ? minWidth : "100%"}`,
            "& .css-igs3ac": { border: "2px solid #2B2B2C!important", },
            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
              // border: "2px solid #2B2B2C!important",
              // bottom: "-5px"
            },
            "& .MuiSvgIcon-root": {
              color: "black !important",
              height: `${height}`,
            },
            "& .MuiIconButton-root": {
              color: "black !important",
              height: `${height}`,
            },
            "& .MuiOutlinedInput-root": {
              color: "black !important",
              height: `${height}`,
            },
          }}
        />
      )}
    />
  );
};

export default PickerDate;