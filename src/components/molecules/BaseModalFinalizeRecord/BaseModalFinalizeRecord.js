import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { errorNotification } from 'utils/notification'
import { finishingFinancialRequest } from 'store/modules/financial/financialSlice'
import { Grid } from '@mui/material'
import { formatMil } from '@/utils/masks'
import { unmaskMoney } from '@/utils/unmaskMoney'

import BaseModal from '@/components/molecules/BaseModal/BaseModal'
import BaseButton from '@/components/atoms/BaseButton/BaseButton'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading'
import BaseText from '@/components/atoms/BaseText/BaseText'
import BaseInput from '@/components/molecules/BaseInput/BaseInput'

const BaseModalFinalizeRecord = ({ showModal, setShowModal, financial }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { loading, success } = useSelector((state) => state.financial)

  const [body, setBody] = useState({ final_value: '' })

  const handleSubmit = () => {
    if (!body.final_value) {
      errorNotification(t('messages.error.final_value'))
      return
    }

    dispatch(
      finishingFinancialRequest({
        id: financial?.id,
        data: { final_value: body.final_value },
      })
    )
  }

  const onClose = useCallback(() => {
    setShowModal(false)
  }, [setShowModal])

  useEffect(() => {
    if (success) {
      onClose()
    }
  }, [success, onClose])

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="560px"
    >
      <Grid item container justifyContent="center">
        <BaseText fontsize={'32px'}>
          {t('modal.finalize_record.title')} {financial?.truck?.truckBoard}?
        </BaseText>
      </Grid>

      <Grid item container xs={12} md={12} lg={12} justifyContent="center">
        <BaseInput
          label={'Insira o KM final'}
          required
          styles={{
            width: '300px',
            '& .MuiInputBase-input.MuiOutlinedInput-input': {
              height: '1.4rem',
            },
          }}
          value={formatMil(body?.final_km)}
          onChange={(ev) =>
            setBody((state) => ({
              ...state,
              final_km: unmaskMoney(ev.target.value),
              status: false,
            }))
          }
        />
      </Grid>

      <Grid container item xs={12} md={12} lg={12} flexDirection={'row'} justifyContent={'center'}>
        <BaseButton
          onClick={() => onClose()}
          background={'#509BFB'}
          sx={{
            width: '140px',
            height: '49px',
            border: '1px solid #509BFB',
            color: '#ffff',
            mr: 3,
          }}
        >
          {t('button.cancel')}
        </BaseButton>
        <BaseButton
          type="submit"
          background="#F03D3D"
          sx={{
            width: '153px',
            height: '49px',
            '&:hover': {
              backgroundColor: '#F03D3D',
            },
          }}
        >
          {t('button.finish')}
        </BaseButton>
      </Grid>

      {loading && <BaseLoading />}
    </BaseModal>
  )
}

export default BaseModalFinalizeRecord
