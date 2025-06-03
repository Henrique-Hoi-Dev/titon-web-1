import React, { useState, useEffect, useCallback } from 'react';
import { Grid, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  getTruckByIdRequest,
  updateTruckRequest
} from 'store/modules/truck/truckSlice';

import Button from 'components/atoms/BaseButton/BaseButton';
import Modal from 'components/molecules/BaseModal/BaseModal';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import Progress from 'components/atoms/progress/progress';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect';
import enums from '@/utils/enums';
import BaseAvatar from '@/components/molecules/BaseAvatar/BaseAvatar';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';

const uploadImage = async (file) => {
  // Implementação temporária - retorna uma URL de exemplo
  return 'https://titon-file-storage.s3.us-east-1.amazonaws.com/images-public/exemple-truck.webp';
};

const BaseModalUpdateTruck = ({ showModal, setShowModal, props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    selected: truck,
    loading,
    success
  } = useSelector((state) => state.truck);

  const [body, setBody] = useState({});
  const [, setPreview] = useState(
    'https://titon-file-storage.s3.us-east-1.amazonaws.com/images-public/exemple-truck.webp'
  );
  const [progressPercent, setProgressPercent] = useState(0);

  const onClose = useCallback(() => {
    setShowModal(false);
    setBody({});
  }, [setShowModal]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(updateTruckRequest({ id: props.id, data: body }));
  };

  useEffect(() => {
    if (props.id) {
      dispatch(getTruckByIdRequest(props.id));
    }
  }, [dispatch, props.id]);

  useEffect(() => {
    if (truck) {
      setBody((state) => ({
        ...state,
        truck_models: truck?.truckModels,
        truck_name_brand: truck?.truckNameBrand,
        truck_color: truck?.truckColor,
        truck_km: truck?.truckKm,
        truck_year: truck?.truckYear
      }));

      setPreview(truck?.imageTruck?.uuid);
    }
  }, [truck]);

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);

  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return null;

    const downloadURL = await uploadImage(file);
    setPreview(downloadURL);
    setProgressPercent(100);
  }

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
        <Title>{t('modal_truck.title_edit')} </Title>
      </ContentHeader>

      {!loading && (
        <Grid container item spacing={2}>
          <Grid
            container
            item
            spacing={2}
            alignItems="center"
            flexDirection={'column'}
            flexWrap={'nowrap'}
            mr={3}
            lg={12}
            md={12}
            xs={12}
          >
            <Grid
              item
              container
              xs={6}
              md={6}
              lg={6}
              mb={2}
              mr={2}
              justifyContent={'center'}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
            >
              <IconButton
                color="info"
                aria-label="upload picture"
                component="label"
                sx={{
                  background: 'transparent',
                  '&:hover': {
                    background: 'transparent'
                  }
                }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleChange}
                />
                <BaseAvatar
                  src={
                    body?.imageTruck?.uuid
                      ? body?.imageTruck?.uuid
                      : 'https://titon-file-storage.s3.us-east-1.amazonaws.com/images-public/exemple-truck.webp'
                  }
                  styles={{
                    height: 'auto',
                    width: '280px',
                    borderRadius: '8px'
                  }}
                />
              </IconButton>
              {progressPercent > 0 && (
                <Progress
                  progressPercent={progressPercent}
                  setProgressPercent={setProgressPercent}
                />
              )}
            </Grid>

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
                  label={t('modal_truck.placeholder.plate')}
                  labelText={t('modal_truck.label.plate')}
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
                  label={t('modal_truck.placeholder.model')}
                  labelText={t('modal_truck.label.model')}
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
                  label={t('modal_truck.placeholder.brand')}
                  labelText={t('modal_truck.label.brand')}
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
                  label={t('modal_truck.placeholder.year')}
                  labelText={t('modal_truck.label.year')}
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
                  label={t('modal_truck.placeholder.type')}
                  labelText={t('modal_truck.label.type')}
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
                  options={enums.typeTruck}
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

      {loading && <BaseLoading />}
    </Modal>
  );
};

export default BaseModalUpdateTruck;
