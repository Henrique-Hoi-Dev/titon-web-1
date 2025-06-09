import React, { useState } from 'react';
import { Paper, TableContainer } from '@mui/material';
import { TablePagination } from 'components/atoms/tablePagination/tablePagination';
import { useTranslation } from 'react-i18next';
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel
} from 'components/atoms/BaseTable/BaseTable';

import InfoRow from './infoRow';
import BaseNotFount from 'components/molecules/BaseNotFound/BaseNotFound';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseModalDeleteFinancial from '@/components/molecules/BaseModalDeleteFinancial/BaseModalDeleteFinancial';
import BaseModalUpdateFinancial from '@/components/molecules/BaseModalUpdateFinancial/BaseModalUpdateFinancial';

const Table = ({ data, query, setQuery, loading }) => {
  const { t } = useTranslation();

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
                  {t('modal.driver')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'truck_models'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_models')}
                >
                  {t('modal.truck')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'cart_models'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_models')}
                >
                  {t('modal.cart')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'start_date'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('start_date')}
                >
                  {t('modal.start_date')}
                </SLabel>
              </SCell>
              <SCell>{t('modal.avatar')}</SCell>
              <SCell>{t('button.actions')}</SCell>
            </SRow>
          </SHead>
          {!loading && data && data.docs?.length > 0 && (
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

        {loading && <BaseLoading />}

        {data?.docs?.length === 0 && !loading && <BaseNotFount />}

        {!loading && data?.docs?.length > 0 && (
          <TablePagination data={data} query={query} setQuery={setQuery} />
        )}
      </TableContainer>

      {showModalDelete && (
        <BaseModalDeleteFinancial
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
          id={financialId}
        />
      )}

      {showModalUpdate && (
        <BaseModalUpdateFinancial
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          financialId={financialId}
        />
      )}
    </>
  );
};

export default Table;
