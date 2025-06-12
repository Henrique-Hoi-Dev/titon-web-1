import React, { useState } from 'react'
import { Grid, Paper, TableContainer } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TablePagination } from 'components/atoms/tablePagination/tablePagination'
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel,
} from 'components/atoms/BaseTable/BaseTable'
import BaseNotFound from 'components/molecules/BaseNotFound/BaseNotFound'

import InfoRow from './infoRow'
import Loading from '@/components/atoms/BaseLoading/BaseLoading'
import BaseModalDeleteDriver from '../../components/molecules/BaseModalDeleteDriver/BaseModalDeleteDriver'
import BaseModalUpdateDriver from '../../components/molecules/BaseModalUpdateDriver/BaseModalUpdateDriver'
import BaseModalCreditDriver from '../../components/molecules/BaseModalCreditDriver/BaseModalCreditDriver'

const Table = ({ data, query, setQuery, loading }) => {
  const { t } = useTranslation()

  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [showModalCredit, setShowModalCredit] = useState(false)

  const [driverId, setDriveId] = useState(null)

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === 'ASC' ? 'DESC' : 'ASC'}`,
    }))
    return
  }

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
                  {t('driver.table.label1')}
                </SLabel>
              </SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'name'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('name')}
                >
                  {t('driver.table.label2')}
                </SLabel>
              </SCell>
              <SCell>{t('driver.table.label3')}</SCell>
              <SCell>{t('driver.table.label4')}</SCell>
              <SCell>{t('driver.table.label5')}</SCell>
              <SCell> {t('driver.table.label6')}</SCell>
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
                    setDriveId={setDriveId}
                    setShowModalDelete={setShowModalDelete}
                    setShowModalUpdate={setShowModalUpdate}
                    setShowModalCredit={setShowModalCredit}
                  />
                ))}
              </STableBody>
            </>
          )}
        </STable>

        {!loading && data?.docs?.length > 0 && data?.totalPages > 0 && (
          <TablePagination data={data} query={query} setQuery={setQuery} />
        )}

        {loading && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading titulo={t('messages.loading')} />
          </Grid>
        )}

        {data?.docs?.length === 0 && !loading && <BaseNotFound />}
      </TableContainer>

      {showModalDelete && (
        <BaseModalDeleteDriver
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
          data={driverId}
        />
      )}

      {showModalUpdate && (
        <BaseModalUpdateDriver
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          data={driverId}
        />
      )}

      {showModalCredit && (
        <BaseModalCreditDriver
          setShowModal={setShowModalCredit}
          showModal={showModalCredit}
          data={driverId}
        />
      )}
    </>
  )
}

export default Table
