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

import InfoRow from './infoRow'
import Text from 'components/atoms/BaseText/BaseText'
import imgNotFound from '../../assets/trist-not-found-table.svg'
import Loading from 'components/atoms/loading/loading'
import ModalDeleteCart from './modalDeleteCart'
import ModalUpdateCart from './modalUpdateCart'

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

  const isDesktop = useMediaQuery({ maxWidth: '1120px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)

  const [cartId, setCartId] = useState(null)

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
                  active={query?.sort_field === 'cart_brand'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_brand')}
                >
                  {t('cart.table.label1')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'cart_models'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_models')}
                >
                  {t('cart.table.label2')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'cart_board'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_board')}
                >
                  {t('cart.table.label3')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'cart_color'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_color')}
                >
                  {t('cart.table.label4')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'cart_tara'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_tara')}
                >
                  {t('cart.table.label5')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'cart_bodywork'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_bodywork')}
                >
                  {t('cart.table.label6')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'cart_chassis'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_chassis')}
                >
                  {t('cart.table.label7')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === 'cart_year'}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort('cart_year')}
                >
                  {t('cart.table.label8')}
                </SLabel>
              </SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>
                {t('cart.table.label9')}
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
                    setCartId={setCartId}
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
            <TablePagination data={data} query={query} setQuery={setQuery} />
          )}

        {(loading || isFetching) && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading titulo={t('messages.loading')} />
          </Grid>
        )}

        {data?.dataResult?.length === 0 && !isFetching && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            p={5}
            sx={{ background: '#3A3A3A' }}
          >
            <Text fontSize={'28px'} center color={'#939395'}>
              {t('messages.result_not_found')}
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

        {error && (
          <Grid container justifyContent="center" alignItems="center" p={5}>
            <Text fontSize={'28px'} center>
              {t('messages.unknown_error').toUpperCase()}
            </Text>
          </Grid>
        )}
      </TableContainer>

      {showModalDelete && (
        <ModalDeleteCart
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
          props={cartId}
          mutate={mutate}
        />
      )}

      {showModalUpdate && (
        <ModalUpdateCart
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          props={cartId}
          mutate={mutate}
        />
      )}
    </>
  )
}

export default Table
