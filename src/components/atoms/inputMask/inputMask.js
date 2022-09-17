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
  required,
  ...inputProps
}) => {
  const Label = {};
  return (
      <Grid sx={{ display: "flex", flexDirection: "column", background: "#fff!importante" }}>
        {holder}

        <InputMask 
          mask={mask}
          value={value}
          sx={{ fontWeight: "bold", background: "#fff!importante" }}
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
            sx={{ fontWeight: "bold", background: "#fff!importante" }}
            helperText={value === "" && "Algum texto"}
          />
        }
        
        </InputMask>
      </Grid>
  );
};

export default InputMaskComponent;