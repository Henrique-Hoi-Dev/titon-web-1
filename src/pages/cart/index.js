import React, { useEffect, useRef, useState } from 'react'
import { Grid } from '@mui/material'
import { IconAdd } from 'assets/icons/icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getCartsRequest } from 'store/modules/cart/cartSlice'

import Table from './table'
import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseInputSearches from '@/components/atoms/BaseInputSearches/BaseInputSearches'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'
import BaseModalAddCart from 'components/molecules/BaseModalAddCart/BaseModalAddCart'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import initialStateQuery from '@/utils/initialStateQuery'

const Cart = () => {
  const [showModalCart, setShowModalCart] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { data: carts, loadingGet: loading, errorGet: error } = useSelector((state) => state.cart)

  const [cardQuery, setCardQuery] = useState(initialStateQuery.INITIAL_STATE_CART)
  const [search, setSearch] = useState('')
  const [shouldRefresh, setShouldRefresh] = useState(false)

  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      dispatch(getCartsRequest(cardQuery))
      return
    }

    const timer = setTimeout(() => {
      if (shouldRefresh || search) {
        dispatch(
          getCartsRequest({
            ...cardQuery,
            search: search,
          })
        )
        setShouldRefresh(false)
      }
    }, 1200)

    return () => clearTimeout(timer)
  }, [dispatch, search, shouldRefresh, cardQuery])

  const handleModalClose = () => {
    setShowModalCart(false)
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
      <Grid item container pl={2} mr={4} justifyContent={'flex-end'}>
        <BaseButton
          onClick={() => setShowModalCart(true)}
          background={'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'}
          sx={{
            fontSize: '14px',
            color: 'white',
            minWidth: '248px',
            marginRight: '15px',
          }}
        >
          {t('button.add_new_cart')} <IconAdd sx={{ mb: '4px', ml: '10px' }} />
        </BaseButton>
        <BaseInputSearches
          searches
          searchesType={'searches'}
          styles={{ minWidth: '350px' }}
          placeholder={t('placeholder.search_cart')}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Grid>

      <BaseContentHeader>
        <BaseTitle>{t('cart.title')}</BaseTitle>
      </BaseContentHeader>

      <Grid item container mb={5} alignItems="flex-start" justifyContent="flex-start">
        <Grid item container pl={2} mr={4} mt={5} mb={3} justifyContent={'center'}>
          <Table
            data={carts}
            query={cardQuery}
            setQuery={setCardQuery}
            error={error}
            loading={loading}
          />
        </Grid>
      </Grid>

      {showModalCart && (
        <BaseModalAddCart setShowModal={handleModalClose} showModal={showModalCart} />
      )}
    </Grid>
  )
}

export default Cart
