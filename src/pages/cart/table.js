import React, { useState } from 'react';
import { Paper, TableContainer } from '@mui/material';
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

import InfoRow from './infoRow';
import BaseNotFound from 'components/molecules/BaseNotFound/BaseNotFound';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseModalDeleteCart from 'components/molecules/BaseModalDeleteCart/BaseModalDeleteCart';
import BaseModalUpdateCart from 'components/molecules/BaseModalUpdateCart/BaseModalUpdateCart';

const Table = ({ data, query, setQuery, loading }) => {
  const { t } = useTranslation();

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [cartId, setCartId] = useState(null);

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
                  active={query?.sort_field === 'cart_brand'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_brand')}
                >
                  {t('cart.table.label1')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'cart_models'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_models')}
                >
                  {t('cart.table.label2')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'cart_board'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_board')}
                >
                  {t('cart.table.label3')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'cart_color'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_color')}
                >
                  {t('cart.table.label4')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'cart_tara'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_tara')}
                >
                  {t('cart.table.label5')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'cart_bodywork'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_bodywork')}
                >
                  {t('cart.table.label6')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'cart_chassis'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_chassis')}
                >
                  {t('cart.table.label7')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'cart_year'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_year')}
                >
                  {t('cart.table.label8')}
                </SLabel>
              </SCell>
              <SCell></SCell>

              <SCell>{t('cart.table.label9')}</SCell>
            </SRow>
          </SHead>
          {!loading && data && data?.docs?.length > 0 && (
            <>
              <STableBody>
                {data.docs.map((item, index) => (
                  <InfoRow
                    key={item.id}
                    data={item}
                    index={index}
                    setCartId={setCartId}
                    setShowModalDelete={setShowModalDelete}
                    setShowModalUpdate={setShowModalUpdate}
                  />
                ))}
              </STableBody>
            </>
          )}
        </STable>

        {data?.docs?.length > 0 && data?.totalPages > 0 && (
          <TablePagination data={data} query={query} setQuery={setQuery} />
        )}

        {loading && <BaseLoading titulo={t('messages.loading')} />}

        {data?.docs?.length === 0 && !loading && <BaseNotFound />}
      </TableContainer>

      {showModalDelete && (
        <BaseModalDeleteCart
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
          data={cartId}
        />
      )}

      {showModalUpdate && (
        <BaseModalUpdateCart
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          data={cartId}
        />
      )}
    </>
  );
};

export default Table;
