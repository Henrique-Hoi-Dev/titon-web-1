import React from "react";
import InputMask from "react-input-mask";
import { TextField, Grid } from "@mui/material";

const InputMaskComponent = ({
  holder,
  mask,
  value,
  onChange,
  type,
  size,
  label,
  required,
  dark,
  ...inputProps
}) => {
  // const Label = {};
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#fff!importante",
      }}
    >
      {holder}
      <InputMask
        mask={mask}
        value={value}
        sx={{
          fontWeight: "bold",
          background: "#fff!importante",
          "& label[data-shrink=false]+.MuiInputBase-formControl .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
            {
              border: `2px solid ${
                dark ? "#FFFFFF!important" : "#2B2B2C!important"
              }`,
              borderRadius: "6px",
            },
          "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
            color: "black!important",
          },
        }}
        onChange={onChange}
      >
        {(inputProps) => (
          <TextField
            {...inputProps}
            label={label}
            type={type}
            fullWidth
            size={size ? size : "small"}
            variant="outlined"
            sx={{
              fontWeight: "bold",
              background: "#fff!importante",
              maxWidth: "274px!important",
              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                {
                  color: "black!important",
                },
              "& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: `2px solid ${
                    dark ? "#FFFFFF!important" : "#2B2B2C!important"
                  }`,
                },
              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                border: `2px solid ${
                  dark ? "#FFFFFF!important" : "#2B2B2C!important"
                }`,
              },
              "& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
                height: "1.2em",
                borderRadius: "4px",
              },
            }}
          />
        )}
      </InputMask>
    </Grid>
  );
};

export default InputMaskComponent;
