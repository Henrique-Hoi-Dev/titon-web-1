import React from "react";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { moneyMask } from "utils/masks";
import CardInfoValues from "components/atoms/card/card";

const Cards = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Grid item container pl={2} mt={1} >
        <Box
          sx={{
            width: "100%",
            display: 'flex',
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
                styles={{ color: "#263665" }}
                backgroundstatus={"#99cfe4d9"} 
                value={moneyMask(data?.total_items?.total_not_paid_value || [0])}
                title={t("card.not_paid_value")}
            />

            <CardInfoValues 
                styles={{ color: "#009933" }}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.total_seller_entry || [0])}
                title={t("card.seller_entry")}
            />
            
            <CardInfoValues 
                styles={{ color: "#009933" }}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.total_seller_fee || [0])}
                title={t("card.seller_fee")}
            />

            <CardInfoValues 
                colorstatus={"#009933"} 
                colorvalue={data?.total_items?.total_balance || [0]}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.total_balance || [0])}
                title={t("card.balance_total")}
            />
                    
            <CardInfoValues 
                styles={{ color: "#ff3333eb" }}
                backgroundstatus={"#f76d6dba"} 
                value={moneyMask(data?.total_items?.total_paid_value || [0])}
                title={t("card.paid_value")}
            />
        </Box>
    </Grid>
  );
};

export default Cards;
