import React from "react";
import InputMask from 'react-input-mask';
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
      <Grid sx={{ display: "flex", flexDirection: "column", background: "#fff!importante" }}>
        {holder}
        <InputMask 
          mask={mask}
          value={value}
          sx={{ 
            fontWeight: "bold", 
            background: "#fff!importante",
            "& .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root": {
              border: `2px solid ${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
            },
            "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
              color: "black!important"
            },
          }}
          onChange={onChange}
        >
        {(inputProps) =>
          <TextField 
            {...inputProps}
            label={label}
            fullWidth
            type={type}
            size={size ? size : "small"}
            variant="outlined"
            sx={{ fontWeight: "bold", background: "#fff!importante" }}
            // helperText={value === "" && "Algum texto"}
          />
        }
        
        </InputMask>
      </Grid>
  );
};

export default InputMaskComponent;