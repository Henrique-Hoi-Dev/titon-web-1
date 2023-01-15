import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useGet } from "services/requests/useGet";
import { useState } from "react";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import { InfoFinancial } from "./Modal/infoFinancial";

import imgNotFound from "../../../assets/trist-not-found.svg";
import CardInfoValues from "pages/home/card/cardInfoValues";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";

const Cards = ({ search, searchOrder, searchStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [financialId, setFinancialId] = useState("");

  const INITIAL_STATE_FINANCIAL = {
    limit: 5,
    page: 1,
    sort_field: "id",
    sort_order: "ASC",
  };

  const [financialQuery, setFinancialQuery] = useState(INITIAL_STATE_FINANCIAL);

  if (financialQuery.status_check === "") delete financialQuery.status_check;
  if (financialQuery.sort_order === "") delete financialQuery.sort_order;
  if (financialQuery.status_check === "") delete financialQuery.status_check;
  if (financialQuery.search === "") delete financialQuery.search;

  const {
    data: financial,
    loading,
    isValidating,
  } = useGet("financialStatements", financialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinancialQuery((state) => ({
        ...state,
        search: search,
      }));
    }, 1200);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setFinancialQuery((state) => ({
      ...state,
      sort_order: searchOrder,
      status_check: searchStatus,
    }));
  }, [searchOrder, searchStatus]);

  return (
    <Grid item container pl={2} mt={-2}>
      <Box
        sx={{
          minHeight: "385px",
          minWidth: "100%",
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          justifyContent: "center",
          "& > :not(style)": {
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
            props={financial}
            onClick={() =>
              setShowModal(true) ||
              setFinancialId({
                id: financial?.id,
                truck_board: financial?.truck_board,
              })
            }
          />
        ))}
        {financial?.dataResult?.length === 0 && (
          <Grid item justifyContent="center" alignItems="center" pt={5} md={6}>
            <Text fontSize={"28px"} center>
              FICHAS NÃO ENCONTRADA...{" "}
              <img
                src={imgNotFound}
                alt="img"
                width={"40px"}
                style={{
                  verticalAlign: "bottom",
                  marginLeft: "24px",
                }}
              />
            </Text>
          </Grid>
        )}
        {loading && (
          <Grid
            item
            container
            pl={2}
            mt={-2}
            md={6}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Loading color={"white"} />
          </Grid>
        )}
      </Box>
      {!isValidating && !loading && financial?.totalPages > 0 && (
        <Grid item container pl={2} mt={-2}>
          <TablePagination
            sx={{
              "& .css-levciy-MuiTablePagination-displayedRows": {
                color: "#F1F3F9!important",
              },
            }}
            data={financial}
            query={financialQuery}
            setQuery={setFinancialQuery}
          />
        </Grid>
      )}

      {showModal && (
        <InfoFinancial
          setShowModal={setShowModal}
          showModal={showModal}
          financialId={financialId}
        />
      )}
    </Grid>
  );
};

export default Cards;
