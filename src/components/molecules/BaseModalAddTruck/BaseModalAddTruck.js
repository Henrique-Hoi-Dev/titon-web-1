import React, { useEffect, useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createTruckRequest } from 'store/modules/truck/truckSlice';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'base';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/BaseButton/BaseButton';
import Modal from 'components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import Progress from 'components/atoms/progress/progress';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseAvatar from '@/components/molecules/BaseAvatar/BaseAvatar';

const ModalAddTruck = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.truck);

  const [body, setBody] = useState({});
  const [preview, setPreview] = useState(
    'https://titon-file-storage.s3.us-east-1.amazonaws.com/images-public/exemple-truck.webp'
  );
  const [progressPercent, setProgressPercent] = useState(0);

  const onClose = () => {
    setShowModal(false);
    setBody({});
    setPreview('');
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(createTruckRequest(body));
  };

  useEffect(() => {
    setBody((state) => ({
      ...state,
      truck_avatar: preview
    }));
  }, [preview, setPreview]);

  async function handleChange(e) {
    const file = e.target.files[0];

    if (!file) return null;
    const storageRef = ref(storage, `avatar/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('avatar', downloadURL);
          setPreview(downloadURL);
        });
      }
    );
  }

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
      maxHeight={'850px'}
    >
      <ContentHeader mt={2}>
        <Title>{t('modal_truck.title')}</Title>
      </ContentHeader>

      {!loading && (
        <>
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
                      : 'exemple-truck.webp'
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
                  label={t('modal_truck.placeholder.mark')}
                  labelText={t('modal_truck.label.mark')}
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
                  value={body?.truck_models ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_models: ev.target.value
                    }))
                  }
                />
              </Grid>

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
                  value={body?.truck_board ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_board: ev.target.value
                    }))
                  }
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <BaseInput
                  required
                  label={t('modal_truck.placeholder.color')}
                  labelText={t('modal_truck.label.color')}
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

              <Grid item xs={6} md={6} lg={6}>
                <BaseInput
                  required
                  label={t('modal_truck.placeholder.truck_km')}
                  labelText={t('modal_truck.label.truck_km')}
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

              <Grid item xs={6} md={6} lg={6}>
                <BaseInput
                  required
                  label={t('modal_truck.placeholder.chassis_number')}
                  labelText={t('modal_truck.label.chassis_number')}
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

              <Grid item xs={12} md={6} lg={6}>
                <BaseInput
                  required
                  label={t('modal_truck.placeholder.year_manufacture')}
                  labelText={t('modal_truck.label.year_manufacture')}
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
                {t('button.register')}
              </Button>
            </Grid>
          </Grid>
        </>
      )}

      {loading && <BaseLoading />}
    </Modal>
  );
};

export default ModalAddTruck;
