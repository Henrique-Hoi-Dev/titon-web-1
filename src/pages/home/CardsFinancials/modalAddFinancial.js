import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCreate } from 'services/requests/useCreate'
import { errorNotification, successNotification } from 'utils/notification'
import { useGet } from 'services/requests/useGet'
import { useSelector } from 'react-redux'
import { zonedTimeToUtc } from 'date-fns-tz'

import Button from 'components/atoms/BaseButton/BaseButton'
import Modal from 'components/molecules/BaseModal/BaseModal'
import Loading from 'components/atoms/loading/loading'
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import Title from 'components/atoms/BaseTitle/BaseTitle'
import Autocomplete from 'components/atoms/BaseAutocomplete/BaseAutocomplete'
import PickerDate from 'components/atoms/pickerDate/pickerDate'
import BaseText from 'components/atoms/BaseText/BaseText'

const ModalAddFinancial = ({ showModal, setShowModal, mutate }) => {
  const { t } = useTranslation()

  const user = useSelector((state) => state?.user)
  const saoPauloTimezone = 'America/Sao_Paulo'
  const currentDate = zonedTimeToUtc(new Date(), saoPauloTimezone)

  const [body, setBody] = useState({})

  const [truckId, setTruckId] = useState('')
  const [cartId, setCartId] = useState('')
  const [driverId, setDriverId] = useState('')
  const [date, setDate] = useState(currentDate)

  const [fetch, setFetch] = useState(false)

  const {
    data: newFinancial,
    error: errorNewFinancial,
    isFetching
  } = useCreate('user/financialStatement', body, fetch, setFetch)

  const { data: trucks, mutate: mutateTruck } = useGet('/trucks-select', {})

  const { data: drivers, mutate: mutateDriver } = useGet('/drivers-select', {})

  const { data: carts, mutate: mutateCart } = useGet('/carts-select', {})

  const onClose = () => {
    setShowModal(false)
    setBody({})
    setTruckId('')
    setDriverId('')
    setCartId('')
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    setFetch(true)
  }

  useEffect(() => {
    setBody((state) => ({
      ...state,
      start_date: date,
      truck_id: truckId,
      driver_id: driverId,
      cart_id: cartId,
      creator_user_id: user?.data?.userProps?.id
    }))
  }, [truckId, user, driverId, cartId, date])

  useEffect(() => {
    if (newFinancial) {
      mutate()
      mutateTruck()
      mutateDriver()
      mutateCart()
      onClose()
    }

    if (newFinancial) {
      successNotification(t('messages.success_msg'))
    }
    if (errorNewFinancial) {
      errorNotification(errorNewFinancial?.response?.data?.mgs)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFinancial, errorNewFinancial])

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      maxWidth={'335px'}
      maxHeight={'500px'}
    >
      <ContentHeader mt={2}>
        <Title
          sx={{ fontFamily: 'Poppins, sans-serif!important', fontSize: '32px' }}
        >
          {t('financial.new_financial')}
        </Title>
      </ContentHeader>

      {!isFetching && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          justifyContent={'flex-start'}
          sx={{ minHeight: '300px' }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <Autocomplete
              sx={{
                '& .MuiAutocomplete-input': {
                  height: '0.4em!important'
                }
              }}
              placeholder={t('placeholder.driver')}
              options={drivers?.dataResult ?? []}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setDriverId(newValue.id)
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Autocomplete
              sx={{
                '& .MuiAutocomplete-input': {
                  height: '0.4em!important'
                }
              }}
              placeholder={t('placeholder.truck')}
              options={trucks?.dataResult ?? []}
              getOptionLabel={(option) => option.truck_models}
              onChange={(event, newValue) => {
                setTruckId(newValue?.id)
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <BaseText>{} </BaseText>
            <Autocomplete
              sx={{
                '& .MuiAutocomplete-input': {
                  height: '0.4em!important'
                }
              }}
              placeholder={t('placeholder.cart')}
              options={carts?.dataResult ?? []}
              getOptionLabel={(option) => option.cart_models}
              onChange={(event, newValue) => {
                setCartId(newValue.id)
              }}
            />
          </Grid>

          <Grid container item xs={12} md={12} lg={12}>
            <PickerDate
              size="medium"
              height="2.4em"
              onChange={(newValue) => {
                setDate(newValue)
              }}
            />
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2} mt={1} p={2}>
            <Grid item xs={12} md={12} lg={6}>
              <Button
                onClick={() => onClose()}
                background={'#fff'}
                sx={{
                  width: '140px',
                  height: '49px',
                  border: '1px solid #509BFB',
                  color: '#000000'
                }}
                variant="text"
              >
                {t('button.return')}
              </Button>
            </Grid>
            <Grid container item xs={12} md={12} lg={6}>
              <Button
                onClick={(ev) => handleSubmit(ev)}
                background={
                  'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                }
                sx={{ width: '140px', height: '49px' }}
              >
                {t('button.confirm')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
    </Modal>
  )
}

export default ModalAddFinancial