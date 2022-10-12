import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel
} from "components/atoms/table/table"

import InfoRow from "./infoRow";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import ModalAction from "./modalAction";

const Table = (
  { 
    data,
    query, 
    setQuery, 
    isFetching, 
    mutate, 
    error, 
    loading 
  }) => {

  const { t } = useTranslation();

  // const isDesktop = useMediaQuery({ maxWidth: "1400px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

  const [showModalAction, setShowModalAction] = useState(false);

  const [checkId, setCheckId] = useState(null)

  console.log("state", data)

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === "ASC" ? "DESC" : "ASC"}`
    }))
    return;
  };
  
  return (
    <>
      <TableContainer component={Paper}>
        <STable>
          <SHead>
            <SRow>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "status_check_order"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("status_check_order")}
                >
                  Status
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "start_city"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("start_city")}
                >
                  Inicio Frete
                </SLabel>
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "final_city"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("final_city")}
                >
                  Final Frete
                </SLabel>
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "location_of_the_truck"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("location_of_the_truck")}
                >
                  Local Atual
                </SLabel>
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "preview_tonne"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("preview_tonne")}
                >
                  Prévia Tonelada
                </SLabel>
              </SCell>
              <SCell>Info</SCell>
            </SRow>
          </SHead>
          {!isFetching && data && data?.dataResult?.freigth?.length > 0 && (
            <STableBody>
              {data?.dataResult?.freigth?.map((item, index) => (
                <InfoRow
                  key={item.id}
                  data={item}
                  index={index}
                  setCheckId={setCheckId}
                  setShowModalAction={setShowModalAction}
                  query={query}
                  setQuery={setQuery}
                />
              ))}
            </STableBody>
          )}
        </STable>

        {(loading || isFetching) && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading/>
          </Grid>
        )}

        <Grid
          item
          container
          spacing={2}
          mt={1}
          mb={1}
          alignItems="center"
          flexWrap="nowrap"
          justifyContent="center"
        > 

          {(data?.dataResult?.freigth?.length === 0) && !isFetching && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {t("messages.no_results_found").toUpperCase()}
              </Text>
            </Grid>
          )}

          {error && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {t("messages.unknown_error").toUpperCase()}
              </Text>
            </Grid>
          )}
        </Grid>
      </TableContainer>   

      {showModalAction && (
        <ModalAction 
          setShowModal={setShowModalAction}
          showModal={showModalAction}
          checkId={checkId}
          mutate={mutate}
        />
      )} 
    </>
  );
};

export default Table;
