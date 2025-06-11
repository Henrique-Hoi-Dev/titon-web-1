import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { zonedTimeToUtc } from 'date-fns-tz'
import {
  createFinancialRequest,
  getFinancialsRequest,
} from 'store/modules/financial/financialSlice'
import { getDriversSelectRequest } from 'store/modules/driver/driverSlice'
import { getTrucksSelectRequest } from 'store/modules/truck/truckSlice'
import { getCartsSelectRequest } from 'store/modules/cart/cartSlice'

import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseModal from 'components/molecules/BaseModal/BaseModal'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'
import BaseText from 'components/atoms/BaseText/BaseText'
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect'
import initialStateQuery from 'utils/initialStateQuery'

const BaseModalAddFinancial = ({ showModal, setShowModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { loadingCreate: loading, successCreate } = useSelector((state) => state.financial)

  const { selectOptions: drivers } = useSelector((state) => state.driver)
  const { selectOptions: trucks } = useSelector((state) => state.truck)
  const { selectOptions: carts } = useSelector((state) => state.cart)

  const saoPauloTimezone = 'America/Sao_Paulo'
  const currentDate = zonedTimeToUtc(new Date(), saoPauloTimezone)

  const [body, setBody] = useState({})
  const [truckId, setTruckId] = useState('')
  const [cartId, setCartId] = useState('')
  const [driverId, setDriverId] = useState('')
  const [date] = useState(currentDate)

  useEffect(() => {
    if (showModal) {
      dispatch(getDriversSelectRequest())
      dispatch(getTrucksSelectRequest())
      dispatch(getCartsSelectRequest())
    }
  }, [dispatch, showModal])

  const onClose = useCallback(() => {
    setBody({})
    setTruckId('')
    setDriverId('')
    setCartId('')
    setShowModal(false)
  }, [setShowModal])

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(createFinancialRequest(body))
  }

  useEffect(() => {
    setBody((state) => ({
      ...state,
      start_date: date,
      truck_id: truckId,
      driver_id: driverId,
      cart_id: cartId,
    }))
  }, [truckId, driverId, cartId, date])

  useEffect(() => {
    if (successCreate) {
      onClose()
      dispatch(getFinancialsRequest(initialStateQuery.INITIAL_STATE_FINANCIAL))
    }
  }, [successCreate, onClose, dispatch])

  return (
    <BaseModal open={showModal} onClose={onClose} maxWidth={'335px'} maxHeight={'600px'}>
      <BaseContentHeader mt={2}>
        <BaseTitle sx={{ fontFamily: 'Poppins, sans-serif!important', fontSize: '24px' }}>
          {t('financial.new_financial')}
        </BaseTitle>
      </BaseContentHeader>

      {!loading && (
        <>
          <Grid
            container
            item
            spacing={2}
            mt={1}
            justifyContent={'flex-start'}
            sx={{ minHeight: '300px' }}
          >
            <Grid item xs={12} md={12} lg={12}>
              <BaseSelect
                labelText={t('placeholder.driver')}
                placeholder={t('messages.select')}
                options={drivers ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  setDriverId(newValue.id)
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <BaseSelect
                labelText={t('placeholder.truck')}
                placeholder={t('messages.select')}
                options={trucks ?? []}
                getOptionLabel={(option) => `${option.id} - ${option.truckBoard}`}
                onChange={(event, newValue) => {
                  setTruckId(newValue?.id)
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <BaseText></BaseText>
              <BaseSelect
                labelText={t('placeholder.cart')}
                placeholder={t('messages.select')}
                options={carts ?? []}
                getOptionLabel={(option) => `${option.id} - ${option.cartBoard}`}
                onChange={(event, newValue) => {
                  setCartId(newValue.id)
                }}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2} mt={1} p={2}>
            <Grid item xs={12} md={12} lg={6}>
              <BaseButton
                onClick={() => onClose()}
                background={''}
                sx={{
                  width: '140px',
                  height: '49px',
                  border: '1px solid #509BFB',
                  color: '#FFF',
                }}
                variant="text"
              >
                {t('button.cancel')}
              </BaseButton>
            </Grid>
            <Grid container item xs={12} md={12} lg={6}>
              <BaseButton
                onClick={(ev) => handleSubmit(ev)}
                background={'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'}
                sx={{ width: '140px', height: '49px' }}
              >
                {t('button.confirm')}
              </BaseButton>
            </Grid>
          </Grid>
        </>
      )}

      {loading && <BaseLoading />}
    </BaseModal>
  )
}

export default BaseModalAddFinancial
