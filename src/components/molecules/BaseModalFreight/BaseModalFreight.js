import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getFirstCheckByIdRequest } from '@/store/modules/freight/freightSlice';
import { useDispatch } from 'react-redux';

import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseText from 'components/atoms/BaseText/BaseText';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BaseButton from '@/components/atoms/BaseButton/BaseButton';

const BaseModalFreight = ({ showModal, setShowModal, freight }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [, setFetch] = useState(false);
  const [, setBody] = useState({});

  const user = useSelector((state) => state?.auth?.user);
  const { selectedFirstCheck, loadingFirstCheck } = useSelector((state) => state?.freight);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setBody((state) => ({
      ...state,
      user_id: user?.id,
      driver_id: freight?.driverId,
    }));
  }, [freight?.driverId, freight?.freightId, user?.id]);

  useEffect(() => {
    if (freight?.freightId) {
      dispatch(getFirstCheckByIdRequest(freight?.freightId));
    }
  }, [freight?.freightId, dispatch]);

  return (
    <BaseModal open={showModal} onClose={onClose} component="form" maxWidth="770px">
      <BaseContentHeader
        mt={2}
        sx={{
          borderBottom: '2px solid #fff',
          width: '96% !important',
        }}
      >
        <BaseTitle sxGridText={{ justifyContent: 'center' }}>
          {selectedFirstCheck?.startFreightCity?.toUpperCase()}{' '}
          <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />{' '}
          {selectedFirstCheck?.endFreightCity?.toUpperCase()}
        </BaseTitle>
      </BaseContentHeader>

      {!loadingFirstCheck && (
        <Grid container spacing={2} mt={1} ml={1} mb={1} sx={{ minHeight: '300px' }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <BaseText>{t('modal.previous_average')}</BaseText>
              <BaseText fontsize={'24px'}>{selectedFirstCheck?.previousAverage}</BaseText>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <BaseText>{t('modal.fuel_estimate')}</BaseText>
              <BaseText fontsize={'24px'} color="#F03D3D">
                {selectedFirstCheck?.fuelEstimate}
              </BaseText>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <BaseText>{t('modal.liquid_surplus')}</BaseText>
              <BaseText fontsize={'24px'} color="#0BB07B">
                {selectedFirstCheck?.netFreight}
              </BaseText>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <BaseText>{t('modal.trip_km')}</BaseText>
              <BaseText fontsize={'24px'}>{selectedFirstCheck?.distance}</BaseText>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <BaseText>{t('modal.total_shipping')}</BaseText>
              <BaseText fontsize={'24px'} color="#0BB07B">
                {selectedFirstCheck?.fullFreight}
              </BaseText>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <BaseText>{t('modal.fuel_consumption')}</BaseText>
              <BaseText fontsize={'24px'}>{selectedFirstCheck?.consumption}</BaseText>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <BaseText>{t('modal.driver_commission')}</BaseText>
              <BaseText fontsize={'24px'} color="#F03D3D">
                {selectedFirstCheck?.driverCommission}
              </BaseText>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <BaseText>{t('modal.km_price')}</BaseText>
              <BaseText fontsize={'24px'}>{selectedFirstCheck?.kmPrice}</BaseText>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <BaseText>{t('modal.net_shipping')}</BaseText>
              <BaseText fontsize={'24px'} color="#0BB07B">
                {selectedFirstCheck?.leftoverLiquid}
              </BaseText>
            </Box>
          </Grid>
        </Grid>
      )}

      {selectedFirstCheck?.status === 'PENDING' && !loadingFirstCheck && (
        <Grid container xs={12} md={12} lg={12} spacing={1} mt={0.3} justifyContent={'flex-end'}>
          <Grid item container xs={3} md={3} lg={3}>
            <BaseButton
              onClick={(ev) =>
                setBody((state) => ({ ...state, status: 'DENIED' })) || handleSubmit(ev)
              }
              background={'linear-gradient(224.78deg, #F03D3D 8.12%,rgb(138, 23, 23) 92.21%)'}
              sx={{
                width: '141px',
                height: '49px',
                color: '#fff',
              }}
            >
              {t('button.disapprove')}
            </BaseButton>
          </Grid>
          <Grid item container xs={3} md={3} lg={3}>
            <BaseButton
              onClick={(ev) =>
                setBody((state) => ({ ...state, status: 'APPROVED' })) || handleSubmit(ev)
              }
              type="submit"
              background={'linear-gradient(224.78deg, #0BB07B 8.12%,rgb(3, 112, 81) 92.21%)'}
              sx={{
                color: 'white',
                width: '141px',
                height: '49px',
              }}
            >
              {t('button.approved')}
            </BaseButton>
          </Grid>
        </Grid>
      )}

      {loadingFirstCheck && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalFreight;
