import React from 'react'
import { Grid, Paper, TableContainer } from '@mui/material'
import { useMediaQuery } from 'react-responsive'
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody
} from 'components/atoms/BaseTable/BaseTable'

import RowExpense from './rowExpense'
import Text from 'components/atoms/BaseText/BaseText'
import Loading from 'components/atoms/loading/loading'
import imgNotFound from '../../../assets/trist-not-found-table.svg'

export const TableExpense = ({ data, isFetching, mutate, error, loading }) => {
  // const isDesktop = useMediaQuery({ maxWidth: "1400px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  return (
    <>
      <TableContainer component={Paper}>
        <STable>
          <SHead>
            <SRow alternatingcolors={0}>
              <SCell displaywidth={isMobile ? 1 : 0}>Data</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Hora</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Local</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Descrição</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Preço Total</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Pagamento</SCell>
            </SRow>
          </SHead>
          {!isFetching &&
            data &&
            data?.dataResult?.travelExpenses?.length > 0 && (
              <STableBody>
                {data?.dataResult?.travelExpenses?.map((item, i) => (
                  <RowExpense key={i} data={item} index={i} />
                ))}
              </STableBody>
            )}
        </STable>

        {(loading || isFetching) && (
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <Loading />
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
          {data?.dataResult?.travelExpenses?.length === 0 && !isFetching && (
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              pt={5}
            >
              <Text fontSize={'28px'} center>
                RESULTADO NÃO ENCONTRADO...{' '}
                <img
                  src={imgNotFound}
                  alt="img"
                  width={'30px'}
                  style={{
                    verticalAlign: 'unset',
                    marginLeft: '20px'
                  }}
                />
              </Text>
            </Grid>
          )}

          {error && (
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              pt={5}
            >
              <Text fontSize={'28px'} center>
                ERRO
              </Text>
            </Grid>
          )}
        </Grid>
      </TableContainer>
    </>
  )
}
