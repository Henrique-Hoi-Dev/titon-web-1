import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import {
  createCartRequest,
  getCartsRequest
} from 'store/modules/cart/cartSlice';

import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect';
import enums from '@/utils/enums';

const BaseModalAddCart = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.cart);

  const [body, setBody] = useState({});

  const onClose = useCallback(() => {
    setShowModal(false);
    setBody({});
  }, [setShowModal]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(createCartRequest(body));
  };

  useEffect(() => {
    if (loading) {
      onClose();
      dispatch(getCartsRequest());
    }
  }, [loading, onClose, dispatch]);

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
      maxHeight={'800px'}
    >
      <BaseContentHeader mt={2}>
        <BaseTitle>Cadastrar Carreta</BaseTitle>
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

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={'Placa'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={body?.cart_board ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_board: ev.target.value
                }))
              }
            />
          </Grid>

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
            <BaseSelect
              placeholder={'Tipo Carreta'}
              options={enums.typeCart ?? []}
              getOptionLabel={(option) => option.label ?? ''}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(event, newValue) => {
                if (newValue) {
                  setBody((state) => ({
                    ...state,
                    cart_bodyworks: newValue.value
                  }));
                }
                if (newValue === null) {
                  setBody((state) => ({ ...state, cart_bodyworks: '' }));
                }
              }}
            />
          </Grid>

          {body?.cart_bodyworks === 'tank' && (
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
              label={'Número Chassi'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={body?.cart_chassis ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_chassis: ev.target.value
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
                {t('button.register')}
              </BaseButton>
            </Grid>
          </Grid>
        </Grid>
      )}

      {loading && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalAddCart;
