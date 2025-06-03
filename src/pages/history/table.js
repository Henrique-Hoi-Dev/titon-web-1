import React, { useState } from 'react';
import { Grid, Paper, TableContainer } from '@mui/material';
import { TablePagination } from 'components/atoms/tablePagination/tablePagination';
import { useMediaQuery } from 'react-responsive';
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel
} from 'components/atoms/BaseTable/BaseTable';

import BaseNotFount from 'components/molecules/BaseNotFound/BaseNotFound';
import BaseError from 'components/molecules/BaseError/BaseError';
import InfoRow from './infoRow';
import Loading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseModalDeleteFinancial from '@/components/molecules/BaseModalDeleteFinancial/BaseModalDeleteFinancial';
import BaseModalUpdateFinancial from '@/components/molecules/BaseModalUpdateFinancial/BaseModalUpdateFinancial';

const Table = ({
  data,
  query,
  setQuery,
  isFetching,
  mutate,
  error,
  loading
}) => {
  const isDesktop = useMediaQuery({ maxWidth: '1250px' });
  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' });
  const isMobile = useMediaQuery({ maxWidth: '730px' });

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [financialId, setFinancialId] = useState(null);

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === 'ASC' ? 'DESC' : 'ASC'}`
    }));
    return;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <STable>
          <SHead>
            <SRow>
              <SCell>Info</SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'id'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('id')}
                >
                  Motorista
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'truck_models'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_models')}
                >
                  Caminhão
                </SLabel>
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'cart_models'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_models')}
                >
                  Carreta
                </SLabel>
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'start_date'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('start_date')}
                >
                  Inici da Ficha
                </SLabel>
              </SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>Avatar</SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>Ações</SCell>
            </SRow>
          </SHead>
          {!isFetching && data && data.docs?.length > 0 && (
            <>
              <STableBody>
                {data?.docs.map((item, index) => (
                  <InfoRow
                    key={item.id}
                    data={item}
                    index={index}
                    setFinancialId={setFinancialId}
                    setShowModalDelete={setShowModalDelete}
                    setShowModalUpdate={setShowModalUpdate}
                  />
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
          p={'18px'}
          alignItems="center"
          flexWrap="nowrap"
          justifyContent="center"
        >
          {data?.dataResult?.length === 0 && !isFetching && <BaseNotFount />}

          {error && <BaseError />}
        </Grid>

        {!isFetching && data?.dataResult?.length > 0 && (
          <TablePagination data={data} query={query} setQuery={setQuery} />
        )}
      </TableContainer>

      {showModalDelete && (
        <BaseModalDeleteFinancial
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
          id={financialId}
          mutate={mutate}
        />
      )}

      {showModalUpdate && (
        <BaseModalUpdateFinancial
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          financialId={financialId}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default Table;
