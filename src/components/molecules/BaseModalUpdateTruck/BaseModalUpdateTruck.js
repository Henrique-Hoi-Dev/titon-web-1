import React, { useState, useEffect, useCallback } from 'react';
import { Grid, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  getTruckByIdRequest,
  updateTruckRequest
} from 'store/modules/truck/truckSlice';

import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseProgress from '@/components/atoms/BaseProgress/BaseProgress';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseAvatar from '@/components/molecules/BaseAvatar/BaseAvatar';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';

const uploadImage = async (file) => {
  return 'https://titon-file-storage.s3.us-east-1.amazonaws.com/images-public/exemple-truck.webp';
};

const BaseModalUpdateTruck = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    selected: truck,
    loadingUpdate,
    successUpdate
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
    dispatch(updateTruckRequest({ id: data.id, data: body }));
  };

  useEffect(() => {
    if (data.id) {
      dispatch(getTruckByIdRequest(data.id));
    }
  }, [dispatch, data.id]);

  useEffect(() => {
    if (truck) {
      setBody((state) => ({
        ...state,
        truck_models: truck?.truckModels,
        truck_name_brand: truck?.truckNameBrand,
        truck_board: truck?.truckBoard,
        truck_color: truck?.truckColor,
        truck_km: truck?.truckKm,
        truck_chassis: truck?.truckChassis,
        truck_year: truck?.truckYear
      }));

      setPreview(truck?.imageTruck);
    }
  }, [truck]);

  useEffect(() => {
    if (successUpdate) {
      onClose();
    }
  }, [successUpdate, onClose]);

  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return null;

    const downloadURL = await uploadImage(file);
    setPreview(downloadURL);
    setProgressPercent(100);
  }

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
      maxHeight={'850px'}
    >
      <BaseContentHeader mt={2}>
        <BaseTitle>Cadastro Caminhão</BaseTitle>
      </BaseContentHeader>

      {!loadingUpdate && (
        <>
          <Grid
            container
            item
            spacing={2}
            justifyContent="flex-start"
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
                  variant="square"
                  alt="img"
                  styles={{
                    height: 'auto',
                    width: '280px',
                    borderRadius: '8px'
                  }}
                  uuid={truck?.imageTruck?.uuid}
                  category={truck?.imageTruck?.category}
                />
              </IconButton>
              {progressPercent > 0 && (
                <BaseProgress
                  progressPercent={progressPercent}
                  setProgressPercent={setProgressPercent}
                />
              )}
            </Grid>

            <Grid container item xs={6} md={6} lg={6} spacing={1.5}>
              <Grid item xs={12} md={12} lg={12}>
                <BaseInput
                  required
                  label={'Marca'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem'
                    }
                  }}
                  value={body?.truck_name_brand ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_name_brand: ev.target.value
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <BaseInput
                  required
                  label={'Modelo'}
                  styles={{
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem'
                    }
                  }}
                  value={body?.truck_models ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_models: ev.target.value
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <BaseInput
                  required
                  label={'Placa'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem'
                    }
                  }}
                  value={body?.truck_board ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_board: ev.target.value
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <BaseInput
                  required
                  label={'Cor'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem'
                    }
                  }}
                  value={body?.truck_color ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_color: ev.target.value
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <BaseInput
                  required
                  label={'KM'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem'
                    }
                  }}
                  value={body?.truck_km ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_km: ev.target.value
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <BaseInput
                  required
                  label={'Número Chassi'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem'
                    }
                  }}
                  value={body?.truck_chassis ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_chassis: ev.target.value
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <BaseInput
                  required
                  label={'Ano Fabricação'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem'
                    }
                  }}
                  value={body?.truck_year ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_year: ev.target.value
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
        </>
      )}

      {loadingUpdate && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalUpdateTruck;
