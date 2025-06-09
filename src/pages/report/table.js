import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Paper, TableContainer, Checkbox } from '@mui/material'
import { SCell, SHead, SRow, STable, STableBody } from 'components/atoms/BaseTable/BaseTable'
import { TablePagination } from 'components/atoms/tablePagination/tablePagination'
import { formatDate } from 'utils/formatDate'
import Loading from '@/components/atoms/BaseLoading/BaseLoading'
import Text from 'components/atoms/BaseText/BaseText'
import imgNotFound from '../../assets/NotFound.png'

const TableReport = ({ data, query, setQuery, isFetching, loading }) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState([])
  const [visibleRows, setVisibleRows] = useState(null)

  const rows = useMemo(
    () =>
      data?.dataResult?.map((item) => ({
        id: item?.id,
        driver: item?.driver_name,
        date: formatDate(item?.start_date),
        truck: item?.truck_models,
        cart: item?.cart_models,
      })) ?? [],
    [data]
  )

  useEffect(() => {
    setVisibleRows(rows)
  }, [data, rows])

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? rows.map((n) => n.id) : [])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ background: 'transparent', boxShadow: 'none!important' }}
    >
      <STable sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <SHead>
          <SRow>
            <SCell>
              <Checkbox
                color="primary"
                indeterminate={selected.length > 0 && selected.length < rows.length}
                checked={rows.length > 0 && selected.length === rows.length}
                onChange={handleSelectAllClick}
              />
            </SCell>
            <SCell>{t('modal.id')}</SCell>
            <SCell>{t('modal.driver')}</SCell>
            <SCell>{t('modal.date')}</SCell>
            <SCell>{t('modal.truck')}</SCell>
            <SCell>{t('modal.cart')}</SCell>
          </SRow>
        </SHead>
        <STableBody>
          {visibleRows?.map((row, index) => {
            const isItemSelected = selected.indexOf(row.id) !== -1
            const labelId = `enhanced-table-checkbox-${index}`

            return (
              <SRow
                hover
                onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
                alternatingcolors={index}
              >
                <SCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </SCell>
                <SCell component="th" id={labelId} scope="row" padding="none">
                  {row.id}
                </SCell>
                <SCell align="right">{row.driver}</SCell>
                <SCell align="right">{row.date}</SCell>
                <SCell align="right">{row.truck}</SCell>
                <SCell align="right">{row.cart}</SCell>
              </SRow>
            )
          })}
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
          container
          justifyContent="center"
          alignItems="center"
          p={5}
          sx={{ background: '#3A3A3A' }}
        >
          <Text fontSize={'28px'} center color={'#939395'}>
            {t('messages.result_not_found')}
            <img
              src={imgNotFound}
              alt="img"
              width={'60px'}
              style={{
                verticalAlign: 'middle',
                marginLeft: '24px',
              }}
            />
          </Text>
        </Grid>
      )}
    </TableContainer>
  )
}

export default TableReport
