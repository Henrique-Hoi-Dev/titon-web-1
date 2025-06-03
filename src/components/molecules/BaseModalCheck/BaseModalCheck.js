import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { successNotification, errorNotification } from 'utils/notification';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

import Loading from '@/components/atoms/BaseLoading/BaseLoading';
import Text from 'components/atoms/BaseText/BaseText';
import Modal from 'components/molecules/BaseModal/BaseModal';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BaseModalCheck = ({ showModal, setShowModal, mutate, checkId }) => {
  const { t } = useTranslation();

  const [, setFetch] = useState(false);
  const [, setBody] = useState({});

  const user = useSelector((state) => state?.user);

  const handleGetData = () => {
    // Implementar lógica de get aqui
  };

  const handleUpdateData = () => {
    // Implementar lógica de update aqui
  };

  const { data: checks, isValidating } = handleGetData();

  const { data, isFetching, error } = handleUpdateData();

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
      user_id: user?.data?.userProps?.id,
      driver_id: checkId?.driverId
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      onClose();
      // mutate()
      successNotification(data?.success?.responseData?.msg);
    } else if (error?.response?.data?.httpStatus === 400) {
      errorNotification(error?.response?.data?.responseData?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Modal open={showModal} onClose={onClose} component="form" maxWidth="770px">
      <ContentHeader
        mt={2}
        sx={{
          borderBottom: '2px solid #fff',
          width: '96% !important'
        }}
      >
        <Title sxGridText={{ justifyContent: 'center' }}>
          {checks?.responseData?.start_freight_city.toUpperCase()}{' '}
          <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />{' '}
          {checks?.responseData?.final_freight_city.toUpperCase()}
        </Title>
      </ContentHeader>

      {!isFetching && error && (
        <Grid item container justifyContent="center">
          <Text sx={{ color: 'red' }}>
            {`Erro: ${error?.response?.data?.dataResult?.msg}`}
          </Text>
        </Grid>
      )}

      {!isFetching && !isValidating && (
        <Grid container item spacing={2} mt={1} sx={{ minHeight: '300px' }}>
          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <Text>{t('modal.previous_average')}</Text>
            <Text fontsize={'24px'}>
              {checks?.responseData?.previous_average}
            </Text>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <Text>{t('modal.fuel_estimate')}</Text>
            <Text fontsize={'24px'} color="#F03D3D">
              {checks?.responseData?.fuel_estimate}
            </Text>
          </Grid>

          <Grid item md={3} lg={3} container flexDirection={'column'}>
            <Text>{t('modal.liquid_surplus')}</Text>
            <Text fontsize={'24px'} color="#0BB07B">
              {checks?.responseData?.net_freight}
            </Text>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <Text>{t('modal.trip_km')}</Text>
            <Text fontsize={'24px'}>{checks?.responseData?.distance}</Text>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <Text>{t('modal.total_shipping')}</Text>
            <Text fontsize={'24px'} color="#0BB07B">
              {checks?.responseData?.full_freight}
            </Text>
          </Grid>
          <Grid item md={3} lg={3} container flexDirection={'column'}>
            <Text> </Text>
            <Text fontsize={'24px'}> </Text>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <Text>{t('modal.fuel_consumption')}</Text>
            <Text fontsize={'24px'}>{checks?.responseData?.consumption}</Text>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <Text>{t('modal.driver_commission')}</Text>
            <Text fontsize={'24px'} color="#F03D3D">
              {checks?.responseData?.driver_commission}
            </Text>
          </Grid>
          <Grid item md={3} lg={3} container flexDirection={'column'}>
            <Text> </Text>
            <Text fontsize={'24px'}> </Text>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <Text>{t('modal.km_price')}</Text>
            <Text fontsize={'24px'}>{checks?.responseData?.KM_price}</Text>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={'column'}>
            <Text>{t('modal.net_shipping')}</Text>
            <Text fontsize={'24px'} color="#0BB07B">
              {checks?.responseData?.leftover_liquid}
            </Text>
          </Grid>
          <Grid item md={3} lg={3} container flexDirection={'column'}>
            <Text> </Text>
            <Text fontsize={'24px'}></Text>
          </Grid>
        </Grid>
      )}

      {checks?.responseData?.status === 'PENDING' &&
        !isFetching &&
        !isValidating && (
          <Grid container item spacing={2} mt={1} justifyContent="flex-end">
            <Grid container item xs={12} md={3} lg={3}>
              <Button
                onClick={(ev) =>
                  setBody((state) => ({ ...state, status: 'DENIED' })) ||
                  handleSubmit(ev)
                }
                disableRipple
                variant="outlined"
                sx={{
                  width: '141px',
                  height: '49px',
                  marginRight: '15px',
                  color: '#fff'
                }}
              >
                {t('button.disapprove')}
              </Button>
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <Button
                onClick={(ev) =>
                  setBody((state) => ({ ...state, status: 'APPROVED' })) ||
                  handleSubmit(ev)
                }
                type="submit"
                background={
                  'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                }
                sx={{
                  color: 'white',
                  width: '141px',
                  height: '49px',
                  marginRight: '15px'
                }}
              >
                {t('button.approved')}
              </Button>
            </Grid>
          </Grid>
        )}

      {isFetching && <Loading />}
      {isValidating && <Loading />}
    </Modal>
  );
};

export default BaseModalCheck;
