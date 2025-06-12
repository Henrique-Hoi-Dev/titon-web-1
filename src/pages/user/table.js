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

import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseModalDeleteUser from 'components/molecules/BaseModalDeleteUser/BaseModalDeleteUser';
import BaseModalUpdateUser from 'components/molecules/BaseModalUpdateUser/BaseModalUpdateUser';
import BaseNotFound from '@/components/molecules/BaseNotFound/BaseNotFound';
import InfoRow from './infoRow';

const Table = ({ data, query, setQuery, loading }) => {
  const { t } = useTranslation();

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [userId, setUserId] = useState(null);

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
                  active={query?.sort_field === 'id'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('id')}
                >
                  {t('modal.id')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'name'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('name')}
                >
                  {t('modal.user')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'email'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('email')}
                >
                  {t('modal.email')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'type_position'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('type_position')}
                >
                  {t('modal.add_user.type_user')}
                </SLabel>
              </SCell>
              <SCell>{t('button.actions')}</SCell>
            </SRow>
          </SHead>
          {!loading && data && data?.docs?.length > 0 && (
            <STableBody>
              {data.docs.map((item, index) => (
                <InfoRow
                  key={item.id}
                  data={item}
                  index={index}
                  setUserId={setUserId}
                  setShowModalDelete={setShowModalDelete}
                  setShowModalUpdate={setShowModalUpdate}
                />
              ))}
            </STableBody>
          )}
        </STable>

        {data?.docs?.length === 0 && !loading && <BaseNotFound />}
        {loading && <BaseLoading titulo={t('messages.loading')} />}

        {!loading && data?.totalPages > 0 && (
          <TablePagination data={data} query={query} setQuery={setQuery} />
        )}
      </TableContainer>

      {showModalDelete && (
        <BaseModalDeleteUser
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
          data={userId}
        />
      )}

      {showModalUpdate && (
        <BaseModalUpdateUser
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          data={userId}
        />
      )}
    </>
  );
};

export default Table;
