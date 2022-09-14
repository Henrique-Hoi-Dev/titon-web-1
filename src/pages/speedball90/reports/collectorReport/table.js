import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";

import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import ModalCollectorIn from "./modalCollectorIn/modalCollectorIn";
import ModalCollectorOut from "./modalCollectorOut/modalCollectorOut";
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
    initialDate, 
    finalDate, 
    isValidating,
    error, 
    loading,
    gameInstanceId 
  }) => {
  
  const { t } = useTranslation();
  
  const [showModalCollectorIn, setShowModalCollectorIn] = useState(false);
  const [showModalCollectorOut, setShowModalCollectorOut] = useState(false);

  const [collectorId, setCollectorId] = useState("");

  const isDesktop = useMediaQuery({ maxWidth: "610px" });
  const isMobile = useMediaQuery({ maxWidth: "475px" });

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
        {gameInstanceId && (
          <STable>
            <SHead>
              <SRow>
                <SCell displaywidth={isDesktop ? 0 : 1}>
                  {t("menu.info")}
                </SCell>

                <SCell>
                  ID
                </SCell>

                <SCell>
                  <SLabel
                    active={query?.sort_field === "collector_name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("collector_name")} >
                    {t("field.collector_name")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "in_value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("in_value")} 
                  >
                    {t("field.contribution")}  
                  </SLabel>
                </SCell>

                <SCell displaywidth={isMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "out_value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("out_value")}
                  >
                    {t("field.bleed")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isDesktop ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "total"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("total")} 
                  >
                    Total
                  </SLabel>
                </SCell>

              </SRow>
            </SHead>
            {!isValidating && data && data?.total > 0 && (
              <STableBody>
                {data?.items?.map((item, index) => (
                  <InfoRow
                    key={index}
                    data={item}
                    index={index}
                    setCollectorId={setCollectorId}
                    setShowModalCollectorIn={setShowModalCollectorIn}
                    setShowModalCollectorOut={setShowModalCollectorOut}
                  />
                ))}
              </STableBody>
            )}
          </STable>
        )}

        {(loading || isValidating) && gameInstanceId && (
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

          {(data?.total === 0 || !data) && gameInstanceId && (
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

          {!gameInstanceId && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {t("messages.select_game_instance").toUpperCase()}
              </Text>
            </Grid>
          )}
        </Grid>
        
        {!isValidating && data?.totalPages > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
            allowRowsPerPage
            labelRowsPerPage={t("components.line_per_page")}
          />
        )}
      </TableContainer>

      {showModalCollectorIn && (
          <ModalCollectorIn 
            showModal={showModalCollectorIn} 
            setShowModal={setShowModalCollectorIn}
            loading={loading}
            gameInstanceId={gameInstanceId}
            id={collectorId}
            startDate={initialDate}
            endDate={finalDate}
          />
        )
      }

      {showModalCollectorOut && (
          <ModalCollectorOut 
            showModal={showModalCollectorOut} 
            setShowModal={setShowModalCollectorOut}
            loading={loading}
            gameInstanceId={gameInstanceId}
            id={collectorId}
            startDate={initialDate}
            endDate={finalDate}
          />
        )
      }
    </>
  );
};

export default Table;
