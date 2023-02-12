import React from "react";
import { Checkbox, Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import { useMediaQuery } from "react-responsive";
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel,
} from "components/atoms/table/table";

import InfoRow from "./infoRow";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import imgNotFound from "../../assets/trist-not-found-table.svg";

const Table = ({ data, query, setQuery, isFetching, error, loading }) => {
  const { t } = useTranslation();

  // const isDesktop = useMediaQuery({ maxWidth: "1250px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

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
              <SCell>
                <Checkbox
                  color="primary"
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  // onChange={onSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "id"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("id")}
                >
                  Motorista
                </SLabel>
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "start_date"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("start_date")}
                >
                  Data
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "truck_models"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("truck_models")}
                >
                  Caminhão
                </SLabel>
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "cart_models"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cart_models")}
                >
                  Carreta
                </SLabel>
              </SCell>
            </SRow>
          </SHead>
          {!isFetching && data && data?.dataResult?.length > 0 && (
            <>
              <STableBody>
                {data?.dataResult.map((item, index) => (
                  <InfoRow key={item.id} data={item} index={index} />
                ))}
              </STableBody>
            </>
          )}
        </STable>

        {(loading || isFetching) && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading />
          </Grid>
        )}

        <Grid
          item
          container
          spacing={2}
          mt={1}
          mb={1}
          p={"18px"}
          alignItems="center"
          flexWrap="nowrap"
          justifyContent="center"
        >
          {data?.dataResult?.length === 0 && !isFetching && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {"RESULTADO NÃO ENCONTRADO..."}
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

          {error && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {t("messages.unknown_error").toUpperCase()}
              </Text>
            </Grid>
          )}
        </Grid>

        {!isFetching && data?.dataResult?.length > 0 && (
          <TablePagination data={data} query={query} setQuery={setQuery} />
        )}
      </TableContainer>
    </>
  );
};

export default Table;
