import React, { useState } from 'react'
import { Grid, Paper, TableContainer } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TablePagination } from 'components/atoms/tablePagination/tablePagination'
import { useMediaQuery } from 'react-responsive'
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel
} from 'components/atoms/BaseTable/BaseTable'
import { BaseError } from 'components/molecules/BaseError/BaseError'
import { BaseNotFount } from 'components/molecules/BaseNotFound/BaseNotFound'

import InfoRow from './infoRow'
import Loading from 'components/atoms/loading/loading'
import ModalDeleteTruck from './modal/modalDeleteTruck'
import ModalUpdateTruck from './modal/modalUpdateTruck'

const Table = ({
  data,
  query,
  setQuery,
  isFetching,
  mutate,
  error,
  loading
}) => {
  const { t } = useTranslation()

  const isDesktop = useMediaQuery({ maxWidth: '1250px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)

  const [truckId, setTruckId] = useState(null)

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === 'ASC' ? 'DESC' : 'ASC'}`
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
          borderRadius: '16px'
        }}
      >
        <STable>
          <SHead>
            <SRow>
              <SCell displaywidth={isDesktop ? 0 : 1}>Info</SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === 'truck_name_brand'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_name_brand')}
                >
                  {t('truck.table.label1')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'truck_models'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_models')}
                >
                  {t('truck.table.label2')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'truck_board'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_board')}
                >
                  {t('truck.table.label3')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'truck_color'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_color')}
                >
                  {t('truck.table.label4')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'truck_km'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_km')}
                >
                  {t('truck.table.label5')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'truck_chassis'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_chassis')}
                >
                  {t('truck.table.label6')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'truck_year'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('truck_year')}
                >
                  {t('truck.table.label7')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}></SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>
                {t('truck.table.label8')}
              </SCell>
            </SRow>
          </SHead>
          {!isFetching && data && data?.dataResult?.length > 0 && (
            <>
              <STableBody>
                {data.dataResult.map((item, index) => (
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

        {!isFetching &&
          data?.dataResult?.length > 0 &&
          data?.totalPages > 0 && (
            <Grid container justifyContent="center" alignItems="center">
              <TablePagination data={data} query={query} setQuery={setQuery} />
            </Grid>
          )}

        {(loading || isFetching) && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading titulo={t('messages.loading')} />
          </Grid>
        )}

        {data?.dataResult?.length === 0 && !isFetching && <BaseNotFount />}

        {error && <BaseError />}
      </TableContainer>

      {showModalDelete && (
        <ModalDeleteTruck
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
          props={truckId}
          mutate={mutate}
        />
      )}

      {showModalUpdate && (
        <ModalUpdateTruck
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          props={truckId}
          mutate={mutate}
        />
      )}
    </>
  )
}

export default Table
