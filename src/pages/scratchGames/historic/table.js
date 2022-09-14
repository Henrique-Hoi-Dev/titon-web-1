import React from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/formatDate";
import { moneyMask } from "utils/masks";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel
} from "components/atoms/table/table";

const Table = ({ data, query, setQuery, isValidating, mutate, loading, error }) => {
  const { t } = useTranslation();

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
        <STable>
          <SHead>
            <SRow>
              <SCell>
                <SLabel
                  active={query?.sort_field === "id"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("id")}
                >
                  ID
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "userId"}
                    direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("userId")}
                >
                  ID {t("menu.user")}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "gameinstanceid"}
                    direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("gameinstanceid")}
                >
                    ID {t("field.game_instance")}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "gamecounter"}
                    direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("gamecounter")}
                >
                  {t("field.game_counter")}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "denom"}
                    direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("denom")}
                >
                    {t("field.denominator")}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "cashtotalspent"}
                    direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cashtotalspent")}
                >
                  {t("field.total_spent")}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "cashtotalwin"}
                    direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cashtotalwin")}
                >
                    {t("field.total_win")}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "bet"}
                    direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("bet")}
                >
                  {t("field.bet")}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "balance"}
                    direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("balance")}
                >
                  {t("field.balance")}
                </SLabel>
                </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "finishdate"}
                    direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("finishdate")}
                >
                  {t("field.finish_date")}
                </SLabel>
              </SCell>
            </SRow>
          </SHead>
          {data && data?.items?.length > 0 && (
            <STableBody>
              {data.items.map((item) => (
                <SRow key={item.id}>
                  <SCell>{item.id}</SCell>
                  <SCell>{item.userid ?? "-"}</SCell>
                  <SCell>{item.gameinstanceid ?? "-"}</SCell>
                  <SCell>{item.gamecounter ?? "-"}</SCell>
                  <SCell>{item.denom ?? "-"}</SCell>
                  <SCell>{moneyMask(item.cashtotalspent)}</SCell>
                  <SCell>{moneyMask(item.cashtotalwin)}</SCell>
                  <SCell>{moneyMask(item.bet)}</SCell>
                  <SCell>{moneyMask(item.balance)}</SCell>
                  <SCell>{formatDate(item.finishdate)}</SCell>
                </SRow>
              ))}
            </STableBody>
          )}
        </STable>

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

          {(data?.totalPages === 0 || !data) && (
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
  );
};

export default Table;
