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
              border: "2px solid #2B2B2C!important",
            },
            "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
              top: "-6px",
            },
            "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
              color: "black !important",
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