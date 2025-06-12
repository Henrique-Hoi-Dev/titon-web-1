import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Divider, Grid, IconButton, Typography } from '@mui/material';
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
import BaseModalFreight from '@/components/molecules/BaseModalFreight/BaseModalFreight';
import BaseText from 'components/atoms/BaseText/BaseText';
import BaseButton from 'components/atoms/BaseButton/BaseButton';
import Table from './table';

const InfoFinancial = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selected: financial, loadingById } = useSelector((state) => state.financial);

  const [freight, setFreight] = useState('');

  const [showModalFinalizeRecord, setShowModalFinalizeRecord] = useState(false);
  const [showModalAddFreight, setShowModalAddFreight] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);

  const handleCheck = (freightId, driverId) => {
    if (!freightId || !driverId) return;
    setFreight({ freightId, driverId });
    setShowModalCheck(!showModalCheck);
  };

  useEffect(() => {
    if (id) {
      dispatch(getFinancialByIdRequest(id));
    }
  }, [dispatch, id]);

  const getAvatar = (id, category) => {
    if (id) {
      return `https://titon-file-storage.s3.us-east-1.amazonaws.com/${category}/${id}`;
    }
    return 'https://titon-file-storage.s3.us-east-1.amazonaws.com/images-public/exemple-truck.webp';
  };

  return (
    <>
      <Grid component="form" maxWidth="1200px" height="760px" maxHeight="760px">
        <BaseContentHeader mt={2}>
          <BaseTitle>{financial?.truckBoard?.toUpperCase()}</BaseTitle>
        </BaseContentHeader>

        <Grid container justifyContent="flex-start" padding="30px 0px">
          <Grid item xs={6} md={3} lg={3} container flexDirection="column">
            <Card
              sx={{
                p: '16px',
                boxShadow: 'none!important',
                backgroundColor: 'transparent',
                color: 'white',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px',
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    fontSize: '1.2rem',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ borderRadius: '4px', width: '268px', height: '268px' }}
                    image={getAvatar(
                      financial?.truck?.imageTruck?.uuid,
                      financial?.truck?.imageTruck?.category
                    )}
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
                    lineHeight: '25px',
                  }}
                  gap={1}
                >
                  <Grid container item pb={2} justifyContent="space-between"></Grid>

                  <Grid container item justifyContent="space-between">
                    <BaseText fontsize="16px">{t('info_financial.driver')}:</BaseText>
                    <BaseText fontsize="16px">{financial?.driver?.name}</BaseText>
                  </Grid>

                  <Grid container item justifyContent="space-between">
                    <BaseText fontsize="16px">{t('card_financial.label2')}</BaseText>
                    <BaseText fontsize="16px">{formatDate(financial?.startDate)}</BaseText>
                  </Grid>

                  <Grid container item justifyContent="space-between">
                    <BaseText fontsize="16px">{t('card_financial.status')}</BaseText>
                    <BaseTypeStatus props={financial?.freight} />
                  </Grid>

                  <Grid container item justifyContent="space-between">
                    <BaseText fontsize="16px">{t('info_financial.start')}:</BaseText>
                    <BaseText fontsize="16px">
                      {financial?.freight[0]?.startFreightCity?.toUpperCase()}
                    </BaseText>
                  </Grid>

                  <Grid container item justifyContent="space-between">
                    <BaseText fontsize="16px">{t('info_financial.destiny')}:</BaseText>
                    <BaseText fontsize="16px">
                      {financial?.freight[0]?.finalFreightCity?.toUpperCase()}
                    </BaseText>
                  </Grid>

                  <Grid container item justifyContent="space-between">
                    <BaseText fontsize="16px">{t('info_financial.credit')}:</BaseText>
                    <BaseText fontsize="16px">{moneyMask(financial?.driver?.credit || 0)}</BaseText>
                  </Grid>

                  <Grid container justifyContent="flex-start" alignItems="flex-end">
                    <IconMenuTruck sx={{ fontSize: '30px', color: '#509BFB', mr: 1 }} />
                    <BaseText fontsize="16px" sx={{ verticalAlign: 'super' }}>
                      {financial?.cartModels}
                    </BaseText>
                  </Grid>
                </Grid>
              </CardContent>

              <Grid item container mt={18} xs={10} md={10} lg={10}>
                <BaseText fontSize="24px" sx={{ verticalAlign: 'super', fontWeight: '700' }}>
                  {t('info_financial.invoicing')}:{' '}
                  <span style={{ fontWeight: '500' }}>{moneyMask(financial?.totalValue || 0)}</span>
                </BaseText>

                <BaseButton
                  onClick={() => setShowModalFinalizeRecord(!showModalFinalizeRecord)}
                  background="#F03D3D"
                  sx={{
                    width: '153px',
                    mt: 2,
                    height: '49px',
                    '&:hover': {
                      backgroundColor: '#F03D3D',
                    },
                  }}
                >
                  {t('info_financial.button.finalize_form')}
                </BaseButton>
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
            <BaseText fontSize="24px" color="#F1F3F9">
              {t('info_financial.notifications')}
            </BaseText>

            <Grid
              item
              container
              alignItems="center"
              justifyContent={financial?.notifications.length > 0 ? 'space-between' : 'center'}
              borderRadius="4px"
              padding={2}
              m="12px 0 40px"
              sx={{
                background: '#CCD6EB',
                overflow: 'auto',
                maxHeight: '180px',
                height: '180px',
              }}
            >
              {financial?.notifications?.length === 0 && <BaseNotFound />}

              {financial?.notifications?.map((item) => (
                <Grid
                  container
                  justifyContent="space-between"
                  onClick={() => handleCheck(item?.freightId, item?.driverId)}
                  key={item?.id}
                  sx={{
                    cursor: `${!item?.freightId || !item?.driverId ? '' : 'pointer'}`,
                  }}
                >
                  <BaseText color="#2B2B2C" font_weight="600" sx={{ maxWidth: '690px' }}>
                    {item?.content}
                  </BaseText>
                  <BaseText font_weight="600" color="#2B2B2C">
                    {formatDate(item?.createdAt)}
                  </BaseText>
                  <Divider
                    sx={{
                      my: 1,
                      mt: 1,
                      width: '100%',
                      opacity: '0.5',
                      background: '#2B2B2C',
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
              <Table data={financial} loading={loadingById} />
            </Grid>

            <Grid item container justifyContent="flex-end" alignItems="flex-end" m="20px 0 0 0">
              <IconButton
                aria-label="add cards"
                onClick={() => setShowModalAddFreight(!showModalAddFreight)}
                component="label"
                sx={{
                  color: '#F1F3F9',
                  background: '#1877F2',
                  '&:hover': {
                    background: '#1877F2',
                    opacity: '0.8',
                  },
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
          financial={financial}
          setShowModal={setShowModalFinalizeRecord}
          showModal={showModalFinalizeRecord}
        />
      )}

      {showModalCheck && (
        <BaseModalFreight
          freight={freight}
          showModal={showModalCheck}
          setShowModal={setShowModalCheck}
        />
      )}
    </>
  );
};

export default InfoFinancial;
