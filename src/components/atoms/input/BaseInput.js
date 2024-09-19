import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({
  isInvalid,
  isInvalidMsg,
  holder,
  password,
  showPassword,
  onClick,
  isPassword,
  placeholder,
  label,
  type,
  dark,
  searches,
  searchesType,
  minLength,
  maxLength,
  styles,
  error,
  min,
  ...props
}) => {
  const Label = {};
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {holder}
        <TextField
          {...props}
          fullWidth
          type={type}
          error={error}
          size={props.size ? props.size : "small"}
          placeholder={placeholder}
          label={label}
          sx={{ 
            fontWeight: "bold", 
            ...styles,
            color: `${dark ? "#FFFFFF" : "#2B2B2C"}`,
            background: `${dark ? "#2B2B2C" : "#FFFFFF"}`, 
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "8px",
            "& .css-igs3ac": { border: `2px solid ${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`},
            "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
              border: `2px solid ${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
            },
            "& .css-u9osun.Mui-focused": {
              color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
            },

            "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
              color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
            },
            "& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
              color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
            },
            "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
              color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}` 
            }
          }}
          inputProps={{ 
            minLength: `${minLength}`, 
            maxLength: `${maxLength}`, 
            min: min, ...props.inputProps,
          }}
          InputProps={{
            min: min,
            minLength: `${minLength}`,
            maxLength: `${maxLength}`,
            endAdornment: isPassword && (
              <InputAdornment position="end">
                <IconButton onClick={onClick} edge="end" sx={{ color: dark ? "#FFFFFF!important" : "#2B2B2C!important" }}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}                  
                </IconButton>                                  
              </InputAdornment>
            ),
          }}
        />
        {isInvalid && <Label error>{isInvalidMsg}</Label>}
      </div>
    </>
  );
};

export default Input;
