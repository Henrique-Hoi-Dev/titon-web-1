import React, { useState } from 'react'
import { Grid, Paper, TableContainer } from '@mui/material'
import { useMediaQuery } from 'react-responsive'
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody
} from 'components/atoms/BaseTable/BaseTable'
import { ModalAction } from '../../components/organisms/ModalAction'
import { useTranslation } from 'react-i18next'
import { BaseNotFount } from 'components/molecules/BaseNotFound/BaseNotFound'
import { BaseError } from 'components/molecules/BaseError/BaseError'

import InfoRow from './infoRow'
import Loading from 'components/atoms/loading/loading'

const Table = ({ data, isFetching, mutate, error, loading }) => {
  const { t } = useTranslation()

  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  const [showModalAction, setShowModalAction] = useState(false)

  const [checkId, setCheckId] = useState()

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          background: '#3A3A3A',
          borderRadius: '16px',
          boxShadow: 'none!important'
        }}
      >
        <STable>
          <SHead>
            <SRow>
              <SCell displaywidth={isMobile ? 1 : 0}>
                {t('info_financial.table.status')}
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                {t('info_financial.destiny')}
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                {t('info_financial.table.current_location')}
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                {t('info_financial.table.creation_date')}
              </SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>
                {t('info_financial.table.gross_value')}
              </SCell>
            </SRow>
          </SHead>
          {!isFetching && data && data?.dataResult?.freight?.length > 0 && (
            <STableBody>
              {data?.dataResult?.freight?.map((item, i) => (
                <InfoRow
                  key={i}
                  data={item}
                  index={i}
                  setCheckId={setCheckId}
                  setShowModalAction={setShowModalAction}
                />
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
          {data?.dataResult?.freight?.length === 0 && !isFetching && (
            <BaseNotFount />
          )}

          {error && <BaseError />}
        </Grid>
      </TableContainer>

      <ModalAction
        setShowModal={setShowModalAction}
        showModal={showModalAction}
        checkId={checkId}
        mutate={mutate}
      />
    </>
  )
}

export default Table
