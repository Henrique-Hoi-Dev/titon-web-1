import React from "react";
import { Box, Grid } from "@mui/material";
import { useGet } from "services/requests/useGet";
import { useState } from "react";

import CardInfoValues from "components/atoms/card/card";
import Loading from "components/atoms/loading/loading";
import Permission from "./ModalCheckspermission/permission";

const Cards = () => {

  const [showModal, setShowModal] = useState(false);
  const [financialId, setFinancialId] = useState('');

  const INITIAL_STATE_DRIVER = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: "ASC",
  };

  const [driverQuery, ] = useState(INITIAL_STATE_DRIVER);

  const {
    data: financial,
    // error: financialError,
    // isFetching: financialIsFetching,
    loading, 
    // mutate,
  } = useGet(
    "financialStatements", 
    driverQuery
  );

  return (
    <Grid item container pl={2} mt={-2}>
      <Box
        sx={{
          minHeight: "385px",
          minWidth: "100%",
          display: 'flex',
          flexDirection: "row",
          overflowX: 'auto',
          justifyContent: "center",
          '& > :not(style)': {
            margin: "10px",
            width: 180,
            height: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        {financial?.dataResult?.map((financial) => (
          <CardInfoValues 
            key={financial?.id}
            backgroundstatus={"#dfdfdf"} 
            props={financial}
            title={financial.cart_board}
            onClick={() => setShowModal(true) || setFinancialId({ id: financial?.id, truck_board: financial?.truck_board })}
          />    
        ))}
        <Grid item container pl={2} mt={-2} justifyContent={"center"} alignItems={"center"}>
          {loading && <Loading color={"white"}/> }
        </Grid>
      </Box>

      {showModal && (
        <Permission 
          setShowModal={setShowModal}
          showModal={showModal}
          financialId={financialId}
        />
      )}
    </Grid>
  );
};

export default Cards;
