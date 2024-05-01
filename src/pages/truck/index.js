import { useEffect, useRef, useState } from 'react'
import { Grid } from '@mui/material'
import { useGet } from 'services/requests/useGet'
import { IconAdd } from 'assets/icons/icons'
import { InputSearches } from 'components/atoms/input/inputSearches/input'
import { useTranslation } from 'react-i18next'

import Table from './table'
import ModalAddTruck from './modalAddTruck'
import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'

export const Truck = () => {
  const [showModalTruck, setShowModalTruck] = useState(false)
  const { t } = useTranslation()

  const INITIAL_STATE_USER = {
    limit: 7,
    page: 1,
    sort_field: 'id',
    sort_order: 'ASC'
  }

  const [truckQuery, setTruckQuery] = useState(INITIAL_STATE_USER)
  const [search, setSearch] = useState('')

  const isMounted = useRef(false)

  const {
    data: trucks,
    error: trucksError,
    isFetching: trucksIsFetching,
    loading,
    mutate
  } = useGet('trucks', truckQuery)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    const timer = setTimeout(() => {
      setTruckQuery((state) => ({
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
      <Grid item container pl={2} pb={7} mr={4} justifyContent={'flex-end'}>
        <BaseButton
          onClick={() => setShowModalTruck(true)}
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
          {t('truck.button.title')}
          <IconAdd sx={{ mt: -0.7 }} />
        </BaseButton>
        <InputSearches
          searches
          searchesType={'searches'}
          styles={{ minWidth: '350px' }}
          placeholder={t('placeholder.search_truck')}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Grid>

      <BaseContentHeader>
        <BaseTitle>{t('truck.title')}</BaseTitle>
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
            data={trucks}
            query={truckQuery}
            setQuery={setTruckQuery}
            isFetching={trucksIsFetching}
            error={trucksError}
            loading={loading}
            mutate={mutate}
          />
        </Grid>
      </Grid>

      <ModalAddTruck
        setShowModal={setShowModalTruck}
        showModal={showModalTruck}
        mutate={mutate}
      />
    </Grid>
  )
}
