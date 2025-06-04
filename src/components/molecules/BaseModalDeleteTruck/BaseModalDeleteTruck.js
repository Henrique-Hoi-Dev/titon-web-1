import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { deleteTruckRequest } from 'store/modules/truck/truckSlice';

import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseText from 'components/atoms/BaseText/BaseText';

const BaseModalDeleteTruck = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { loadingDelete } = useSelector((state) => state.truck);

  const onClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(deleteTruckRequest(data.id));
  };

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="600px"
    >
      <BaseContentHeader>
        <BaseTitle fontSize={'24px'}>Deseja excluir: {data.name}?</BaseTitle>
      </BaseContentHeader>

      {!loadingDelete && (
        <>
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
                Após excluir os registros do caminhão serão perdidos.
              </BaseText>
            </Grid>
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2}>
            <Grid
              container
              item
              xs={6}
              md={6}
              lg={6}
              justifyContent={'flex-end'}
            >
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
            <Grid
              container
              item
              xs={6}
              md={6}
              lg={6}
              justifyContent={'flex-start'}
            >
              <BaseButton
                type="submit"
                background={
                  'linear-gradient(224.78deg, #FF4B4B 8.12%, #FF0000 92.21%)'
                }
                sx={{
                  width: '140px',
                  height: '49px',
                  color: 'white'
                }}
              >
                {t('button.delete')}
              </BaseButton>
            </Grid>
          </Grid>
        </>
      )}
      {loadingDelete && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalDeleteTruck;
