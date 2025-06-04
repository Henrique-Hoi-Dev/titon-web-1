import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useCreate } from 'services/requests/useCreate';
import { successNotification, errorNotification } from 'utils/notification';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/BaseButton/BaseButton';
import Modal from 'components/molecules/BaseModal/BaseModal';
import Loading from 'components/atoms/loading/loading';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect';

const ModalAddCart = ({ showModal, setShowModal, mutate }) => {
  const { t } = useTranslation();

  const [body, setBody] = useState({});

  const [fetch, setFetch] = useState(false);

  const typeCart = [
    { value: 'TANK', label: 'Tanque' },
    { value: 'BULKCARRIER', label: 'Graneleiro' },
    { value: 'SIDER', label: 'Sider' },
    { value: 'CHEST', label: 'Baú' },
    { value: 'BUCKET', label: 'Caçamba' }
  ];

  const {
    data: cart,
    error: errorCart,
    isFetching
  } = useCreate('user/cart', body, fetch, setFetch);

  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  useEffect(() => {
    if (cart) {
      mutate();
      onClose();
    }

    if (cart) {
      successNotification();
    }

    if (errorCart) {
      errorNotification(errorCart?.response?.data?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, errorCart]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
      maxHeight={'800px'}
    >
      <ContentHeader mt={2}>
        <Title>{t('modal_cart.title')}</Title>
      </ContentHeader>

      {!isFetching && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: '300px', justifyContent: 'flex-start' }}
        >
          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={t('modal_truck.placeholder.mark')}
              labelText={t('modal_truck.label.mark')}
              required
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
              label={t('modal_truck.placeholder.model')}
              labelText={t('modal_truck.label.model')}
              required
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
              label={t('modal_truck.placeholder.plate')}
              labelText={t('modal_truck.label.plate')}
              required
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
              label={t('modal_truck.placeholder.color')}
              labelText={t('modal_truck.label.color')}
              required
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
              placeholder={t('messages.select')}
              labelText={t('modal_cart.label.type_cart')}
              options={typeCart ?? []}
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

          {body?.cart_bodyworks === 'TANK' && (
            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                label={t('modal_cart.placeholder.liter_capacity')}
                labelText={t('modal_cart.label.liter_capacity')}
                required
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

          {(body?.cart_bodyworks === 'BULKCARRIER' ||
            body?.cart_bodyworks === 'SIDER' ||
            body?.cart_bodyworks === 'CHEST' ||
            body?.cart_bodyworks === 'BUCKET') && (
            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                label={t('modal_cart.placeholder.ton_capacity')}
                labelText={t('modal_cart.label.ton_capacity')}
                required
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
              labelText={t('modal_cart.label.tare')}
              label={t('modal_cart.placeholder.tare')}
              required
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
              label={t('modal_truck.placeholder.chassis_number')}
              labelText={t('modal_truck.label.chassis_number')}
              required
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
              label={t('modal_truck.placeholder.year_manufacture')}
              labelText={t('modal_truck.label.year_manufacture')}
              required
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
            spacing={2}
            mt={1}
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
                  width: '141px',
                  height: '49px',
                  marginRight: '15px'
                }}
              >
                {t('button.register')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
    </Modal>
  );
};

export default ModalAddCart;
