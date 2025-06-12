import React, { useState } from 'react';
import { Grid, Paper, TableContainer } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TablePagination } from 'components/atoms/tablePagination/tablePagination';
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel,
} from 'components/atoms/BaseTable/BaseTable';

import BaseNotFount from 'components/molecules/BaseNotFound/BaseNotFound';
import Loading from '@/components/atoms/BaseLoading/BaseLoading';
import InfoRow from './infoRow';
import BaseModalDeleteTruck from 'components/molecules/BaseModalDeleteTruck/BaseModalDeleteTruck';
import BaseModalUpdateTruck from 'components/molecules/BaseModalUpdateTruck/BaseModalUpdateTruck';

const Table = ({ data, query, setQuery, loading }) => {
  const { t } = useTranslation();

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [truckId, setTruckId] = useState(null);

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === 'ASC' ? 'DESC' : 'ASC'}`,
    }));
    return;
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          background: '#3A3A3A',
          boxShadow: 'none!important',
          borderRadius: '16px',
        }}
      >
        <STable>
          <SHead>
            <SRow>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'truck_name_brand'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_name_brand')}
                >
                  {t('truck.table.label1')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'truck_models'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_models')}
                >
                  {t('truck.table.label2')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'truck_board'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_board')}
                >
                  {t('truck.table.label3')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'truck_color'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_color')}
                >
                  {t('truck.table.label4')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'truck_km'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_km')}
                >
                  {t('truck.table.label5')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'truck_chassis'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_chassis')}
                >
                  {t('truck.table.label6')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'truck_year'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_year')}
                >
                  {t('truck.table.label7')}
                </SLabel>
              </SCell>
              <SCell></SCell>
              <SCell>{t('truck.table.label8')}</SCell>
            </SRow>
          </SHead>
          {!loading && data && data?.docs?.length > 0 && (
            <>
              <STableBody>
                {data?.docs?.map((item, index) => (
                  <InfoRow
                    key={item.id}
                    data={item}
                    index={index}
                    setTruckId={setTruckId}
                    setShowModalDelete={setShowModalDelete}
                    setShowModalUpdate={setShowModalUpdate}
                  />
                ))}
              </STableBody>
            </>
          )}
        </STable>

        {!loading && data?.docs?.length > 0 && data?.totalPages > 0 && (
          <Grid container justifyContent="center" alignItems="center">
            <TablePagination data={data} query={query} setQuery={setQuery} />
          </Grid>
        )}

        {loading && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading titulo={t('messages.loading')} />
          </Grid>
        )}

        {data?.docs?.length === 0 && !loading && <BaseNotFount />}
      </TableContainer>

      {showModalDelete && (
        <BaseModalDeleteTruck
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
          data={truckId}
        />
      )}

      {showModalUpdate && (
        <BaseModalUpdateTruck
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          data={truckId}
        />
      )}
    </>
  );
};

export default Table;
