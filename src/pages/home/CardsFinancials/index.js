import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { useGet } from 'services/requests/useGet'
import { useState } from 'react'
import { TablePagination } from 'components/atoms/tablePagination/tablePagination'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import imgNotFound from '../../../assets/NotFound.png'
import Text from 'components/atoms/BaseText/BaseText'
import Loading from 'components/atoms/loading/loading'

import CardInfoValues from './cardInfoValues'

const CardsFinancials = ({ search, searchOrder, searchStatus }) => {
  const navigate = useNavigate()

  const isDesktop = useMediaQuery({ minWidth: '2000px' })

  const INITIAL_STATE_FINANCIAL = {
    limit: isDesktop ? 10 : 4,
    page: 1,
    sort_field: 'id',
    sort_order: 'ASC',
    status: true
  }

  const [financialQuery, setFinancialQuery] = useState(INITIAL_STATE_FINANCIAL)

  if (financialQuery.status_check === '') delete financialQuery.status_check
  if (financialQuery.sort_order === '') delete financialQuery.sort_order
  if (financialQuery.search === '') delete financialQuery.search

  const {
    data: financial,
    loading,
    isValidating
  } = useGet('financialStatements', financialQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinancialQuery((state) => ({
        ...state,
        search: search
      }))
    }, 1200)

    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    setFinancialQuery((state) => ({
      ...state,
      sort_order: searchOrder,
      status_check: searchStatus
    }))
  }, [searchOrder, searchStatus])

  return (
    <Grid item container pl={2} mt={-2} justifyContent={'center'}>
      {financial?.dataResult?.length > 0 && (
        <Box
          sx={{
            minHeight: '385px',
            minWidth: '100%',
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            justifyContent: 'flex-start',
            '& > :not(style)': {
              margin: '10px',
              width: 180,
              height: 80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }
          }}
        >
          {financial?.dataResult?.map((financial) => (
            <CardInfoValues
              key={financial?.id}
              props={financial}
              onClick={() => navigate(`/home/info-financial/${financial?.id}`)}
            />
          ))}
        </Box>
      )}

      {financial?.dataResult?.length === 0 && (
        <Grid item p={10}>
          <Text fontSize={'28px'} center>
            FICHAS NÃO ENCONTRADA...{' '}
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

      {loading && (
        <Grid
          item
          container
          pl={2}
          mt={-2}
          md={6}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Loading color={'white'} />
        </Grid>
      )}

      {!isValidating &&
        !loading &&
        financial?.totalPages > 0 &&
        financial?.dataResult?.length > 0 && (
          <Grid item container pl={2} mt={-2}>
            <TablePagination
              sx={{
                '& .css-1chpzqh': {
                  color: '#F1F3F9!important'
                },
                '& .css-levciy-MuiTablePagination-displayedRows': {
                  color: '#F1F3F9!important'
                }
              }}
              data={financial}
              query={financialQuery}
              setQuery={setFinancialQuery}
            />
          </Grid>
        )}
    </Grid>
  )
}

export default CardsFinancials
