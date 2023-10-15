import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Text from 'components/atoms/BaseText/BaseText'
import imgNotFound from '../../assets/trist-not-found-table.svg'
import TableRow from '@mui/material/TableRow'

import { Grid, TablePagination } from '@mui/material'
import { formatDate } from '../../utils/formatDate'
import { moneyMask } from 'utils/masks'

const columns = [
  { id: 'typeTransactions', label: 'Motivo', minWidth: 170 },
  { id: 'value', label: 'Valor', minWidth: 140 },
  {
    id: 'type',
    label: 'Tipo',
    minWidth: 100
  },
  { id: 'date', label: 'Data', minWidth: 170, align: 'right' }
]

function createData(typeTransactions, value, type, date) {
  return { typeTransactions, value, type, date }
}

export default function TableBankStatement({ data }) {
  const rows =
    data?.dataResult?.transactions?.map((item) =>
      createData(
        item.typeTransactions,
        moneyMask(item.value),
        item.type_method === 'DEBIT' ? 'Débito' : 'Crédito',
        formatDate(item.date)
      )
    ) ?? []

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, height: 370 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: '#CCD6EB',
                    fontWeight: 600
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            color: `${row.type === 'Crédito' ? 'green' : 'red'}`
                          }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>

        {rows?.length === 0 && (
          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            justifyContent={'center'}
            alignItems={'center'}
            height={'300px'}
          >
            <Text fontSize={'28px'} center>
              {'RESULTADO NÃO ENCONTRADO...'}
              <img
                src={imgNotFound}
                alt="img"
                width={'40px'}
                style={{
                  verticalAlign: 'bottom',
                  marginLeft: '24px'
                }}
              />
            </Text>
          </Grid>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
