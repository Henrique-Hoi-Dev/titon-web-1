import React from "react";
import { TextField } from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const PickerDate = ({
  minWidth,
  size,
  label,
  readOnly,
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
            "& .MuiSvgIcon-root": {
              color: "black !important",
            },
            "& .MuiIconButton-root": {
              color: "black !important",
            },
            "& .MuiOutlinedInput-root": {
              color: "black !important",
            },
          }}
        />
      )}
    />
  );
};

export default PickerDate;