import { Grid, Modal as MuiModal } from "@mui/material";
import Button from "components/atoms/button/button";
import { IconClose } from "components/atoms/icons/icons";
import Text from "components/atoms/text/text";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

const Modal = ({
  title,
  open,
  onClose,
  showReturn,
  children,
  component,
  onSubmit,
  showCloseIcon,
  height,
  maxWidth,
  maxHeight,
}) => {
  const { t } = useTranslation();

  const isDesktop = useMediaQuery({ maxWidth: "1400px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "910px" });
  const isTable = useMediaQuery({ maxWidth: "610px" });
  const isMobile = useMediaQuery({ maxWidth: "430px" });

  return (
    <MuiModal open={open} onClose={onClose} onBackdropClick={onClose}>
      <Grid
        container
        sx={{
          m: "0 10px 0 10px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          height: `${height ? height : "auto"}`,
          maxWidth: `${
            (isMobile ? "370px" : maxWidth ?? "1100px") ||
            (isTable ? "470px" : maxWidth ?? "1100px") ||
            (isSmallDesktop ? "700px" : maxWidth ?? "1100px") ||
            (isDesktop ? "1000px" : maxWidth ?? "1100px")
          }`,
          maxHeight: `${isDesktop ? "530px" : maxHeight ?? "600px"}`,
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
          {showCloseIcon && (
            <Grid
              item
              p={1}
              sx={{
                display: `${isMobile ? "none" : ""}`,
                position: "absolute",
                top: `${isMobile ? "3px" : "10px"}`,
                right: `${isMobile ? 0 : "20px"}`,
              }}
            >
              <Button
                sx={{
                  height: "40px",
                  width: "20px",
                  backgroundColor: "transparent",
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={onClose}
              >
                <IconClose sx={{ color: "black", fontSize: "30px" }} />
              </Button>
            </Grid>
          )}
          <Grid item container>
            <Text>{title}</Text>
          </Grid>
          <Grid item container spacing={2} justifyContent="center">
            {children}
          </Grid>
        </Grid>
        {showReturn && (
          <Grid item p={1}>
            {showReturn && (
              <Button onClick={onClose}>{t("button.return")}</Button>
            )}
          </Grid>
        )}
      </Grid>
    </MuiModal>
  );
};

export default Modal;
