import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import {
  getCartByIdRequest,
  updateCartRequest
} from 'store/modules/cart/cartSlice';

import Button from 'components/atoms/BaseButton/BaseButton';
import Modal from 'components/molecules/BaseModal/BaseModal';
import Loading from '@/components/atoms/BaseLoading/BaseLoading';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect';
import enums from '@/utils/enums';

const BaseModalUpdateCart = ({ showModal, setShowModal, props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    selected: cart,
    loading,
    success
  } = useSelector((state) => state.cart);

  const [body, setBody] = useState({});

  const onClose = useCallback(() => {
    setShowModal(false);
    setBody({});
  }, [setShowModal]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(updateCartRequest({ id: props.id, data: body }));
  };

  useEffect(() => {
    if (props.id) {
      dispatch(getCartByIdRequest(props.id));
    }
  }, [dispatch, props.id]);

  useEffect(() => {
    if (cart) {
      setBody({
        cart_models: cart.cart_models,
        cart_brand: cart.cart_brand,
        cart_color: cart.cart_color,
        cart_tara: cart.cart_tara,
        cart_bodyworks: cart.cart_bodyworks,
        cart_year: cart.cart_year,
        cart_liter_capacity: cart.cart_liter_capacity,
        cart_ton_capacity: cart.cart_ton_capacity
      });
    }
  }, [cart]);

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);

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
        <Title>{t('modal_cart.title_edit')}</Title>
      </ContentHeader>

      {!loading && (
        <Grid container item spacing={2}>
          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={1.5}
            flexWrap={'wrap'}
          >
            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal_cart.placeholder.plate')}
                labelText={t('modal_cart.label.plate')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.plate ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    plate: ev.target.value
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal_cart.placeholder.model')}
                labelText={t('modal_cart.label.model')}
                styles={{
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.model ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    model: ev.target.value
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal_cart.placeholder.brand')}
                labelText={t('modal_cart.label.brand')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.brand ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    brand: ev.target.value
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal_cart.placeholder.year')}
                labelText={t('modal_cart.label.year')}
                styles={{
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.year ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    year: ev.target.value
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseSelect
                required
                label={t('modal_cart.placeholder.type')}
                labelText={t('modal_cart.label.type')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.type ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    type: ev.target.value
                  }))
                }
                options={enums.typeCart}
              />
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={1}
            mt={0.3}
            justifyContent={'flex-end'}
          >
            <Grid item container xs={12} md={12} lg={3}>
              <Button
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
              </Button>
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <Button
                type="submit"
                color="success"
                background={
                  'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                }
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '139px',
                  height: '49px',
                  marginRight: '15px'
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
  );
};

export default BaseModalUpdateCart;
