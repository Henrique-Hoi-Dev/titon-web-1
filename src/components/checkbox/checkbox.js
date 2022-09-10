import React from "react";
import { Checkbox, FormControlLabel, FormControl } from "@mui/material";

const CheckboxComponent = ({ label, checked, onChange, sx, defaultValue }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FormControl component="fieldset" variant="standard">
        <FormControlLabel
          sx={{
            ...sx,
            transform: "translateY(15px)", 
            m: "0px 0 11px",
            "& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root": { color: "#f8f8fc" }
          }}
          control={
            <Checkbox checked={checked} onChange={onChange} name={"checkbox"} defaultValue={defaultValue}/>
          }
          label={label}
        />
      </FormControl>
    </div>
  );
};

export default CheckboxComponent;
