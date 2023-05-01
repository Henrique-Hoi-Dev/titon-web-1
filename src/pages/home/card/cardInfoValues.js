import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Text from "../../../components/atoms/text/text";

import { moneyMask } from "utils/masks";
import { CardMedia, Grid } from "@mui/material";
import { IconMenuTruck } from "components/atoms/icons/icons";
import { formatDate } from "utils/formatDate";
import { status } from "utils/status";

const CardInfoValues = ({ props, styles, onClick }) => {
  const getStatus = (res) => {
    const firstStatus =
      res.find((item) => item.status === "STARTING_TRIP") ?? "";
    const firstStatusProps =
      status.find((item) => item.value === firstStatus?.status) ?? "";

    const secondStatus =
      res.find((item) => item.status === "APPROVAL_PROCESS") ?? "";
    const secondStatusProps =
      status.find((item) => item.value === secondStatus?.status) ?? "";

    const thirdStatus = res.find((item) => item.status === "APPROVED") ?? "";
    const thirdStatusProps =
      status.find((item) => item.value === thirdStatus?.status) ?? "";

    const fourthStatus = res.find((item) => item.status === "DENIED") ?? "";
    const fourthStatusProps =
      status.find((item) => item.value === fourthStatus?.status) ?? "";

    const fifthStatus = res.find((item) => item.status === "DENIED") ?? "";
    const fifthStatusProps =
      status.find((item) => item.value === fifthStatus?.status) ?? "";

    const nonEmptyStatus = status.find((item) => item.value === "") ?? "";

    if (firstStatus) {
      return firstStatusProps;
    } else if (secondStatus) {
      return secondStatusProps;
    } else if (thirdStatus) {
      return thirdStatusProps;
    } else if (fourthStatus) {
      return fourthStatusProps;
    } else if (fifthStatus) {
      return fifthStatusProps;
    } else if (nonEmptyStatus) {
      return nonEmptyStatus;
    } else {
      return "";
    }
  };

  return (
    <Grid
      item
      sx={{
        minWidth: "264px!important",
        minHeight: "360px!important",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Card
        sx={{
          minWidth: "264px!important",
          minHeight: "360px!important",
          background: "#1C1C1C",
          border: "1px solid #F1F3F9",
          borderRadius: "8px",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
            padding: "0px",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              fontSize: "1.2rem",
              ...styles,
            }}
          >
            <CardMedia
              component="img"
              height="150px"
              sx={{ borderRadius: "8px", width: "248px" }}
              image={props.truck_avatar}
              alt="green iguana"
            />
          </Typography>

          <Grid
            item
            container
            pl={2}
            mt={1}
            spacing={1}
            height="100%"
            flexDirection={"column"}
            sx={{
              color: "#CCD6EB",
              lineHeight: "25px",
            }}
          >
            <Grid
              container
              item
              pb={2}
              paddingLeft={"0!important"}
              pr={"8px!important"}
              justifyContent={"space-between"}
            >
              <Text fontSize={"24px"} color="#F1F3F9">
                {props?.truck_board.toUpperCase()}
              </Text>
              <Text fontSize={"19px"} color={getStatus(props?.freigth).color}>
                {getStatus(props?.freigth).label}
              </Text>
            </Grid>
            <Text fontSize={"16px"}>
              Motorista: <Text fontSize={"16px"}>{props?.driver_name}</Text>
            </Text>
            <Text fontSize={"16px"}>
              Data de Inicio:{" "}
              <Text fontSize={"16px"}>{formatDate(props?.start_date)}</Text>
            </Text>
            <Text fontSize={"16px"}>
              Destino:{" "}
              <Text fontSize={"16px"}>
                {props?.freigth[0]?.final_freight_city.toUpperCase()}
              </Text>
            </Text>
            <Text fontSize={"16px"}>
              Crédito:{" "}
              <Text fontSize={"16px"}>
                {moneyMask(props?.driver.credit || [0])}
              </Text>
            </Text>
            <Text>
              <IconMenuTruck sx={{ fontSize: "30px", color: "#509BFB" }} />{" "}
              <Text fontSize={"18px"} sx={{ verticalAlign: "super" }}>
                {props.cart_models.toUpperCase()}
              </Text>
            </Text>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardInfoValues;
