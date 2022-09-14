import React from "react";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
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
                colorstatus={"#009933"}
                colorvalue={data?.total_items?.entry_credit || [0]}
                backgroundstatus={"#1ed72340"} 
                value={data?.total_items?.entry_credit}
                title={t("card.entry_credit")}
            />

            <CardInfoValues 
                colorstatus={"#009933"}
                colorvalue={data?.total_items?.entry_debit || [0]}
                backgroundstatus={"#1ed72340"} 
                value={data?.total_items?.entry_debit}
                title={t("card.entry_debit")}
            />

            <CardInfoValues 
                colorstatus={"#009933"}
                colorvalue={data?.total_items?.in_value|| [0]}
                backgroundstatus={"#1ed72340"} 
                value={data?.total_items?.in_value}
                title={t("card.in_value")}
            />

            <CardInfoValues 
                colorstatus={"#ff3333b3"}
                colorvalue={data?.total_items?.paid_value || [0]}
                backgroundstatus={"#f76d6dba"} 
                value={data?.total_items?.paid_value}
                title={t("card.paid_value")}
            />

            <CardInfoValues 
                colorstatus={"#263665"}
                colorvalue={data?.total_items?.not_paid_value || [0]}
                backgroundstatus={"#99cfe4d9"} 
                value={data?.total_items?.not_paid_value}
                title={t("card.not_paid_value")}
            />

            <CardInfoValues 
                colorstatus={"#CFA500"} 
                colorvalue={data?.total_items?.seller_fee || [0]}
                backgroundstatus={"#F5EDCC"} 
                value={data?.total_items?.seller_fee}
                title={t("card.seller_fee")}
            />

            <CardInfoValues 
                colorstatus={"#CFA500"} 
                colorvalue={data?.total_items?.balance|| [0]}
                backgroundstatus={"#F5EDCC"} 
                value={data?.total_items?.balance}
                title={t("card.balance")}
            />
        </Box>
    </Grid>
  );
};

export default Cards;
