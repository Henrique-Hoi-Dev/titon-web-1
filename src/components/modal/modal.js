import React from "react";
import { Grid, Modal as MuiModal } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const Modal = (
  {
    open,
    onClose,
    children,
    component,
    onSubmit,
    height,
    maxWidth,
    maxHeight
  }) => {
  const isDesktop = useMediaQuery({ maxWidth: "700px" });
  // const isSmallDesktop = useMediaQuery({ maxWidth: "910px" });

  return (
    <MuiModal open={open} onClose={onClose} onBackdropClick={onClose}>
      <Grid
        container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#4d4c4c",
          height: `${height ? height : "auto"}`,
          maxHeight: `${(isDesktop ? "500px" : maxHeight ?? "700px")}`,
          maxWidth: `${(isDesktop ? "400px" : maxWidth ?? "700px")}`,
          padding: "10px",
          borderRadius: "20px",
        }}
        direction="column"
        justifyContent="space-between"
        component={component}
        onSubmit={onSubmit}
      >
        <Grid
          item
          container
          justifyContent="center"
          direction="row"
          spacing={1}
          p={1}
          sx={{ overflowY: "auto" }}
        >
          <Grid item container>
            {/* <Text>{title}</Text> */}
          </Grid>
          <Grid item container spacing={2} justifyContent={"center"}>
            {children}
          </Grid>
        </Grid>  
      </Grid>
    </MuiModal>
  );
};

export default Modal;
