import { useEffect, useRef, useState } from 'react'
import { Grid } from '@mui/material'
import { useGet } from 'services/requests/useGet'
import { IconAdd } from 'assets/icons/icons'
import { InputSearches } from 'components/atoms/input/inputSearches/input'
import { useTranslation } from 'react-i18next'

import Table from './table'
import ModalAddDriver from './modal/modalAddDriver'
import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'

const Driver = () => {
  const [showModalDriver, setShowModalDriver] = useState(false)
  const { t } = useTranslation()

  const INITIAL_STATE_DRIVER = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: 'ASC'
  }

  const [driverQuery, setDriverQuery] = useState(INITIAL_STATE_DRIVER)
  const [search, setSearch] = useState('')

  const isMounted = useRef(false)

  const {
    data: drivers,
    error: driversError,
    isFetching: driversIsFetching,
    loading,
    mutate
  } = useGet('/drivers', driverQuery)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    const timer = setTimeout(() => {
      setDriverQuery((state) => ({
        ...state,
        search: search
      }))
    }, 1200)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <Grid
      container
      padding={1}
      spacing={2}
      minHeight="88vh"
      justifyContent="center"
      alignContent={'flex-start'}
    >
      <Grid item container pl={2} mr={4} justifyContent={'flex-end'}>
        <BaseButton
          onClick={() => setShowModalDriver(true)}
          background={
            'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
          }
          sx={{
            fontSize: '14px',
            color: 'white',
            width: '228px',
            height: '40px',
            marginRight: '15px'
          }}
        >
          {t('driver.button.title')} <IconAdd sx={{ mt: -0.7 }} />
        </BaseButton>
        <InputSearches
          searches
          searchesType={'searches'}
          styles={{ minWidth: '350px' }}
          placeholder={t('placeholder.name_driver')}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Grid>

      <BaseContentHeader>
        <BaseTitle>{t('driver.title')}</BaseTitle>
      </BaseContentHeader>

      <Grid
        item
        container
        mb={5}
        minHeight={'100%'}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Grid item container mr={4} mt={5} mb={3} justifyContent={'center'}>
          <Table
            data={drivers}
            query={driverQuery}
            setQuery={setDriverQuery}
            isFetching={driversIsFetching}
            error={driversError}
            loading={loading}
            mutate={mutate}
          />
        </Grid>
      </Grid>

      <ModalAddDriver
        setShowModal={setShowModalDriver}
        showModal={showModalDriver}
        mutate={mutate}
      />
    </Grid>
  )
}

export default Driver
