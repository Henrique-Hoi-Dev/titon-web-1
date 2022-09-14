import React from "react";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
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
                colorstatus={"#263665"}
                colorvalue={data?.total_items?.total_not_paid_value || [0]}
                backgroundstatus={"#99cfe4d9"} 
                value={data?.total_items?.total_not_paid_value}
                title={t("card.not_paid_value")}
            />
        
            <CardInfoValues 
                colorstatus={"#ff3333b3"}
                colorvalue={data?.total_items?.total_paid_value || [0]}
                backgroundstatus={"#f76d6dba"} 
                value={data?.total_items?.total_paid_value}
                title={t("card.paid_value")}
            />

            <CardInfoValues 
                colorstatus={"#009933"}
                colorvalue={data?.total_items?.total_seller_entry || [0]}
                backgroundstatus={"#1ed72340"} 
                value={data?.total_items?.total_seller_entry}
                title={t("card.seller_entry")}
            />

            <CardInfoValues 
                colorstatus={"#CFA500"} 
                colorvalue={data?.total_items?.total_balance || [0]}
                backgroundstatus={"#F5EDCC"} 
                value={data?.total_items?.total_balance}
                title={t("card.balance_total")}
            />
            
            <CardInfoValues 
                backgroundstatus={"#F5EDCC"}
                colorvalue={data?.total_items?.total_seller_fee || [0]}
                colorstatus={"#CFA500"} 
                value={data?.total_items?.total_seller_fee}
                title={t("card.seller_fee")}
            />
        </Box>
    </Grid>
  );
};

export default Cards;
