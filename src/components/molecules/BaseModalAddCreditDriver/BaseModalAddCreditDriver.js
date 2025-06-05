import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createCreditRequest } from 'store/modules/credit/creditSlice';
import { formatMoney } from '@/utils/masks';
import { unmaskMoney } from '@/utils/unmaskMoney';

import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseSelectWithInput from '../BaseSelectWithInput/BaseSelectWithInput';
import BaseText from 'components/atoms/BaseText/BaseText';

const BaseModalAddCreditDriver = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation();
  const [body, setBody] = useState({
    driver_id: data?.id,
    description: ''
  });
  const dispatch = useDispatch();

  const { loading, successCreate } = useSelector((state) => state.credit);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(createCreditRequest(body));
  };

  const onClose = useCallback(() => {
    setShowModal(false);
    setBody({
      driver_id: data?.id,
      description: ''
    });
  }, [setShowModal, data?.id]);

  useEffect(() => {
    if (successCreate) {
      onClose();
    }
  }, [successCreate, onClose]);

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="500px"
      height="390px"
    >
      {!loading && (
        <>
          <Grid item container justifyContent="center">
            <BaseText fontsize={'23px'}>{t('modal.title_credit')}</BaseText>
          </Grid>
          <Grid item container xs={12} md={12} lg={12} justifyContent="center">
            <Grid item xs={6} md={8.3} lg={8.3} mt={1}>
              <Grid item xs={12} md={12} lg={12}>
                <BaseSelectWithInput
                  xs={12}
                  md={12}
                  lg={12}
                  requiredInput
                  labelText={t('field.value')}
                  labelTextSelect={t('field.type')}
                  placeholder={t('messages.select')}
                  options={[
                    { label: t('info_financial.credit'), value: 'CREDIT' },
                    { label: t('info_financial.debit'), value: 'DEBIT' }
                  ]}
                  onChangeSelect={(ev, newValue) =>
                    setBody((state) => ({
                      ...state,
                      type_method: newValue?.value ?? ''
                    }))
                  }
                  value={formatMoney(body?.value)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      value: unmaskMoney(ev.target.value)
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12} mt={2}>
                <BaseInput
                  required
                  labelText={t('modal.reason')}
                  label={t('placeholder.reason')}
                  value={body?.description ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      description: ev.target.value
                    }))
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={2}
            mt={2}
            justifyContent={'center'}
          >
            <Grid item container xs={12} md={12} lg={3}>
              <BaseButton
                onClick={() => onClose()}
                background={''}
                sx={{
                  width: '140px',
                  height: '49px',
                  border: '1px solid #509BFB',
                  color: '#FFF'
                }}
                variant="text"
              >
                {t('button.cancel')}
              </BaseButton>
            </Grid>
            <Grid container item xs={12} md={4} lg={4}>
              <BaseButton
                onClick={(ev) => handleSubmit(ev)}
                color="success"
                disabled={body?.description?.length < 5}
                background={
                  'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                }
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '171px',
                  height: '49px',
                  marginRight: '15px'
                }}
              >
                {t('button.register2')}
              </BaseButton>
            </Grid>
          </Grid>
        </>
      )}
      {loading && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalAddCreditDriver;
