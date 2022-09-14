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
            maxWidth: "1000px",
            display: 'flex',
            justifyContent: "center",
            flexWrap: 'wrap',
            '& > :not(style)': {
                margin: "3.5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            },
          }}>

            <CardInfoValues 
                styles={{ color: "#CFA500"}}
                backgroundstatus={"#F5EDCC"} 
                value={moneyMask(data?.total_items?.entry_credit || [0])}
                title={t("card.entry_credit")}
            />

            <CardInfoValues 
                styles={{ color: "#CFA500"}}
                backgroundstatus={"#F5EDCC"} 
                value={moneyMask(data?.total_items?.entry_debit || [0])}
                title={t("card.entry_debit")}
            />
                                    
            <CardInfoValues 
                styles={{ color: "#ff3333eb"}}
                backgroundstatus={"#f76d6dba"} 
                value={moneyMask(data?.total_items?.paid_value || [0])}
                title={t("card.paid_value")}
            />

            <CardInfoValues 
                styles={{ color: "#263665"}}
                backgroundstatus={"#99cfe4d9"} 
                value={moneyMask(data?.total_items?.not_paid_value || [0])}
                title={t("card.not_paid_value")}
            />

            <CardInfoValues 
                styles={{ color: "#009933"}}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.in_value || [0])}
                title={t("card.in_value")}
            />

            <CardInfoValues 
                // colorstatus={"#CFA500"} 
                styles={{ color: "#009933"}}
                // backgroundstatus={"#F5EDCC"} 
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.seller_fee || [0])}
                title={t("card.seller_fee")}
            />

            <CardInfoValues 
                colorstatus={"#009933"} 
                colorvalue={data?.total_items?.balance || [0]}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.balance || [0])}
                title={t("card.balance")}
            />
        </Box>
    </Grid>
  );
};

export default Cards;
