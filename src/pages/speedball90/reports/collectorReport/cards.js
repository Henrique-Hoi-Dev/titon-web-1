import React from "react";
import { Box, Grid} from "@mui/material";
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
                styles={{ color: "#CFA500"}}
                backgroundstatus={"#F5EDCC"} 
                value={moneyMask(data?.total_items?.out_value || [0])}
                title={t("field.bleed")}
            />
            
            <CardInfoValues 
                styles={{ color: "#CFA500"}}
                backgroundstatus={"#F5EDCC"} 
                value={moneyMask(data?.total_items?.in_value || [0])}
                title={t("field.contribution")}
            />

            <CardInfoValues 
                styles={{ color: "#009933" }}
                backgroundstatus={"#1ed72340"} 
                value={moneyMask(data?.total_items?.total || [0])}
                title={"Total"}
            />
        </Box>
    </Grid>
  );
};

export default Cards;
