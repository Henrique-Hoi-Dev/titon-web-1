import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { useGet } from 'services/requests/useGet'
import { moneyMask } from 'utils/masks'
import { IconMenuTruck } from 'assets/icons/icons'
import { formatDate } from 'utils/formatDate'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { ModalFinalizeRecord } from '../modal/modalFinalizeRecord'
import { ModalAddFreight } from '../modal/modalAddFreight'
import { status } from 'utils/status'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Table from './table'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import Text from 'components/atoms/BaseText/BaseText'
import Button from 'components/atoms/BaseButton/BaseButton'
import imgNotFound from '../../../assets/NotFound.png'

export const InfoFinancial = ({ financialId }) => {
  const INITIAL_STATE_USER = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: 'ASC'
  }
  const { id } = useParams()
  const { t } = useTranslation()

  const [userQuery, setUserQuery] = useState(INITIAL_STATE_USER)

  const [showModalFinalizeRecord, setShowModalFinalizeRecord] = useState(false)
  const [showModalAddFreight, setShowModalAddFreight] = useState(false)

  const {
    data: financial,
    error: financialError,
    isFetching: financialIsFetching,
    loading,
    mutate
  } = useGet(`user/financialStatement/${id}`, [], id ? false : true)

  const getStatus = (res) => {
    const firstStatus =
      res?.find((item) => item.status === 'STARTING_TRIP') ?? ''
    const firstStatusProps =
      status.find((item) => item.value === firstStatus?.status) ?? ''

    const secondStatus =
      res?.find((item) => item.status === 'APPROVAL_PROCESS') ?? ''
    const secondStatusProps =
      status.find((item) => item.value === secondStatus?.status) ?? ''

    const thirdStatus = res?.find((item) => item.status === 'APPROVED') ?? ''
    const thirdStatusProps =
      status.find((item) => item.value === thirdStatus?.status) ?? ''

    const fourthStatus = res?.find((item) => item.status === 'DENIED') ?? ''
    const fourthStatusProps =
      status.find((item) => item.value === fourthStatus?.status) ?? ''

    const fifthStatus = res?.find((item) => item.status === 'DENIED') ?? ''
    const fifthStatusProps =
      status.find((item) => item.value === fifthStatus?.status) ?? ''

    const nonEmptyStatus = status.find((item) => item.value === '') ?? ''

    if (firstStatus) {
      return firstStatusProps
    } else if (secondStatus) {
      return secondStatusProps
    } else if (thirdStatus) {
      return thirdStatusProps
    } else if (fourthStatus) {
      return fourthStatusProps
    } else if (fifthStatus) {
      return fifthStatusProps
    } else if (nonEmptyStatus) {
      return nonEmptyStatus
    } else {
      return ''
    }
  }

  return (
    <>
      <Grid
        component="form"
        maxWidth="1200px"
        height={'760px'}
        maxHeight={'760px'}
      >
        <BaseContentHeader mt={2}>
          <BaseTitle>
            {financial?.dataResult?.truck_board.toUpperCase()}
          </BaseTitle>
        </BaseContentHeader>

        <Grid
          container
          justifyContent="center"
          padding={'30px 15px'}
          spacing={2}
        >
          <Grid
            item
            xs={6}
            md={3}
            lg={3}
            container
            flexDirection={'column'}
            alignItems="flex-start"
            justifyContent="flex-start"
            paddingTop={'0!important'}
          >
            <Card
              sx={{
                minWidth: '264px!important',
                minHeight: '615px!important',
                boxShadow: 'none!important',
                backgroundColor: 'transparent',
                color: 'white'
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
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
                    height="150px"
                    sx={{
                      borderRadius: '4px',
                      width: '248px',
                      height: '185px'
                    }}
                    image={financial?.dataResult?.truck_avatar}
                    alt="green iguana"
                  />
                </Typography>

                <Grid
                  item
                  container
                  pl={2}
                  mt={1}
                  spacing={1}
                  height="100%"
                  flexDirection={'column'}
                  sx={{
                    color: '#F1F3F9',
                    fontWeight: '400',
                    lineHeight: '25px'
                  }}
                >
                  <Grid
                    container
                    item
                    pb={2}
                    pr={'8px!important'}
                    paddingLeft={'0!important'}
                    justifyContent={'space-between'}
                  >
                    <Text
                      fontSize={'19px'}
                      color={getStatus(financial?.dataResult?.freight).color}
                    >
                      {getStatus(financial?.dataResult?.freight).label}
                    </Text>
                  </Grid>
                  <Text fontSize={'16px'}>
                    {t('info_financial.driver')}:{' '}
                    <Text fontSize={'16px'}>
                      {financial?.dataResult?.driver_name}
                    </Text>
                  </Text>
                  <Text fontSize={'16px'}>
                    <Text fontSize={'16px'}>
                      {t('info_financial.startDate')}:{' '}
                      {formatDate(financial?.dataResult?.start_date)}
                    </Text>
                  </Text>
                  <Text fontSize={'16px'}>
                    {t('info_financial.destiny')}:{' '}
                    <Text fontSize={'16px'}>
                      {financial?.dataResult?.freight[0]?.finalFreightCity?.toUpperCase()}
                    </Text>
                  </Text>
                  <Text fontSize={'16px'}>
                    {t('info_financial.credit')}:{' '}
                    <Text fontSize={'16px'}>
                      {moneyMask(financial?.dataResult?.driver?.credit || [0])}
                    </Text>
                  </Text>
                  <Text>
                    <IconMenuTruck
                      sx={{ fontSize: '30px', color: '#509BFB' }}
                    />{' '}
                    <Text fontSize={'18px'} sx={{ verticalAlign: 'super' }}>
                      {financial?.dataResult.cart_models.toUpperCase()}
                    </Text>
                  </Text>
                </Grid>
              </CardContent>

              <Grid item container mt={18} xs={12} md={12} lg={12}>
                <Text
                  fontSize={'24px'}
                  sx={{ verticalAlign: 'super', fontWeight: '700' }}
                >
                  {t('info_financial.invoicing')}:{' '}
                  <Text fontSize={'24px'} sx={{ fontWeight: '500' }}>
                    {moneyMask(financial?.dataResult?.total_value || [0])}
                  </Text>
                </Text>

                <Button
                  onClick={() =>
                    setShowModalFinalizeRecord(!showModalFinalizeRecord)
                  }
                  background={'#F03D3D'}
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
            flexDirection={'column'}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Text fontSize={'24px'} color="#F1F3F9">
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
              borderRadius={'4px'}
              padding={2}
              m={'12px 0 40px'}
              sx={{
                background: '#CCD6EB',
                overflow: 'auto',
                maxHeight: '180px',
                height: '180px'
              }}
            >
              {financial?.dataResult?.notifications.length === 0 && (
                <Text fontSize={'28px'} center>
                  {t('info_financial.notFoundNotifications')}{' '}
                  <img
                    src={imgNotFound}
                    alt="img"
                    width={'60px'}
                    style={{
                      verticalAlign: 'middle',
                      marginLeft: '20px'
                    }}
                  />
                </Text>
              )}
              {financial?.dataResult?.notifications?.map((item) => (
                <React.Fragment key={item?.id}>
                  <Text sx={{ maxWidth: '690px' }}>{item?.content}</Text>{' '}
                  <Text>{formatDate(item?.createdAt)}</Text>
                  <Divider
                    sx={{
                      my: 1,
                      mt: 1,
                      width: '100%',
                      opacity: '0.5',
                      background: '#2B2B2C'
                    }}
                  />
                </React.Fragment>
              ))}
            </Grid>

            <Grid
              item
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              maxHeight={'270px'}
              height={'270px'}
              overflow={'auto'}
            >
              <Table
                data={financial}
                query={userQuery}
                setQuery={setUserQuery}
                isFetching={financialIsFetching}
                error={financialError}
                loading={loading}
                mutate={mutate}
              />
            </Grid>

            <Grid
              item
              container
              justifyContent="flex-end"
              alignItems={'flex-end'}
              m={'20px 0 0 0'}
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
                <HiOutlinePlusSm fontSize={'42px'} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {showModalAddFreight && (
        <ModalAddFreight
          financialId={financialId?.id}
          showModal={showModalAddFreight}
          setShowModal={setShowModalAddFreight}
        />
      )}

      {showModalFinalizeRecord && (
        <ModalFinalizeRecord
          mutate={mutate}
          financialId={financialId?.id}
          props={financial}
          setShowModal={setShowModalFinalizeRecord}
          showModal={showModalFinalizeRecord}
        />
      )}
    </>
  )
}