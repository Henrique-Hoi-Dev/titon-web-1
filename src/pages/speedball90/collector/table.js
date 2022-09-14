import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";

import Text from "components/atoms/text/text";
import ModalUpdateSalespoint from "./modalUpdateCollector";
import Loading from "components/atoms/loading/loading";
import InfoRow from "./infoRow";

import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel,
} from "components/atoms/table/table";

const Table = (
  { 
    data, 
    query, 
    setQuery, 
    mutate,
    isValidating,
    error, 
    loading, 
  }) => {

  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ maxWidth: "900px" });
  const isMobile = useMediaQuery({ maxWidth: "725px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "475px" });

  const [showModalUpdateCollector, setShowModalUpdateCollector] = useState(false);
  const [collectorId, setCollectorId] = useState("");
  const [gameInstanceId, setGameInstanceId] = useState("");

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === "ASC" ? "DESC" : "ASC"}`,
    }));
    return;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <STable>
          <SHead>
            <SRow>
            <SCell minwidth={"0px"} displaywidth={isDesktop ? 0 : 1}>{t("menu.info")}</SCell>
              <SCell >
                <SLabel
                  active={query?.sort_field === "id"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("id")}
                >
                  ID
                </SLabel>
              </SCell>

              <SCell displaywidth={isSmallMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "name"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("name")}
                >
                  {t("field.seller_name")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "room_name"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("room_name")}
                >
                  {t("field.game_instance")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "status"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("status")}
                >
                  {t("field.status")}
                </SLabel>
              </SCell>

              <SCell>
                {t("field.actions")}  
              </SCell>
              
            </SRow>
          </SHead>
          {!isValidating && data && data?.total > 0 && (
            <STableBody>
              {data?.items.map((item, index) => (
                <InfoRow
                  key={item.id}
                  data={item}
                  index={index}
                  setCollectorId={setCollectorId}
                  setGameInstanceId={setGameInstanceId}
                  setShowModalUpdateCollector={setShowModalUpdateCollector}
                />
              ))}
            </STableBody>
          )}
        </STable>

        {!isValidating && data?.totalPages > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
            allowRowsPerPage
          />
        )}
        
        {(loading || isValidating) && (
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

          {(data?.total === 0 || !data) && (
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

      {showModalUpdateCollector && (
        <ModalUpdateSalespoint
          showModal={showModalUpdateCollector}
          setShowModal={setShowModalUpdateCollector}
          collectorId={collectorId}
          gameInstanceId={gameInstanceId}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default Table;
