import React from "react";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { moneyMask } from "utils/masks";
import CardInfoValues from "components/atoms/card/card";

const Cards = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Grid item container pl={2} mt={1} sx={{ justifyContent: "center" }}>
        <Box
          sx={{
            width: "100%",
            display: 'flex',
            maxWidth: "1000px",
            justifyContent: "center",
            flexWrap: 'wrap',
            '& > :not(style)': {
                margin: "3px",
                width: 180,
                height: 90,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            },
          }}>

            <CardInfoValues 
                styles={{ color: "#009933" }}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.sold_total || [0])}
                title={t("card.sold_total")}
            />

            <CardInfoValues 
                styles={{ color: "#009933" }}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.guaranteed_total || [0])}
                title={t("card.guaranteed_total")}
            />

            {/* <CardInfoValues 
                styles={{ color: "#009933" }}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.housecut_total || [0])}
                title={t("card.housecut_total")}
            /> */}

            <CardInfoValues 
                styles={{ color: "#009933" }}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.seller_fee_total || [0])}
                title={t("card.seller_fee")}
            />

            <CardInfoValues 
                styles={{ color: "#009933" }}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.balance_total || [0])}
                title={t("card.balance_total")}
            />
            
            <CardInfoValues 
                styles={{ color: "#CFA500" }}
                backgroundstatus={"#F5EDCC"} 
                value={data?.total_items?.ticket_total}
                title={t("card.ticket_total")}
            />

            <CardInfoValues 
                styles={{ color: "#ff3333eb" }}
                backgroundstatus={"#f76d6dba"} 
                value={data?.total_items?.canceled_total}
                title={t("card.canceled_total")}
            />
        </Box>
    </Grid>
  );
};

export default Cards;
