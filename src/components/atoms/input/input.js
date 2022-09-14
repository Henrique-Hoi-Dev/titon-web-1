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
  type,
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
      <div style={{ display: "flex", flexDirection: "column"}}>
        {holder}
        <TextField
          {...props}
          fullWidth
          type={type}
          error={error}
          size={props.size ? props.size : "small"}
          // variant="outlined"
          placeholder={placeholder}
          sx={{ fontWeight: "bold", ...styles, background: "white", borderRadius: "4px" }}
          inputProps={{ minLength: `${minLength}`, maxLength: `${maxLength}`, min: min, ...props.inputProps }}
          InputProps={{
            min: min,
            minLength: `${minLength}`,
            maxLength: `${maxLength}`,
            endAdornment: isPassword && (
              <InputAdornment position="end">
                <IconButton onClick={onClick} edge="end" sx={{ color: "#333" }}>
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
