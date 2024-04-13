import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { IconAdd } from 'assets/icons/icons'
import { InputSearches } from 'components/atoms/input/inputSearches/input'
import { useTranslation } from 'react-i18next'

import BaseButton from 'components/atoms/BaseButton/BaseButton'
import Graphic from 'components/molecules/graphic/graphic'

import SubMenuFilter from './subMenuFilter'
import CardsFinancial from './CardsFinancials'
import ModalAddFinancial from './modalAddFinancial'

const Home = () => {
  const [showModalFicha, setShowModalFicha] = useState(false)
  const { t } = useTranslation()

  const [search, setSearch] = useState('')
  const [searchOrder, setSearchOrder] = useState('')
  const [searchStatus, setSearchStatus] = useState('')

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        minHeight="88vh"
        padding={1}
        spacing={2}
        alignContent={'flex-start'}
      >
        <Grid item container pl={2} mr={4} justifyContent={'space-between'}>
          <Grid
            item
            container
            xs={4}
            md={4}
            lg={4}
            mt={0.6}
            justifyContent={'flex-start'}
          >
            <SubMenuFilter
              setSearchOrder={setSearchOrder}
              setSearchStatus={setSearchStatus}
            />
          </Grid>

          <Grid
            item
            container
            xs={6}
            md={6}
            lg={6}
            flexWrap={'nowrap'}
            justifyContent={'flex-end'}
          >
            <BaseButton
              onClick={() => setShowModalFicha(true)}
              background={
                'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
              }
              sx={{
                fontSize: '14px',
                color: 'white',
                minWidth: '248px',
                marginRight: '15px'
              }}
            >
              {t('button.add_new_listing')}{' '}
              <IconAdd sx={{ mb: '4px', ml: '10px' }} />
            </BaseButton>

            <InputSearches
              searches
              searchesType={'searches'}
              styles={{ minWidth: '350px' }}
              placeholder={'Nome, placa...'}
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </Grid>
        </Grid>

        {/* cards das fichas dos caminhao */}
        <Grid
          item
          container
          spacing={2}
          mb={1}
          mt={2}
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{ color: '#fff', borderBottom: '1px solid #F1F3F9' }}
        >
          <CardsFinancial
            search={search}
            searchOrder={searchOrder}
            searchStatus={searchStatus}
          />
        </Grid>

        {/* modulo grafico  */}
        <Grid item container height={'430px'}>
          <Graphic />
        </Grid>
      </Grid>

      <ModalAddFinancial
        showModal={showModalFicha}
        setShowModal={setShowModalFicha}
      />
    </>
  )
}

export default Home
