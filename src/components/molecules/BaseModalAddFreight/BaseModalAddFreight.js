import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { createFreightRequest } from 'store/modules/freight/freightSlice';

import Button from 'components/atoms/BaseButton/BaseButton';
import Modal from 'components/molecules/BaseModal/BaseModal';
import Loading from '@/components/atoms/BaseLoading/BaseLoading';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect';
import enums from '@/utils/enums';

const BaseModalAddFreight = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.freight);

  const [body, setBody] = useState({});

  const onClose = useCallback(() => {
    setShowModal(false);
    setBody({});
  }, [setShowModal]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(createFreightRequest(body));
  };

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
        <Title>{t('modal_freight.title_add')}</Title>
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
                label={t('modal_freight.placeholder.origin')}
                labelText={t('modal_freight.label.origin')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.origin ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    origin: ev.target.value
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal_freight.placeholder.destination')}
                labelText={t('modal_freight.label.destination')}
                styles={{
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.destination ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    destination: ev.target.value
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal_freight.placeholder.value')}
                labelText={t('modal_freight.label.value')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.value ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    value: ev.target.value
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseSelect
                required
                label={t('modal_freight.placeholder.status')}
                labelText={t('modal_freight.label.status')}
                styles={{
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.status ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    status: ev.target.value
                  }))
                }
                options={enums.statusFreight}
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseSelect
                required
                label={t('modal_freight.placeholder.type')}
                labelText={t('modal_freight.label.type')}
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
                options={enums.typeFreight}
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
                {t('button.create')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {loading && <Loading />}
    </Modal>
  );
};

export default BaseModalAddFreight;
