import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { getFirstCheckByIdRequest } from '@/store/modules/freight/freightSlice';
import { useDispatch } from 'react-redux';

import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseText from 'components/atoms/BaseText/BaseText';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
          {selectedFirstCheck?.startFreightCity.toUpperCase()}{' '}
          <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />{' '}
          {selectedFirstCheck?.finalFreightCity.toUpperCase()}
        </BaseTitle>
      </BaseContentHeader>

      {!loadingFirstCheck && (
        <Grid container item spacing={2} mt={1} sx={{ minHeight: '300px' }}>
          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <BaseText>{t('modal.previous_average')}</BaseText>
            <BaseText fontsize={'24px'}>{selectedFirstCheck?.previousAverage}</BaseText>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <BaseText>{t('modal.fuel_estimate')}</BaseText>
            <BaseText fontsize={'24px'} color="#F03D3D">
              {selectedFirstCheck?.fuelEstimate}
            </BaseText>
          </Grid>

          <Grid item md={3} lg={3} container flexDirection={'column'}>
            <BaseText>{t('modal.liquid_surplus')}</BaseText>
            <BaseText fontsize={'24px'} color="#0BB07B">
              {selectedFirstCheck?.netFreight}
            </BaseText>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <BaseText>{t('modal.trip_km')}</BaseText>
            <BaseText fontsize={'24px'}>{selectedFirstCheck?.distance}</BaseText>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <BaseText>{t('modal.total_shipping')}</BaseText>
            <BaseText fontsize={'24px'} color="#0BB07B">
              {selectedFirstCheck?.fullFreight}
            </BaseText>
          </Grid>
          <Grid item md={3} lg={3} container flexDirection={'column'}>
            <BaseText> </BaseText>
            <BaseText fontsize={'24px'}> </BaseText>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <BaseText>{t('modal.fuel_consumption')}</BaseText>
            <BaseText fontsize={'24px'}>{selectedFirstCheck?.consumption}</BaseText>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <BaseText>{t('modal.driver_commission')}</BaseText>
            <BaseText fontsize={'24px'} color="#F03D3D">
              {selectedFirstCheck?.driverCommission}
            </BaseText>
          </Grid>
          <Grid item md={3} lg={3} container flexDirection={'column'}>
            <BaseText> </BaseText>
            <BaseText fontsize={'24px'}> </BaseText>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <BaseText>{t('modal.km_price')}</BaseText>
            <BaseText fontsize={'24px'}>{selectedFirstCheck?.kmPrice}</BaseText>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <BaseText>{t('modal.net_shipping')}</BaseText>
            <BaseText fontsize={'24px'} color="#0BB07B">
              {selectedFirstCheck?.leftoverLiquid}
            </BaseText>
          </Grid>
          <Grid item md={3} lg={3} container flexDirection={'column'}>
            <BaseText> </BaseText>
            <BaseText fontsize={'24px'}></BaseText>
          </Grid>
        </Grid>
      )}

      {selectedFirstCheck?.status === 'PENDING' && !loadingFirstCheck && (
        <Grid container item spacing={2} mt={1} justifyContent="flex-end">
          <Grid container item xs={12} md={3} lg={3}>
            <Button
              onClick={(ev) =>
                setBody((state) => ({ ...state, status: 'DENIED' })) || handleSubmit(ev)
              }
              disableRipple
              variant="outlined"
              sx={{
                width: '141px',
                height: '49px',
                marginRight: '15px',
                color: '#fff',
              }}
            >
              {t('button.disapprove')}
            </Button>
          </Grid>
          <Grid container item xs={12} md={3} lg={3}>
            <Button
              onClick={(ev) =>
                setBody((state) => ({ ...state, status: 'APPROVED' })) || handleSubmit(ev)
              }
              type="submit"
              background={'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'}
              sx={{
                color: 'white',
                width: '141px',
                height: '49px',
                marginRight: '15px',
              }}
            >
              {t('button.approved')}
            </Button>
          </Grid>
        </Grid>
      )}

      {loadingFirstCheck && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalFreight;
