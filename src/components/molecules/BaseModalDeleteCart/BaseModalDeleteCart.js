import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { deleteCartRequest } from 'store/modules/cart/cartSlice';

import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseText from '@/components/atoms/BaseText/BaseText';

const BaseModalDeleteCart = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.cart);

  const onClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(deleteCartRequest(data.id));
  };

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="460px"
    >
      Deseja excluir: {data.name}?
      {!loading && (
        <>
          <Grid item container justifyContent="center">
            <BaseTitle fontSize={'30px'}>
              Deseja excluir: {data.name}?
            </BaseTitle>
          </Grid>
          <Grid item container xs={12} md={12} lg={12} justifyContent="center">
            <Grid
              item
              xs={6}
              md={8.3}
              lg={8.3}
              mt={1}
              sx={{ textAlign: 'center' }}
            >
              <BaseText fontSize={'16px'}>
                Após excluir os registros da carreta serão perdidos.
              </BaseText>
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
            <Grid item container xs={12} md={6} lg={4}>
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
            <Grid container item xs={12} md={6} lg={4}>
              <BaseButton
                type="submit"
                color="error"
                background={
                  'linear-gradient(224.78deg, #FF4B4B 8.12%, #FF0000 92.21%)'
                }
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '190px',
                  height: '49px',
                  marginRight: '15px'
                }}
              >
                {t('button.delete')}
              </BaseButton>
            </Grid>
          </Grid>
        </>
      )}
      {loading && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalDeleteCart;
