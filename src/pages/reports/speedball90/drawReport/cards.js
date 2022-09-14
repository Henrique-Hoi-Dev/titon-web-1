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
                colorstatus={"#009933"}
                colorvalue={data?.total_items?.sold_total || [0]}
                backgroundstatus={"#1ed72340"} 
                value={data?.total_items?.sold_total}
                title={t("card.sold_total")}
            />

            <CardInfoValues 
                colorstatus={"#009933"}
                colorvalue={data?.total_items?.ticket_total || [0]}
                backgroundstatus={"#1ed72340"} 
                value={data?.total_items?.ticket_total}
                title={t("card.ticket_total")}
            />

            <CardInfoValues 
                colorstatus={"#ff3333b3"}
                colorvalue={data?.total_items?.canceled_total || [0]}
                backgroundstatus={"#f76d6dba"} 
                value={data?.total_items?.canceled_total}
                title={t("card.canceled_total")}
            />

            <CardInfoValues 
                colorstatus={"#CFA500"} 
                colorvalue={data?.total_items?.guaranteed_total || [0]}
                backgroundstatus={"#F5EDCC"} 
                value={data?.total_items?.guaranteed_total}
                title={t("card.guaranteed_total")}
            />

            <CardInfoValues 
                colorstatus={"#CFA500"} 
                colorvalue={data?.total_items?.housecut_total || [0]}
                backgroundstatus={"#F5EDCC"} 
                value={data?.total_items?.housecut_total}
                title={t("card.housecut_total")}
            />

            <CardInfoValues 
                colorstatus={"#CFA500"} 
                colorvalue={data?.total_items?.seller_fee_total || [0]}
                backgroundstatus={"#F5EDCC"} 
                value={data?.total_items?.seller_fee_total}
                title={t("card.seller_fee")}
            />

            <CardInfoValues 
                colorstatus={"#CFA500"} 
                colorvalue={data?.total_items?.balance_total || [0]}
                backgroundstatus={"#F5EDCC"} 
                value={data?.total_items?.balance_total}
                title={t("card.balance_total")}
            />
        </Box>
    </Grid>
  );
};

export default Cards;
