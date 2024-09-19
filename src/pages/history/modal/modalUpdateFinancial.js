import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { successNotification } from 'utils/notification'
import { useGet } from 'services/requests/useGet'
import { useUpdate } from 'services/requests/useUpdate'

import Button from 'components/atoms/BaseButton/BaseButton'
import Input from 'components/atoms/input/BaseInput'
import Modal from 'components/molecules/BaseModal/BaseModal'
import Loading from 'components/atoms/loading/loading'
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import Title from 'components/atoms/BaseTitle/BaseTitle'
import Text from 'components/atoms/BaseText/BaseText'
import { formatMoney } from 'utils/masks'
import { unmaskMoney } from 'utils/unmaskMoney'

const ModalUpdateFinancial = ({
  showModal,
  setShowModal,
  mutate,
  financialId
}) => {
  const { t } = useTranslation()

  const [fetch, setFetch] = useState(false)
  const [body, setBody] = useState([])

  const { data: financial, isValidating } = useGet(
    `user/financialStatement/${financialId}`,
    []
  )

  const {
    data: salespointUpdate,
    error: errorSalespointUpdate,
    isFetching
  } = useUpdate(
    `user/financialStatement/${financialId}`,
    body,
    '',
    fetch,
    setFetch
  )

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setFetch(true)
  }

  const onClose = () => {
    setShowModal(false)
    setBody({})
  }

  useEffect(() => {
    setBody((state) => ({
      ...state,
      total_value: financial?.dataResult?.total_value,
      total_amount_paid: financial?.dataResult?.total_amount_paid
    }))
  }, [financial])

  useEffect(() => {
    if (salespointUpdate) {
      mutate()
      onClose()
      successNotification(t('messages.success_msg'))
    }
    if (salespointUpdate) {
      successNotification(t('messages.success_msg'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salespointUpdate, errorSalespointUpdate])

  return (
    <Modal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
    >
      <ContentHeader>
        <Title>Atualizar Ficha</Title>
      </ContentHeader>

      {!isFetching && !isValidating && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: '300px', justifyContent: 'flex-start' }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <Text sx={{ ml: 1, fontWeight: '900' }}>Motorista:</Text>
            <Text sx={{ ml: 1, fontSize: '16px!important' }}>
              {financial?.dataResult?.driver_name}
            </Text>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Text sx={{ ml: 1, fontWeight: '900' }}>Caminhão:</Text>
            <Text sx={{ ml: 1, fontSize: '16px!important' }}>
              {financial?.dataResult?.truck_models}
            </Text>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Text sx={{ ml: 1, fontWeight: '900' }}>Carreta:</Text>
            <Text sx={{ ml: 1, fontSize: '16px!important' }}>
              {financial?.dataResult?.cart_models}
            </Text>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Valor Total Ficha</Text>
            <Input
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={formatMoney(body?.total_value)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  total_value: unmaskMoney(ev.target.value)
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Valor Total Pago</Text>
            <Input
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={formatMoney(body?.total_amount_paid)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  total_amount_paid: unmaskMoney(ev.target.value)
                }))
              }
            />
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2} mt={2}>
            <Grid item xs={12} md={12} lg={6}>
              <Button variant="return" onClick={() => onClose()}>
                Voltar
              </Button>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Button type="submit" variant="contained" color="success">
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
      {isValidating && <Loading />}
    </Modal>
  )
}

export default ModalUpdateFinancial
