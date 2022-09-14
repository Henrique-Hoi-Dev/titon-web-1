import React from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";

import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel,
} from "components/atoms/table/table";

import InfoRow from "./infoRow";

const Table = (
  { 
    data, 
    query, 
    setQuery, 
    isValidating, 
    setShowModalUpdate, 
    setGameInstance, 
    setDeviceId, 
    error,
    loading 
  }) => {

  const { t } = useTranslation();
  
  const isDesktop = useMediaQuery({ maxWidth: "1175px" });
  const isMobile = useMediaQuery({ maxWidth: "772px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "550px" });

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
              <SCell displaywidth={isDesktop ? 0 : 1}>
                {t("menu.info")}
              </SCell>

              <SCell>
                <SLabel
                  active={query?.sort_field === "id"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("id")} >
                 ID
                </SLabel>
              </SCell>

              <SCell displaywidth={isSmallMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "number"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("number")} 
                >
                  {t("menu.device")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "room_id"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("room_id")}
                >
                  {"ID " + t("field.room")}
                </SLabel>
              </SCell>

              <SCell  displaywidth={isMobile ? 1 : 0} >
                <SLabel
                  active={query?.sort_field === "room_name"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("room_name")} 
                >
                    {t("field.room_name")}  
                </SLabel>
              </SCell>

              <SCell  displaywidth={isDesktop ? 1 : 0} >
                <SLabel
                  active={query?.sort_field === "salespoint_id"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("salespoint_id")} 
                >
                    {"ID " + t("field.salespoint_name")}  
                </SLabel>
              </SCell>

              <SCell  displaywidth={isMobile ? 1 : 0} >
                <SLabel
                  active={query?.sort_field === "salespoint_name"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("salespoint_name")} 
                >
                    {t("field.salespoint_name")}  
                </SLabel>
              </SCell>

              <SCell>
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
          {data && data?.total > 0 && (
            <STableBody>
              {data?.items.map((item, index) => (
                <InfoRow
                  key={index}
                  data={item}
                  index={index}
                  setShowModalUpdate={setShowModalUpdate}
                  setGameInstance={setGameInstance}
                  setDeviceId={setDeviceId}
                />
              ))}
            </STableBody>
          )}
        </STable>
        
        {loading && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading />
          </Grid>
        )}

        {data?.total > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
            allowRowsPerPage
          />
        )}

        {(data?.total === 0 || error) && (
          <Grid container justifyContent="center" alignItems="center" pt={5}>
            <Text fontSize={"28px"} center>
              {t("messages.no_results_found").toUpperCase()}
            </Text>
          </Grid>
        )}
      </TableContainer>

    </>
  );
};

export default Table;
