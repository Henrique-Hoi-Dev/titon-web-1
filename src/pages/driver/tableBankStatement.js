import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import { TablePagination } from '@mui/material';
import { formatDate } from '../../utils/formatDate';
import { moneyMask } from 'utils/masks';
import { BaseNotFount } from 'components/molecules/BaseNotFound/BaseNotFound';
import { SHead, SRow, STable } from 'components/atoms/BaseTable/BaseTable';

export default function TableBankStatement({ data }) {
  function createData(typeTransactions, value, type, date) {
    return { typeTransactions, value, type, date };
  }

  const columns = [
    { id: 'typeTransactions', label: 'Motivo', minWidth: 170 },
    { id: 'value', label: 'Valor', minWidth: 140 },
    {
      id: 'type',
      label: 'Tipo',
      minWidth: 100
    },
    { id: 'date', label: 'Data', minWidth: 170, align: 'right' }
  ];

  const rows =
    data?.dataResult?.transactions?.map((item) =>
      createData(
        item.typeTransactions,
        moneyMask(item.value),
        item.type_method === 'DEBIT' ? 'Débito' : 'Crédito',
        formatDate(item.date)
      )
    ) ?? [];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: '16px',
        background: '#3A3A3A'
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 440,
          height: 370,
          background: '#3A3A3A',
          boxShadow: 'none!important',
          borderRadius: '16px'
        }}
      >
        <STable stickyHeader aria-label="sticky table">
          <SHead>
            <SRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 600,
                    background: '#3A3A3A',
                    color: '#939395'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </SRow>
          </SHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      const isValueOrType =
                        column.id === 'value' || column.id === 'type';

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            color: isValueOrType
                              ? row.type === 'Crédito'
                                ? 'green'
                                : 'red'
                              : '#f3f3f3f3'
                          }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </STable>

        {rows?.length === 0 && <BaseNotFount />}
      </TableContainer>

      <TablePagination
        sx={{
          color: '#fff'
        }}
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        labelRowsPerPage="Linhas por página"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
