import React, { useEffect, useRef, useState } from 'react'
import { Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getDriversRequest } from 'store/modules/driver/driverSlice'
import { IconAdd } from 'assets/icons/icons'
import { useTranslation } from 'react-i18next'

import Table from './table'
import BaseInputSearches from '@/components/atoms/BaseInputSearches/BaseInputSearches'
import BaseModalAddDriver from '../../components/molecules/BaseModalAddDriver/BaseModalAddDriver'
import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'
import initialStateQuery from 'utils/initialStateQuery'

const Driver = () => {
  const { t } = useTranslation()
  const [showModalDriver, setShowModalDriver] = useState(false)
  const dispatch = useDispatch()
  const {
    data: drivers,
    loadingGet: loading,
    errorGet: error,
  } = useSelector((state) => state.driver)

  const [driverQuery, setDriverQuery] = useState(initialStateQuery.INITIAL_STATE_DRIVER)
  const [search, setSearch] = useState('')
  const [shouldRefresh, setShouldRefresh] = useState(false)

  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      dispatch(getDriversRequest(driverQuery))
      return
    }

    const timer = setTimeout(() => {
      if (shouldRefresh || search) {
        dispatch(
          getDriversRequest({
            ...driverQuery,
            search: search,
          })
        )
        setShouldRefresh(false)
      }
    }, 1200)

    return () => clearTimeout(timer)
  }, [dispatch, search, shouldRefresh, driverQuery])

  const handleModalClose = () => {
    setShowModalDriver(false)
    setShouldRefresh(true)
  }

  return (
    <Grid
      container
      padding={1}
      spacing={2}
      minHeight="88vh"
      justifyContent="center"
      alignContent={'flex-start'}
    >
      <Grid item container xs={12} md={12} lg={12} flexWrap="nowrap" justifyContent="flex-end">
        <Grid item container pl={2} mr={4} justifyContent={'flex-end'}>
          <BaseButton
            onClick={() => setShowModalDriver(true)}
            background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
            sx={{
              fontSize: '14px',
              color: 'white',
              minWidth: '248px',
              marginRight: '15px',
            }}
          >
            {t('button.add_new_driver')} <IconAdd sx={{ mb: '4px', ml: '10px' }} />
          </BaseButton>

          <BaseInputSearches
            searches
            searchesType="searches"
            styles={{ minWidth: '350px' }}
            placeholder={t('placeholder.name_driver')}
            onChange={(ev) => setSearch(ev.target.value)}
          />
        </Grid>
      </Grid>

      <BaseContentHeader>
        <BaseTitle>{t('title.driver')}</BaseTitle>
      </BaseContentHeader>

      <Grid item container mb={5} alignItems="flex-start" justifyContent="flex-start">
        <Grid item container pl={2} mr={4} mt={5} mb={3} justifyContent={'center'}>
          <Table
            data={drivers}
            query={driverQuery}
            setQuery={setDriverQuery}
            error={error}
            loading={loading}
          />
        </Grid>
      </Grid>

      {showModalDriver && (
        <BaseModalAddDriver setShowModal={handleModalClose} showModal={showModalDriver} />
      )}
    </Grid>
  )
}

export default Driver
