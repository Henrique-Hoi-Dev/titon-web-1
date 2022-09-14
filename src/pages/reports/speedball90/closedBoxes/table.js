import React from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import Text from "components/atoms/text/text";
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
    isValidating, 
    mutate, 
    error, 
    loading, 
  }) => {

  const { t } = useTranslation();
  
  const isDesktop = useMediaQuery({ maxWidth: "1450px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1260px" });
  const isMobile = useMediaQuery({ maxWidth: "665px" });

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === "ASC" ? "DESC" : "ASC"}`,
    }));
    return;
  };

  return (
    <TableContainer component={Paper}>
      <STable>
        <SHead>
          <SRow>
            <SCell minwidth={"0px"} displaywidth={isDesktop ? 0 : 1}>
              {t("menu.info")}
            </SCell>
            <SCell minwidth={"0px"}>
              <SLabel
                active={query?.sort_field === "id"}
                direction={query?.sort_order?.toLowerCase()}
                onClick={() => handleSort("id")}
              >
                ID
              </SLabel>
            </SCell>

            <SCell minwidth={"0px"}>
              <SLabel
                active={query?.sort_field === "collector_name"}
                direction={query?.sort_order?.toLowerCase()}
                onClick={() => handleSort("collector_name")}
              >
                {t("field.collector_name")}
              </SLabel>
            </SCell>

            <SCell displaywidth={isSmallDesktop ? 1 : 0}>
              <SLabel
                active={query?.sort_field === "entries"}
                direction={query?.sort_order?.toLowerCase()}
                onClick={() => handleSort("entries")}
              >
                {t("field.entries")}
              </SLabel>
            </SCell>

            <SCell displaywidth={isSmallDesktop ? 1 : 0}>
              <SLabel
                active={query?.sort_field === "paid"}
                direction={query?.sort_order?.toLowerCase()}
                onClick={() => handleSort("paid")}
              >
                {t("field.paid")}
              </SLabel>
            </SCell>

            <SCell displaywidth={isSmallDesktop ? 1 : 0}>
              <SLabel
                active={query?.sort_field === "not_paid"}
                direction={query?.sort_order?.toLowerCase()}
                onClick={() => handleSort("not_paid")}
              >
                {t("field.not_paid")}
              </SLabel>
            </SCell>

            <SCell displaywidth={isDesktop ? 1 : 0}>
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

            <SCell displaywidth={isMobile ? 1 : 0}>
              <SLabel
                active={query?.sort_field === "date"}
                direction={query?.sort_order?.toLowerCase()}
                onClick={() => handleSort("date")}
              >
                {t("field.date")}
              </SLabel>
            </SCell>
          </SRow>
        </SHead>

        {data && data?.items?.length > 0 && (
          <STableBody>
            {data.items.map((item, index) => (
              <InfoRow 
                key={item.id}
                data={item} 
                index={index}
              />
            ))}
          </STableBody>
        )}
      </STable>

      {loading && data && (
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

      {(data?.total === 0 || error || !data) && (
        <Grid container justifyContent="center" alignItems="center" pt={5}>
          <Text fontSize={"28px"} center>
            {t("messages.no_results_found").toUpperCase()}
          </Text>
        </Grid>
      )}
    </TableContainer>
  );
};

export default Table;
