import React from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import { useMediaQuery } from "react-responsive";

import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";

import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel
} from "components/atoms/table/table"

import InfoRow from "./infoRow";

const Table = ({ data, query, setQuery, isValidating, mutate, error, loading }) => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ maxWidth: "1250px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

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
              <SCell displaywidth={isDesktop ? 0 : 1}>Info</SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "id"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("id")}
                >
                  ID
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "roomid"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("roomid")}
                >
                    ID {t("field.room")}
                </SLabel>
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "userid"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("userid")}
                >
                ID {t("menu.user")}
                </SLabel>
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "value"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("value")}
                >
                {t("field.value")}
                </SLabel>
              </SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "date"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("date")}
                >
                  {t("field.deposit_date")}
                </SLabel>
              </SCell>
            </SRow>
          </SHead>

          {data && data?.items?.length > 0 && (
            <>
              <STableBody>
                {data.items.map((item, index) => (
                  <InfoRow
                    key={item.id}
                    data={item}
                    index={index}
                  />
                ))}
              </STableBody>
            </>
          )}
        </STable>

        { loading && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading />
          </Grid>
        )}

        {data?.totalPages > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
            allowRowsPerPage
          />
        )}

        {data?.totalPages === 0 ? error : (
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
