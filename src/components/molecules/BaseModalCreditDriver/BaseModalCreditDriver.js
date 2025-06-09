import { Grid, IconButton } from '@mui/material'
import { BiPlus } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getCreditsRequest } from '@/store/modules/credit/creditSlice'

import BaseLoading from 'components/atoms/BaseLoading/BaseLoading'
import BaseText from 'components/atoms/BaseText/BaseText'
import BaseModal from 'components/molecules/BaseModal/BaseModal'
import Table from './table'
import BaseModalAddCreditDriver from '../BaseModalAddCreditDriver/BaseModalAddCreditDriver'

const BaseModalCreditDriver = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { loading, data: creditData } = useSelector((state) => state.credit)

  const [showModalAddCredit, setShowModalAddCredit] = useState(false)

  const onClose = () => {
    setShowModal(false)
  }

  useEffect(() => {
    dispatch(getCreditsRequest({ driver_id: data.id }))
  }, [dispatch, data.id])

  return (
    <BaseModal open={showModal} onClose={onClose} maxWidth="650px" height="580px">
      {!loading && (
        <>
          <Grid item container justifyContent="center">
            <BaseText fontsize={'23px'}>
              {t('messages.credit/debit')} {data.name} ?
            </BaseText>
          </Grid>
          <Grid item container xs={12} md={12} lg={12} justifyContent="flex-end">
            <IconButton
              onClick={() => setShowModalAddCredit(true)}
              color="primary"
              aria-label="add to shopping cart"
            >
              <BiPlus size={'35px'} />
            </IconButton>
            <Grid item xs={12} md={12} lg={12} mt={2}>
              <Table data={creditData} />
            </Grid>
          </Grid>
        </>
      )}
      {loading && <BaseLoading />}

      {showModalAddCredit && (
        <BaseModalAddCreditDriver
          setShowModal={setShowModalAddCredit}
          showModal={showModalAddCredit}
          data={data}
        />
      )}
    </BaseModal>
  )
}

export default BaseModalCreditDriver
