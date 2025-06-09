import React, { useEffect, useCallback } from 'react'
import { Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { deleteFinancialRequest } from 'store/modules/financial/financialSlice'

import Button from 'components/atoms/BaseButton/BaseButton'
import Loading from '@/components/atoms/BaseLoading/BaseLoading'
import Text from 'components/atoms/BaseText/BaseText'
import Modal from 'components/molecules/BaseModal/BaseModal'

const BaseModalDeleteFinancial = ({ showModal, setShowModal, id }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { loading, success } = useSelector((state) => state.financial)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(deleteFinancialRequest(id))
  }

  const onClose = useCallback(() => {
    setShowModal(false)
  }, [setShowModal])

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
      maxWidth="650px"
    >
      {!loading && (
        <>
          <Grid item container justifyContent="center">
            <Text fontSize="30px">{t('messages.want_to_delete_financial')}</Text>
          </Grid>
          <Grid item container xs={12} md={12} lg={12} justifyContent="center">
            <Grid item xs={6} md={8.3} lg={8.3} mt={1} sx={{ textAlign: 'center' }}>
              <Text fontSize="16px">{t('messages.delete_financial_msg_notice')}</Text>
            </Grid>
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2} mt={2} justifyContent="center">
            <Grid item container xs={12} md={12} lg={3}>
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

            <Grid container item xs={12} md={3} lg={3}>
              <Button
                type="submit"
                color="error"
                variant="outlined"
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '141px',
                  height: '49px',
                  marginRight: '15px',
                }}
              >
                {t('button.delete')}
              </Button>
            </Grid>
          </Grid>
        </>
      )}

      {loading && (
        <Grid item container>
          <Loading />
        </Grid>
      )}
    </Modal>
  )
}

export default BaseModalDeleteFinancial
