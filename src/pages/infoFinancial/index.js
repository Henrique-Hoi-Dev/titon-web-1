import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { moneyMask } from 'utils/masks';
import { IconMenuTruck } from 'assets/icons/icons';
import { formatDate } from 'utils/formatDate';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getFinancialByIdRequest } from 'store/modules/financial/financialSlice';

import BaseNotFound from 'components/molecules/BaseNotFound/BaseNotFound';
import BaseTypeStatus from 'components/molecules/BaseTypeStatus/BaseTypeStatus';
import BaseModalFinalizeRecord from 'components/molecules/BaseModalFinalizeRecord/BaseModalFinalizeRecord';
import BaseModalAddFreight from 'components/molecules/BaseModalAddFreight/BaseModalAddFreight';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseModalCheck from 'components/molecules/BaseModalCheck/BaseModalCheck';
import Text from 'components/atoms/BaseText/BaseText';
import Button from 'components/atoms/BaseButton/BaseButton';
import Table from './table';
import initialStateQuery from 'utils/initialStateQuery';

const InfoFinancial = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: financial, loading } = useSelector(
    (state) => state.financial
  );

  const [userQuery, setUserQuery] = useState(
    initialStateQuery.INITIAL_STATE_FINANCIAL
  );

  const [checkId, setCheckId] = useState('');

  const [showModalFinalizeRecord, setShowModalFinalizeRecord] = useState(false);
  const [showModalAddFreight, setShowModalAddFreight] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);

  const handleCheck = (freightId, driverId) => {
    if (!freightId || !driverId) return;
    setCheckId({ freightId, driverId });
    setShowModalCheck(!showModalCheck);
  };

  useEffect(() => {
    if (id) {
      dispatch(getFinancialByIdRequest(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Grid component="form" maxWidth="1200px" height="760px" maxHeight="760px">
        <BaseContentHeader mt={2}>
          <BaseTitle>
            {financial?.dataResult?.truck_board?.toUpperCase()}
          </BaseTitle>
        </BaseContentHeader>

        <Grid container justifyContent="flex-start" padding="30px 0px">
          <Grid item xs={6} md={3} lg={3} container flexDirection="column">
            <Card
              sx={{
                p: '16px',
                boxShadow: 'none!important',
                backgroundColor: 'transparent',
                color: 'white'
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px'
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    fontSize: '1.2rem'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="185px"
                    sx={{ borderRadius: '4px' }}
                    image={financial?.dataResult?.truck_avatar}
                    alt="truck"
                  />
                </Typography>

                <Grid
                  item
                  container
                  mt={2}
                  height="100%"
                  flexDirection="column"
                  sx={{
                    color: '#F1F3F9',
                    fontWeight: '400',
                    lineHeight: '25px'
                  }}
                >
                  <Grid container item pb={2} justifyContent="space-between">
                    <BaseTypeStatus props={financial?.dataResult?.freight} />
                  </Grid>

                  <Grid container item justifyContent="space-between">
                    <Text fontsize="16px">{t('info_financial.driver')}:</Text>
                    <Text fontsize="16px">
                      {financial?.dataResult?.driver_name}
                    </Text>
                  </Grid>

                  <Grid container item justifyContent="space-between">
                    <Text fontsize="16px">
                      {t('info_financial.startDate')}:
                    </Text>
                    <Text fontsize="16px">
                      {formatDate(financial?.dataResult?.start_date)}
                    </Text>
                  </Grid>

                  <Grid container item justifyContent="space-between">
                    <Text fontsize="16px">{t('info_financial.destiny')}:</Text>
                    <Text fontsize="16px">
                      {financial?.dataResult?.freight[0]?.finalFreightCity?.toUpperCase()}
                    </Text>
                  </Grid>

                  <Grid container item justifyContent="space-between">
                    <Text fontsize="16px">{t('info_financial.credit')}:</Text>
                    <Text fontsize="16px">
                      {moneyMask(financial?.dataResult?.driver?.credit || [0])}
                    </Text>
                  </Grid>

                  <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="flex-end"
                  >
                    <IconMenuTruck
                      sx={{ fontSize: '30px', color: '#509BFB', mr: 1 }}
                    />
                    <Text fontsize="16px" sx={{ verticalAlign: 'super' }}>
                      {financial?.dataResult?.cart_models}
                    </Text>
                  </Grid>
                </Grid>
              </CardContent>

              <Grid item container mt={18} xs={10} md={10} lg={10}>
                <Text
                  fontSize="24px"
                  sx={{ verticalAlign: 'super', fontWeight: '700' }}
                >
                  {t('info_financial.invoicing')}:{' '}
                  <Text fontSize="24px" sx={{ fontWeight: '500' }}>
                    {moneyMask(financial?.dataResult?.total_value || [0])}
                  </Text>
                </Text>

                <Button
                  onClick={() =>
                    setShowModalFinalizeRecord(!showModalFinalizeRecord)
                  }
                  background="#F03D3D"
                  sx={{
                    width: '153px',
                    mt: 2,
                    height: '49px',
                    '&:hover': {
                      backgroundColor: '#F03D3D'
                    }
                  }}
                >
                  {t('info_financial.button.finalize_form')}
                </Button>
              </Grid>
            </Card>
          </Grid>

          <Grid
            item
            container
            xs={6}
            md={9}
            lg={9}
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Text fontSize="24px" color="#F1F3F9">
              {t('info_financial.notifications')}
            </Text>

            <Grid
              item
              container
              alignItems="center"
              justifyContent={
                financial?.dataResult?.notifications.length > 0
                  ? 'space-between'
                  : 'center'
              }
              borderRadius="4px"
              padding={2}
              m="12px 0 40px"
              sx={{
                background: '#CCD6EB',
                overflow: 'auto',
                maxHeight: '180px',
                height: '180px'
              }}
            >
              {financial?.dataResult?.notifications.length === 0 && (
                <BaseNotFound />
              )}

              {financial?.dataResult?.notifications?.map((item) => (
                <Grid
                  container
                  justifyContent="space-between"
                  onClick={() => handleCheck(item?.freight_id, item?.driver_id)}
                  key={item?.id}
                  sx={{
                    cursor: `${
                      !item?.freight_id || !item?.driver_id ? '' : 'pointer'
                    }`
                  }}
                >
                  <Text
                    color="#2B2B2C"
                    font_weight="600"
                    sx={{ maxWidth: '690px' }}
                  >
                    {item?.content}
                  </Text>
                  <Text font_weight="600" color="#2B2B2C">
                    {formatDate(item?.createdAt)}
                  </Text>
                  <Divider
                    sx={{
                      my: 1,
                      mt: 1,
                      width: '100%',
                      opacity: '0.5',
                      background: '#2B2B2C'
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Grid
              item
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              maxHeight="270px"
              height="270px"
              overflow="auto"
            >
              <Table
                data={financial}
                query={userQuery}
                setQuery={setUserQuery}
                error={financial?.error}
                loading={loading}
              />
            </Grid>

            <Grid
              item
              container
              justifyContent="flex-end"
              alignItems="flex-end"
              m="20px 0 0 0"
            >
              <IconButton
                aria-label="add cards"
                onClick={() => setShowModalAddFreight(!showModalAddFreight)}
                component="label"
                sx={{
                  color: '#F1F3F9',
                  background: '#1877F2',
                  '&:hover': {
                    background: '#1877F2',
                    opacity: '0.8'
                  }
                }}
              >
                <HiOutlinePlusSm fontSize="42px" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {showModalAddFreight && (
        <BaseModalAddFreight
          financialId={id}
          showModal={showModalAddFreight}
          setShowModal={setShowModalAddFreight}
        />
      )}

      {showModalFinalizeRecord && (
        <BaseModalFinalizeRecord
          mutate={() => {}}
          financialId={id}
          props={financial}
          setShowModal={setShowModalFinalizeRecord}
          showModal={showModalFinalizeRecord}
        />
      )}

      {showModalCheck && (
        <BaseModalCheck
          checkId={checkId}
          showModal={showModalCheck}
          setShowModal={setShowModalCheck}
          mutate={() => {}}
        />
      )}
    </>
  );
};

export default InfoFinancial;
