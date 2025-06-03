import React from 'react';
import { Grid, Paper, TableContainer } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody
} from 'components/atoms/BaseTable/BaseTable';

import BaseError from 'components/molecules/BaseError/BaseError';
import BaseNotFound from 'components/molecules/BaseNotFound/BaseNotFound';
import RowDeposit from './rowDeposit';
import Loading from '@/components/atoms/BaseLoading/BaseLoading';

export const TableDeposit = ({ data, isFetching, mutate, error, loading }) => {
  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' });
  const isMobile = useMediaQuery({ maxWidth: '730px' });

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          background: '#3A3A3A',
          borderRadius: '16px'
        }}
      >
        <STable>
          <SHead>
            <SRow alternatingcolors={0}>
              <SCell displaywidth={isMobile ? 1 : 0}>Data</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Hora</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Local</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Pagador</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Preço Total</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Pagamento</SCell>
            </SRow>
          </SHead>
          {!isFetching &&
            data &&
            data?.dataResult?.depositMoney?.length > 0 && (
              <STableBody>
                {data?.dataResult?.depositMoney?.map((item, i) => (
                  <RowDeposit key={i} data={item} index={i} />
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
          {data?.dataResult?.depositMoney?.length === 0 && !isFetching && (
            <BaseNotFound />
          )}

          {error && <BaseError />}
        </Grid>
      </TableContainer>
    </>
  );
};
