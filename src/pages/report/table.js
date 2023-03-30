import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";
import imgNotFound from "../../assets/NotFound.png";

import { alpha } from "@mui/material/styles";
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
} from "components/atoms/table/table";
import { Grid } from "@mui/material";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import { formatDate } from "utils/formatDate";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "calories";
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <SHead>
      <SRow>
        <SCell>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </SCell>
        <SCell>ID</SCell>
        <SCell>Motorista</SCell>
        <SCell>Data</SCell>
        <SCell>Caminhão</SCell>
        <SCell>Carreta</SCell>
      </SRow>
    </SHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TableCheck({
  data,
  query,
  setQuery,
  isFetching,
  error,
  loading,
}) {
  console.log("🚀 ~ file: table.js:166 ~ data:", data);

  function createData(id, driver, date, truck, cart) {
    return {
      id,
      driver,
      date,
      truck,
      cart,
    };
  }

  const rows = data?.dataResult?.map((item) =>
    createData(
      item.id,
      item.driver_name,
      formatDate(item.start_date),
      item.truck_models,
      item.cart_models
    )
  );

  console.log("🚀 ~ file: table.js:190 ~ rows:", rows);
  const [selected, setSelected] = React.useState([]);
  const [visibleRows, setVisibleRows] = React.useState(null);

  React.useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <STable sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <STableBody>
              {visibleRows
                ? visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <SRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                        alternatingcolors={index}
                      >
                        <SCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </SCell>
                        <SCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.id}
                        </SCell>
                        <SCell align="right">{row.driver}</SCell>
                        <SCell align="right">{row.date}</SCell>
                        <SCell align="right">{row.truck}</SCell>
                        <SCell align="right">{row.cart}</SCell>
                      </SRow>
                    );
                  })
                : null}
            </STableBody>
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
        </TableContainer>
      </Paper>
    </Box>
  );
}
