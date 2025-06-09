import React, { useCallback, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteDriverRequest,
  getDriversRequest,
  resetDeleteDriverStatus,
} from 'store/modules/driver/driverSlice'

import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseModal from 'components/molecules/BaseModal/BaseModal'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading'
import BaseText from 'components/atoms/BaseText/BaseText'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'
import initialStateQuery from '@/utils/initialStateQuery'
import BaseContentHeader from '../BaseContentHeader/BaseContentHeader'

const BaseModalDeleteDriver = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { loadingDelete, successDelete } = useSelector((state) => state.driver)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(deleteDriverRequest(data?.id))
  }

  const onClose = useCallback(() => {
    setShowModal(false)
  }, [setShowModal])

  useEffect(() => {
    if (successDelete) {
      dispatch(getDriversRequest(initialStateQuery.INITIAL_STATE_DRIVER))
      dispatch(resetDeleteDriverStatus())
      onClose()
    }
  }, [successDelete, onClose, dispatch])

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="500px"
    >
      <BaseContentHeader>
        <BaseTitle fontSize={'24px'}>
          {t('messages.want_to_delete')} {data?.name} ?
        </BaseTitle>
      </BaseContentHeader>

      {!loadingDelete && (
        <>
          <Grid item container justifyContent="center">
            <BaseText fontsize={'16px'}>{t('messages.delete_msg_notice')}</BaseText>
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2} mt={2} justifyContent={'center'}>
            <Grid item container xs={12} md={12} lg={3}>
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
            <Grid container item xs={12} md={3} lg={3}>
              <BaseButton
                type="submit"
                color="error"
                background={'linear-gradient(224.78deg, #FF4B4B 8.12%, #FF0000 92.21%)'}
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '139px',
                  height: '49px',
                  marginRight: '15px',
                }}
              >
                {t('button.delete')}
              </BaseButton>
            </Grid>
          </Grid>
        </>
      )}
      {loadingDelete && <BaseLoading />}
    </BaseModal>
  )
}

export default BaseModalDeleteDriver
