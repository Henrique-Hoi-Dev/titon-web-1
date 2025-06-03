import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { errorNotification } from 'utils/notification';
import { finishingFinancialRequest } from 'store/modules/financial/financialSlice';

import BaseModal from 'components/molecules/BaseModal/BaseModal';
import Button from 'components/atoms/BaseButton/BaseButton';
import Loading from '@/components/atoms/BaseLoading/BaseLoading';

const BaseModalFinalizeRecord = ({ showModal, setShowModal, props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.financial);
  const [values] = useState({ final_value: '' });

  const handleSubmit = () => {
    if (!values.final_value) {
      errorNotification(t('messages.error.final_value'));
      return;
    }

    dispatch(
      finishingFinancialRequest({
        id: props?.props?.dataResult?.id,
        data: { final_value: values.final_value }
      })
    );
  };

  const onClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      title={t('modal.finalize_record.title')}
    >
      {!loading && (
        <>
          <p>{t('modal.finalize_record.message')}</p>
          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}
          >
            <Button
              onClick={onClose}
              color="error"
              sx={{
                fontSize: '14px',
                color: 'white',
                width: '120px',
                height: '40px'
              }}
            >
              {t('button.cancel')}
            </Button>
            <Button
              onClick={handleSubmit}
              color="success"
              background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
              sx={{
                fontSize: '14px',
                color: 'white',
                width: '120px',
                height: '40px'
              }}
            >
              {t('button.confirm')}
            </Button>
          </div>
        </>
      )}
      {loading && <Loading />}
    </BaseModal>
  );
};

export default BaseModalFinalizeRecord;
