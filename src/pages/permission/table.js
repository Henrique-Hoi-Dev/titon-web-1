import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
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

  const isDesktop = useMediaQuery({ maxWidth: "1400px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

  const [showModalAction, setShowModalAction] = useState(false);

  const [checkId, setCheckId] = useState(null)

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
              {/* <SCell displaywidth={isDesktop ? 0 : 1}>Mais Info</SCell> */}
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
                  active={query?.sort_field === "contractor"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("contractor")}
                >
                  Motorista
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
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "truck_chassis"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("truck_chassis")}
                >
                  Placa
                </SLabel>
              </SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "start_km"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("start_km")}
                >
                  Valor Tonelada
                </SLabel>
              </SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "preview_value_diesel"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("preview_value_diesel")}
                >
                  Valor Prévia Diesel
                </SLabel>
              </SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "start_date"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("start_date")}
                >
                  Data Check Frete
                </SLabel>
              </SCell>
              <SCell>Ações</SCell>
            </SRow>
          </SHead>
          {!isFetching && data && data?.dataResult?.length > 0 && (
            <>
              <STableBody>
                {data.dataResult.map((item, index) => (
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
            </>
          )}
        </STable>

        {(loading || isFetching) && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading titulo={t("messages.loading")}/>
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

          {(data?.total === 0) && !isFetching && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {t("messages.no_results_found").toUpperCase()}
              </Text>
            </Grid>
          )}

          {(data?.total === 0) && !data && !isFetching && (
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

        {!isFetching && data?.totalPages > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
          />
        )}
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
