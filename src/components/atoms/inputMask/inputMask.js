import React from "react";
import { TextField, Grid } from "@mui/material";
import InputMask from 'react-input-mask';

const InputMaskComponent = ({
  holder,
  mask,
  value,
  onChange,
  type,
  size,
  required,
  ...inputProps
}) => {
  const Label = {};
  return (
      <Grid sx={{ display: "flex", flexDirection: "column" }}>
        {holder}

        <InputMask 
          mask={mask}
          value={value} 
          onChange={onChange}
        >
        {(inputProps) =>
          <TextField 
          {...inputProps}
          required
          fullWidth
          type={type}
          size={size ? size : "small"}
          variant="outlined"
          sx={{ fontWeight: "bold" }}
          helperText={value == "" && "Algum texto"}
          />
        }
        
        </InputMask>
      </Grid>
  );
};

export default InputMaskComponent;