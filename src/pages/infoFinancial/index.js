import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { moneyMask } from 'utils/masks';
import { IconAdd, IconMenuTruck } from 'assets/icons/icons';
import { formatDate } from 'utils/formatDate';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getFinancialByIdRequest } from 'store/modules/financial/financialSlice';

import BaseTypeStatus from 'components/molecules/BaseTypeStatus/BaseTypeStatus';
import BaseModalFinalizeRecord from 'components/molecules/BaseModalFinalizeRecord/BaseModalFinalizeRecord';
import BaseModalAddFreight from 'components/molecules/BaseModalAddFreight/BaseModalAddFreight';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseText from 'components/atoms/BaseText/BaseText';
import BaseButton from 'components/atoms/BaseButton/BaseButton';
import Table from './table';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import TableNotification from './tableNotification';

const InfoFinancial = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  const { selected: financial, loadingById } = useSelector((state) => state.financial);

  const [showModalFinalizeRecord, setShowModalFinalizeRecord] = useState(false);
  const [showModalAddFreight, setShowModalAddFreight] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (id) {
        dispatch(getFinancialByIdRequest(id));
      }
    }
  }, [dispatch, id]);

  const handleRefresh = useCallback(() => {
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
      {!loadingById && (
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

                  {/* dados ficha */}
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
                      <BaseTypeStatus props={financial?.freight?.[0]} />
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
                        {financial?.freight[0]?.endFreightCity?.toUpperCase()}
                      </BaseText>
                    </Grid>

                    <Grid container item justifyContent="space-between">
                      <BaseText fontsize="16px">{t('info_financial.credit')}:</BaseText>
                      <BaseText fontsize="16px">
                        {moneyMask(financial?.driver?.credit || 0)}
                      </BaseText>
                    </Grid>

                    <Grid container justifyContent="flex-start" alignItems="flex-end">
                      <IconMenuTruck sx={{ fontSize: '30px', color: '#509BFB', mr: 1 }} />
                      <BaseText fontsize="16px" sx={{ verticalAlign: 'super' }}>
                        {financial?.cart?.cartModels}
                      </BaseText>
                    </Grid>
                  </Grid>
                </CardContent>

                <Grid item container mt={18} xs={10} md={10} lg={10}>
                  <BaseText fontSize="24px" sx={{ verticalAlign: 'super', fontWeight: '700' }}>
                    {t('info_financial.invoicing')}:{' '}
                    <span style={{ fontWeight: '500' }}>
                      {moneyMask(financial?.totalValue || 0)}
                    </span>
                  </BaseText>

                  <BaseButton
                    onClick={() => setShowModalFinalizeRecord(!showModalFinalizeRecord)}
                    background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
                    sx={{
                      width: '153px',
                      mt: 2,
                      height: '49px',
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

              <TableNotification data={financial?.notifications} loading={loadingById} />

              <Grid
                item
                container
                alignItems="flex-start"
                justifyContent="flex-start"
                overflow="auto"
                gap={4}
              >
                <Grid item container justifyContent="flex-end" alignItems="flex-end" m="20px 0 0 0">
                  <BaseButton
                    onClick={() => setShowModalAddFreight(!showModalAddFreight)}
                    background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
                    sx={{
                      mt: 2,
                      height: '49px',
                    }}
                  >
                    <IconAdd sx={{ mb: '4px', mr: '10px' }} />
                    {t('info_financial.button.add_freight')}
                  </BaseButton>
                </Grid>
                <Table data={financial} loading={loadingById} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {loadingById && <BaseLoading />}

      {showModalAddFreight && (
        <BaseModalAddFreight
          financialId={id}
          showModal={showModalAddFreight}
          setShowModal={setShowModalAddFreight}
          onCreated={handleRefresh}
        />
      )}

      {showModalFinalizeRecord && (
        <BaseModalFinalizeRecord
          financial={financial}
          setShowModal={setShowModalFinalizeRecord}
          showModal={showModalFinalizeRecord}
        />
      )}
    </>
  );
};

export default InfoFinancial;
