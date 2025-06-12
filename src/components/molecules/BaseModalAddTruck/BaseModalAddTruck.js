import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Grid, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createTruckRequest, resetTruckCreate } from 'store/modules/truck/truckSlice';
import { useTranslation } from 'react-i18next';
import { uploadImage } from '@/services/uploadImage';
import { errorNotification } from '@/utils/notification';

import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseAvatar from '@/components/molecules/BaseAvatar/BaseAvatar';

const ModalAddTruck = ({ showModal, setShowModal, onCreated }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loadingCreate: loading } = useSelector((state) => state.truck);

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState({});
  const [loadingImage, setLoadingImage] = useState(false);

  const [body, setBody] = useState({});

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const onClose = useCallback(() => {
    if (!isMountedRef.current) return;
    setShowModal(false);
    setBody({});
    setPreviewImage({});
    setFile(null);
    dispatch(resetTruckCreate());
  }, [setShowModal, dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreviewImage(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      createTruckRequest({
        ...body,
        onSuccess: async (createdTruckId) => {
          if (!isMountedRef.current) return;

          try {
            if (file && createdTruckId) {
              setLoadingImage(true);

              await uploadImage({
                url: 'manager/truck/upload-image',
                file,
                id: createdTruckId,
                body: { category: 'avatar_truck' },
              });

              setLoadingImage(false);
            }

            if (!isMountedRef.current) return;

            if (typeof onCreated === 'function') {
              onCreated();
            }

            onClose();
          } catch (error) {
            setLoadingImage(false);
            if (isMountedRef.current) errorNotification(error);
          }
        },
      })
    );
  };

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
        <BaseTitle>{t('button.add_new_truck')}</BaseTitle>
      </BaseContentHeader>

      {!loading && !loadingImage && (
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
              sx={{ cursor: 'pointer' }}
            >
              <IconButton
                color="info"
                aria-label="upload picture"
                component="label"
                sx={{
                  background: 'transparent',
                  '&:hover': {
                    background: 'transparent',
                  },
                }}
              >
                <input hidden accept="image/*" type="file" onChange={handleChange} />
                <BaseAvatar
                  src={previewImage}
                  styles={{
                    height: 'auto',
                    width: '200px',
                    borderRadius: '8px',
                  }}
                />
              </IconButton>
            </Grid>

            <Grid container item xs={12} md={12} lg={12} spacing={1.5} flexWrap={'wrap'}>
              {[
                { name: 'truck_name_brand', label: 'mark' },
                { name: 'truck_models', label: 'model' },
                { name: 'truck_board', label: 'plate', maxLength: 7 },
                { name: 'truck_color', label: 'color' },
                { name: 'truck_km', label: 'truck_km' },
                { name: 'truck_chassis', label: 'chassis_number' },
                { name: 'truck_year', label: 'year_manufacture' },
              ].map((field) => (
                <Grid item xs={6} md={6} lg={field.name === 'truck_year' ? 12 : 6} key={field.name}>
                  <BaseInput
                    required
                    label={t(`modal_truck.placeholder.${field.label}`)}
                    labelText={t(`modal_truck.label.${field.label}`)}
                    maxLength={field.maxLength}
                    styles={{
                      maxWidth: '274px',
                      '& .MuiInputBase-input.MuiOutlinedInput-input': {
                        height: '1.4rem',
                      },
                    }}
                    value={body?.[field.name] ?? ''}
                    onChange={(ev) =>
                      setBody((state) => ({
                        ...state,
                        [field.name]:
                          field.name === 'truck_board'
                            ? ev.target.value.toUpperCase()
                            : ev.target.value,
                      }))
                    }
                  />
                </Grid>
              ))}
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
                onClick={() => setShowModal(false)}
                background={''}
                sx={{
                  width: '140px',
                  height: '49px',
                  border: '1px solid #509BFB',
                  color: '#FFF',
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
                background={'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'}
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '139px',
                  height: '49px',
                  marginRight: '15px',
                }}
              >
                {t('button.register')}
              </BaseButton>
            </Grid>
          </Grid>
        </>
      )}

      {(loading || loadingImage) && <BaseLoading />}
    </BaseModal>
  );
};

export default ModalAddTruck;
