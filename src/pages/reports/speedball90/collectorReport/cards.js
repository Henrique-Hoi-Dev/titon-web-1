import React from "react";
import { Box, Grid} from "@mui/material";
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
                colorstatus={"#009933"}
                colorvalue={data?.total_items?.out_value || [0]}
                backgroundstatus={"#1ed72340"} 
                value={data?.total_items?.out_value}
                title={t("field.bleed")}
            />
            
            <CardInfoValues 
                colorstatus={"#ff3333b3"}
                colorvalue={data?.total_items?.in_value || [0]}
                backgroundstatus={"#f76d6dba"} 
                value={data?.total_items?.in_value}
                title={t("field.contribution")}
            />

            <CardInfoValues 
                colorstatus={"#009933"}
                colorvalue={data?.total_items?.total || [0]}
                backgroundstatus={"#1ed72340"} 
                value={data?.total_items?.total}
                title={"Total"}
            />
        </Box>
    </Grid>
  );
};

export default Cards;
