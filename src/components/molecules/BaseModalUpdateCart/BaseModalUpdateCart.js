import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import {
  getCartByIdRequest,
  updateCartRequest
} from 'store/modules/cart/cartSlice';

import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseInput from 'components/molecules/BaseInput/BaseInput';

const BaseModalUpdateCart = ({ showModal, setShowModal, data }) => {
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
    dispatch(updateCartRequest({ id: data.id, data: body }));
  };

  useEffect(() => {
    if (data.id) {
      dispatch(getCartByIdRequest(data.id));
    }
  }, [dispatch, data.id]);

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
    <BaseModal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
    >
      <BaseContentHeader>
        <BaseTitle>Editar Carreta</BaseTitle>
      </BaseContentHeader>

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
              label={'Marca'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={body?.cart_brand ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_brand: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={'Modelo'}
              required
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={body?.cart_models ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_models: ev.target.value
                }))
              }
            />
          </Grid>

          {body?.cart_bodywork === 'tank' && (
            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                label={'Capacidade de litros'}
                required
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.cart_liter_capacity ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_liter_capacity: ev.target.value
                  }))
                }
              />
            </Grid>
          )}

          {(body?.cartBodyworks === 'BULKCARRIER' ||
            body?.cartBodyworks === 'SIDER' ||
            body?.cartBodyworks === 'CHEST' ||
            body?.cartBodyworks === 'BUCKET') && (
            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                label={'Capacidade de tonelada'}
                required
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.cart_ton_capacity ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_ton_capacity: ev.target.value
                  }))
                }
              />
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={'Cor'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={body?.cart_color ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_color: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={'Tara'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={body?.cart_tara ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_tara: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={'Ano Fabricação'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={body?.cart_year ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_year: ev.target.value
                }))
              }
            />
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
            <Grid container item xs={12} md={3} lg={3}>
              <BaseButton
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
              </BaseButton>
            </Grid>
          </Grid>
        </Grid>
      )}

      {loading && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalUpdateCart;
