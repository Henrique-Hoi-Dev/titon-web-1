import React from "react";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { moneyMask } from "utils/masks";
import { useGet } from "services/requests/useGet";
import { useState } from "react";

import CardInfoValues from "components/atoms/card/card";

const Cards = ({ data }) => {
  const { t } = useTranslation();

  const INITIAL_STATE_DRIVER = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: "ASC",
  };

  const [driverQuery, setDriverQuery] = useState(INITIAL_STATE_DRIVER);

  const {
    data: financial,
    error: financialError,
    isFetching: financialIsFetching,
    loading, 
    mutate,
  } = useGet(
    "financialStatements", 
    driverQuery
  );

  return (
    <Grid item container pl={2} mt={1} >
        <Box
          sx={{
            width: "100%",
            display: 'flex',
            overflow: 'auto',
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

            {financial?.dataResult?.map((financial) => (
                <CardInfoValues 
                    styles={{ color: "#263665" }}
                    backgroundstatus={"#dfdfdf"} 
                    // value={financial}
                    title={financial.cart_board}
                />                
            ))}

        </Box>
    </Grid>
  );
};

export default Cards;
