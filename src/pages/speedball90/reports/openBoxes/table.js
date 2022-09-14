import React from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import { useMediaQuery } from "react-responsive";

import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import InfoRow from "./infoRow";

import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel
} from "components/atoms/table/table";

const Table = (
  { 
    data, 
    query, 
    setQuery, 
    error,
    gameInstanceId,
    isValidating, 
    loading 
  }) => {

  const { t } = useTranslation();

  const isDesktop = useMediaQuery({ maxWidth: "1700px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1425px" });
  const isMobile = useMediaQuery({ maxWidth: "800px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "590px" });

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === "ASC" ? "DESC" : "ASC"}`
    }))
    return;
  };

  return (
      <TableContainer component={Paper}>
        {gameInstanceId && (
          <STable>
            <SHead>
              <SRow>
              <SCell minwidth={"0px"} displaywidth={isDesktop ? 0 : 1}>
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

                <SCell minwidth={"0px"}>
                  <SLabel
                    active={query?.sort_field === "seller_name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("seller_name")} >
                    {t("field.seller_name")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "seller_fee"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("seller_fee")}
                  >
                  {t("card.seller_fee")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "seller_pin"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("seller_pin")}
                  >
                  PIN {t("field.sellers")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "in_value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("in_value")} >
                    {t("card.in_value")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "paid_value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("paid_value")} >
                    {t("field.paid")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "not_paid_value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("not_paid_value")} >
                    {t("card.not_paid_value")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isDesktop ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "balance"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("balance")}
                  >
                  {t("card.balance")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isDesktop ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "entry_credit"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("entry_credit")}
                  >
                  {t("card.entry_credit")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isDesktop ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "entry_debit"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("entry_debit")}
                  >
                  {t("card.entry_debit")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isSmallMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "start_date"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("start_date")}
                  >
                    {t("field.initial_date")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isSmallMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "end_date"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("end_date")}
                  >
                    {t("field.final_date")}
                  </SLabel>
                </SCell>
              </SRow>
            </SHead>
            {!isValidating && data && data?.items?.length > 0 && (
              <STableBody>
                {data?.items?.map((item, index) => (
                  <InfoRow 
                    key={index}
                    data={item} 
                    index={index}
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
        
        {!isValidating && data?.total_pages > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
            allowRowsPerPage
            labelRowsPerPage={t("components.line_per_page")}
          />
        )}
      </TableContainer>
  );
};

export default Table;
