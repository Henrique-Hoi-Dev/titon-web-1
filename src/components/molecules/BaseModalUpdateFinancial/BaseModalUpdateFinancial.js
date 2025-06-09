import React, { useEffect, useState, useCallback } from 'react'
import { Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  getFinancialByIdRequest,
  updateFinancialRequest,
} from 'store/modules/financial/financialSlice'

import Button from 'components/atoms/BaseButton/BaseButton'
import Modal from 'components/molecules/BaseModal/BaseModal'
import Loading from '@/components/atoms/BaseLoading/BaseLoading'
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import Title from 'components/atoms/BaseTitle/BaseTitle'
import BaseInput from 'components/molecules/BaseInput/BaseInput'

const BaseModalUpdateFinancial = ({ showModal, setShowModal, financialId }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { selected: financial, loading, success } = useSelector((state) => state.financial)

  const [body, setBody] = useState({})

  const onClose = useCallback(() => {
    setShowModal(false)
    setBody({})
  }, [setShowModal])

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(updateFinancialRequest({ id: financialId, data: body }))
  }

  useEffect(() => {
    if (financialId) {
      dispatch(getFinancialByIdRequest(financialId))
    }
  }, [dispatch, financialId])

  useEffect(() => {
    if (financial) {
      setBody({
        total_value: financial?.total_value,
        total_amount_paid: financial?.total_amount_paid,
      })
    }
  }, [financial])

  useEffect(() => {
    if (!loading && success) {
      onClose()
    }
  }, [loading, success, onClose])

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="600px"
    >
      <ContentHeader>
        <Title>{t('modal_financial.title_update')}</Title>
      </ContentHeader>

      {!loading && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: '300px', justifyContent: 'flex-start' }}
        >
          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={t('modal_financial.placeholder.total_value')}
              labelText={t('modal_financial.label.total_value')}
              required
              value={body?.total_value ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  total_value: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={t('modal_financial.placeholder.total_amount_paid')}
              labelText={t('modal_financial.label.total_amount_paid')}
              required
              value={body?.total_amount_paid ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  total_amount_paid: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid container item xs={12} spacing={2} mt={2} justifyContent="flex-end">
            <Grid item xs={12} md={3} lg={3}>
              <Button
                onClick={onClose}
                background=""
                sx={{
                  width: '140px',
                  height: '49px',
                  border: '1px solid #509BFB',
                  color: '#FFF',
                }}
                variant="text"
              >
                {t('button.cancel')}
              </Button>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Button
                type="submit"
                color="success"
                background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '141px',
                  height: '49px',
                  marginRight: '15px',
                }}
              >
                {t('button.update')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {loading && <Loading />}
    </Modal>
  )
}

export default BaseModalUpdateFinancial
