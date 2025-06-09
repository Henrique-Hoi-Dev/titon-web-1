import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { resetDriverPasswordRequest } from 'store/modules/driver/driverSlice'
import { Grid } from '@mui/material'

import Button from 'components/atoms/BaseButton/BaseButton'
import Modal from 'components/molecules/BaseModal/BaseModal'
import Loading from '@/components/atoms/BaseLoading/BaseLoading'
import Text from 'components/atoms/BaseText/BaseText'

const BaseModalResetPassword = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.driver)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(resetDriverPasswordRequest(data?.cpf))
  }

  const onClose = useCallback(() => {
    setShowModal(false)
  }, [setShowModal])

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="650px"
    >
      {!loading && error && (
        <Grid item container justifyContent="center">
          <Text type="warning">{`messages: ${error?.response?.data?.responseData?.msg}`}</Text>
        </Grid>
      )}

      {!loading && (
        <>
          <Grid item container justifyContent="center">
            <Text fontSize={'30px'}>{t('messages.want_to_password')}</Text>
          </Grid>
          <Grid item container xs={12} md={12} lg={12} justifyContent="center">
            <Grid item xs={6} md={8.3} lg={8.3} mt={1} sx={{ textAlign: 'center' }}>
              <Text fontSize={'16px'}>{t('messages.reset_password')}</Text>
            </Grid>
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2} mt={2} justifyContent={'center'}>
            <Grid item container xs={12} md={12} lg={3}>
              <Button
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
                {t('button.reset')}
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      {loading && <Loading />}
    </Modal>
  )
}

export default BaseModalResetPassword
