import React from "react";
import { CircularProgress } from "@mui/material";
import { Button as ButtonComponent } from "@mui/material";

const Button = ({ children, loading, variant, sx, ...props }) => {
  return (
    <>
    {!loading && (
      <ButtonComponent
        disableElevation
        variant={variant ? variant : "default"}
        sx={{
          ...sx,
          position: "relative",
          fontSize: "14px",
          minHeight: "40px",
        }}
        fullWidth
        {...props}
      >
        {children}
      </ButtonComponent>
    )}

      {loading && (
        <ButtonComponent
          disableElevation
          variant={variant ? variant : "default"}
          sx={{
            background: "#fff",
            position: "relative",
            fontSize: "14px",
            minHeight: "40px",
          }}
          fullWidth
          {...props}
        >
            <CircularProgress
            size={24}
            sx={{
              background: "#fff",
              color: 'text.disabled',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        </ButtonComponent>
      )}
    </>
  );
};

export default Button;
