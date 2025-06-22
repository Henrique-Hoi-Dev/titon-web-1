import React, { useEffect, useCallback, useRef } from 'react';
import { Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  freightStatusApprovedRequest,
  freightStatusDeniedRequest,
  getFirstCheckByIdRequest,
  resetFreightStatusApproved,
  resetFreightStatusDenied,
} from '@/store/modules/freight/freightSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseText from 'components/atoms/BaseText/BaseText';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BaseButton from '@/components/atoms/BaseButton/BaseButton';

const DataRow = ({ label, value, color }) => (
  <Grid
    container
    item
    justifyContent="space-between"
    alignItems="center"
    sx={{
      py: 1.5,
      '&:last-child': {
        borderBottom: 'none',
      },
    }}
  >
    <BaseText color="#939395">{label}</BaseText>
    <BaseText fontsize={'18px'} sx={{ fontWeight: 'bold' }} color={color}>
      {value}
    </BaseText>
  </Grid>
);

const BaseModalFreight = ({ showModal, setShowModal, freight, handleRefresh }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const hasExecuted = useRef(false);

  const {
    selectedFirstCheck,
    loadingFirstCheck,
    loadingStatusApproved,
    loadingStatusDenied,
    successStatusApproved,
    successStatusDenied,
  } = useSelector((state) => state?.freight);

  const handleSubmit = (ev, status) => {
    ev.preventDefault();

    if (status === 'APPROVED') {
      dispatch(
        freightStatusApprovedRequest({
          id: freight?.freightId,
          financial_id: id,
          data: {},
        })
      );
    } else if (status === 'DENIED') {
      dispatch(
        freightStatusDeniedRequest({
          id: freight?.freightId,
          financial_id: id,
          data: {},
        })
      );
    }
  };

  const onClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  useEffect(() => {
    if ((successStatusApproved || successStatusDenied) && !hasExecuted.current) {
      hasExecuted.current = true;
      dispatch(resetFreightStatusApproved());
      dispatch(resetFreightStatusDenied());
      handleRefresh();
      onClose();
    }
  }, [successStatusApproved, successStatusDenied, dispatch, handleRefresh, onClose]);

  useEffect(() => {
    if (freight?.freightId) {
      dispatch(getFirstCheckByIdRequest(freight?.freightId));
    }
  }, [freight?.freightId, dispatch]);

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      maxWidth="770px"
      sx={{ p: '15px !important' }}
    >
      <BaseContentHeader>
        <BaseTitle sxGridText={{ justifyContent: 'center' }}>
          {selectedFirstCheck?.startFreightCity?.toUpperCase()}{' '}
          <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />{' '}
          {selectedFirstCheck?.endFreightCity?.toUpperCase()}
        </BaseTitle>
      </BaseContentHeader>

      {!loadingFirstCheck && !loadingStatusApproved && !loadingStatusDenied && (
        <Grid
          container
          direction="column"
          p="0 24px"
          mt="30px"
          sx={{
            minHeight: '300px',
            backgroundColor: '#343434',
            borderRadius: '8px',
          }}
        >
          <DataRow
            label={t('modal.previous_average')}
            value={selectedFirstCheck?.previousAverage}
          />
          <DataRow
            label={t('modal.fuel_estimate')}
            value={selectedFirstCheck?.fuelEstimate}
            color="#F03D3D"
          />
          <Divider sx={{ backgroundColor: '#939395' }} />
          <DataRow label={t('modal.trip_km')} value={selectedFirstCheck?.distance} />
          <DataRow
            label={t('modal.total_shipping')}
            value={selectedFirstCheck?.fullFreight}
            color="#0BB07B"
          />
          <DataRow label={t('modal.fuel_consumption')} value={selectedFirstCheck?.consumption} />
          <Divider sx={{ backgroundColor: '#939395' }} />

          <DataRow
            label={t('modal.driver_commission')}
            value={selectedFirstCheck?.driverCommission}
            color="#F03D3D"
          />
          <DataRow label={t('modal.km_price')} value={selectedFirstCheck?.kmPrice} />
          <DataRow
            label={t('modal.net_shipping')}
            value={selectedFirstCheck?.leftoverLiquid}
            color="#0BB07B"
          />
          <DataRow
            label={t('modal.liquid_surplus')}
            value={selectedFirstCheck?.netFreight}
            color="#0BB07B"
          />
        </Grid>
      )}

      {selectedFirstCheck?.status === 'PENDING' &&
        !loadingFirstCheck &&
        !loadingStatusApproved &&
        !loadingStatusDenied && (
          <Grid container spacing={2} p="30px 24px 24px 24px" justifyContent={'flex-end'}>
            <Grid item>
              <BaseButton
                onClick={(ev) => handleSubmit(ev, 'DENIED')}
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
            <Grid item>
              <BaseButton
                onClick={(ev) => handleSubmit(ev, 'APPROVED')}
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

      {(loadingFirstCheck || loadingStatusApproved || loadingStatusDenied) && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalFreight;
