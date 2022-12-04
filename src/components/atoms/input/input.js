import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconSearchIcon } from "../icons/icons";

const Input = ({
  isInvalid,
  isInvalidMsg,
  holder,
  password,
  showPassword,
  onClick,
  isPassword,
  placeholder,
  type,
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
          sx={{ 
            fontWeight: "bold", 
            ...styles, 
            background: "#2B2B2C", 
            border: "1px solid #F1F3F9",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "8px",
            ".css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
              color: "#FFFFFF" 
            },
            ".css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
              color: "#FFFFFF" 
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
            endAdornment: (isPassword || searches) && (
              <InputAdornment position="end">
                {type === "password" &&
                  <IconButton onClick={onClick} edge="end" sx={{ color: "#FFFFFF" }}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}                  
                  </IconButton>                  
                }
                {(searchesType === "searches") && <IconSearchIcon sx={{ color: "#F1F3F9" }} /> }
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
