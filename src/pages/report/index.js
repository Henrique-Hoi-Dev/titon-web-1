import { useEffect, useState } from 'react'
import { useGet } from 'services/requests/useGet'
import { Grid } from '@mui/material'
import { InputSearches } from 'components/atoms/input/inputSearches/input'
import { IconAdd } from 'assets/icons/icons'
import { useTranslation } from 'react-i18next'

import TableCheck from './table'
import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'

export const Report = () => {
  const [showModalReport, setShowModalReport] = useState(false)
  const { t } = useTranslation()

  const INITIAL_STATE_FINANCIAL = {
    limit: 10,
    page: 1,
    sort_field: 'id',
    sort_order: 'ASC',
    status: false
  }

  const [financialQuery, setFinancialQuery] = useState(INITIAL_STATE_FINANCIAL)
  const [search, setSearch] = useState('')

  const {
    data: financials,
    error: financialsError,
    isFetching: financialIsFetching,
    loading,
    mutate
  } = useGet('financialStatements', financialQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinancialQuery((state) => ({
        ...state,
        search: search
      }))
    }, 1200)

    return () => clearTimeout(timer)
  }, [search])

  return (
    <Grid
      item
      container
      padding={1}
      spacing={2}
      minHeight="88vh"
      justifyContent="center"
      alignContent={'flex-start'}
    >
      <Grid
        item
        container
        pl={2}
        pb={7}
        mr={4}
        mt={-6.5}
        justifyContent={'flex-end'}
      >
        <BaseButton
          onClick={() => setShowModalReport(true)}
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
          {t('report.button.title')} <IconAdd sx={{ mt: -0.7 }} />
        </BaseButton>
        <InputSearches
          searches
          searchesType={'searches'}
          styles={{ minWidth: '350px' }}
          placeholder={'Nome, placa...'}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Grid>

      <BaseContentHeader>
        <BaseTitle>{t('report.title')}</BaseTitle>
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
          <TableCheck
            data={financials}
            query={financialQuery}
            setQuery={setFinancialQuery}
            isFetching={financialIsFetching}
            error={financialsError}
            loading={loading}
            mutate={mutate}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
