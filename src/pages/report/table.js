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
  STableGrid,
  STableBody,
  SLabel,
} from "components/atoms/table/table";

import InfoRow from "./infoRow";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import imgNotFound from "../../assets/NotFound.png";

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

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <>
      <STableGrid
        component={Paper}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      >
        <STable>
          <SHead>
            <SRow>
              {/* <SCell>
                <Checkbox
                  color="primary"
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  // onChange={onSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </SCell> */}
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

        {!isFetching && data?.dataResult?.length > 0 && (
          <TablePagination data={data} query={query} setQuery={setQuery} />
        )}

        {(loading || isFetching) && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading />
          </Grid>
        )}

        {data?.dataResult?.length === 0 && !isFetching && (
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            p={5}
          >
            <Text fontSize={"28px"} center>
              {"RESULTADO NÃO ENCONTRADO..."}
              <img
                src={imgNotFound}
                alt="img"
                width={"60px"}
                style={{
                  verticalAlign: "middle",
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
      </STableGrid>
    </>
  );
};

export default Table;
