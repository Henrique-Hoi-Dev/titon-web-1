import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getFreightByIdRequest } from '@/store/modules/freight/freightSlice'

import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseText from 'components/atoms/BaseText/BaseText'
import BaseModal from 'components/molecules/BaseModal/BaseModal'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import NestedList from 'components/atoms/nestedList/nestedList'
import TableStocked from './tableStocked'
import TableExpense from './tableExpense'
import TableDeposit from './tableDeposit'

const BaseModalAction = ({ showModal, setShowModal, freightId }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { selected, loadingById } = useSelector((state) => state?.freight)

  const [value, setValue] = useState(0)
  const [statusSecondCheck] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onClose = useCallback(() => {
    setShowModal(false)
  }, [setShowModal])

  useEffect(() => {
    if (freightId) {
      dispatch(getFreightByIdRequest(freightId))
    }
  }, [dispatch, freightId])

  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <>
            {!loadingById && (
              <Box
                sx={{
                  p: 2,
                  background: `${value === index && '#545454'}`,
                  borderRadius: '8px',
                }}
              >
                <Typography>{children}</Typography>
              </Box>
            )}

            {loadingById && <BaseLoading />}
          </>
        )}
      </div>
    )
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const valuesFirstCheck = {
    value: {
      liter: selected?.totalLiters,
      fuelValue: selected?.fuelValueTotal,
    },
    value2: selected?.expenses,
    value3: selected?.totalDriver,
  }

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      maxWidth="800px"
      minheight={'590px'}
      sxGridModal={{ marginLeft: 0 }}
    >
      <BaseContentHeader
        mt={2}
        sx={{
          borderBottom: '2px solid #FFF',
          marginBottom: '15px',
          width: '96%',
        }}
      >
        <BaseTitle sxGridText={{ justifyContent: 'center' }}>
          {selected?.startCity?.toUpperCase()}{' '}
          <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />{' '}
          {selected?.finalCity?.toUpperCase()}
        </BaseTitle>
      </BaseContentHeader>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          width: '100%',
          '& .css-heg063-MuiTabs-flexContainer': {
            justifyContent: 'center',
          },
          '& .css-k008qs': {
            justifyContent: 'center',
          },
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab
            sx={{
              fontWeight: 'bold',
              borderTopRightRadius: '8px',
              borderTopLeftRadius: '8px',
              background: `${value === 0 && '#545454'}`,
              color: '#FFF !important',
            }}
            label={statusSecondCheck ? t('modal.label_price') : t('modal.label_price2')}
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              fontWeight: '700',
              borderTopRightRadius: '8px',
              borderTopLeftRadius: '8px',
              background: `${value === 1 && '#545454'}`,
              color: '#FFF !important',
            }}
            label={t('modal.label_filled_with_fuel')}
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              fontWeight: '700',
              borderTopRightRadius: '8px',
              borderTopLeftRadius: '8px',
              background: `${value === 2 && '#545454'}`,
              color: '#FFF !important',
            }}
            label={t('modal.label_financial_expenses')}
            {...a11yProps(2)}
          />
          <Tab
            sx={{
              fontWeight: '700',
              borderTopRightRadius: '8px',
              borderTopLeftRadius: '8px',
              background: `${value === 3 && '#545454'}`,
              color: '#FFF !important',
            }}
            label={t('modal.label_money_deposit')}
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Grid
          item
          container
          alignItems="center"
          justifyContent={statusSecondCheck ? 'flex-start' : 'center'}
          minWidth={'730px'}
          maxHeight="365px"
          minHeight="365px"
          flexDirection={'row'}
          flexWrap={'nowrap'}
        >
          {statusSecondCheck && (
            <>
              <Grid item container flexDirection={'column'} alignItems={'center'} width="45%">
                <BaseText sx={{ marginBottom: '-15px', fontWeight: '800' }}>
                  {t('modal.price')}
                </BaseText>
                <NestedList
                  maxwidth={'200px'}
                  titleOne={t('modal.total_shipping')}
                  valorOne={selected?.freightTotal}
                  titleTwo={t('modal.net_shipping')}
                  valorTwo={selected?.totalNetFreight}
                  valuesFirstCheck={valuesFirstCheck}
                  statusSecondCheck={statusSecondCheck}
                />
              </Grid>
              <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />
            </>
          )}
          <Grid item container flexDirection={'column'} alignItems={'center'} width="45%">
            {statusSecondCheck && (
              <BaseText sx={{ marginBottom: '-15px', fontWeight: '800' }}>
                {t('modal.accomplished')}
              </BaseText>
            )}
            <NestedList
              maxwidth={statusSecondCheck ? '220px' : '360px'}
              titleOne={t('modal.total_shipping')}
              valorOne={selected?.freightTotal}
              titleTwo={t('modal.net_shipping')}
              valorTwo={selected?.totalNetFreight}
              valuesFirstCheck={valuesFirstCheck}
              statusSecondCheck={statusSecondCheck}
            />
          </Grid>
          {statusSecondCheck && (
            <>
              <Divider
                sx={{
                  borderColor: 'rgba(0, 0, 0, 0.32)',
                  width: '49%',
                  ml: 2,
                  transform: 'rotate(90deg)',
                  position: 'absolute',
                  right: '48px',
                }}
              />
              <Grid
                item
                md={4}
                lg={4}
                marginLeft={2}
                container
                flexDirection={'column'}
                spacing={2}
              >
                <Grid item container flexDirection={'column'}>
                  <BaseText fontsize={'12px'} sx={{ opacity: 0.5 }}>
                    {t('modal.credit/debit')}
                  </BaseText>
                  <BaseText fontsize={'16px'}>{''}</BaseText>
                </Grid>
                <Grid item container flexDirection={'column'}>
                  <BaseText fontsize={'12px'} sx={{ opacity: 0.5 }}>
                    {t('modal.discharge_location')}
                  </BaseText>
                  <BaseText fontsize={'16px'}>{''}</BaseText>
                </Grid>
                <Grid item container flexDirection={'column'}>
                  <BaseText fontsize={'12px'} sx={{ opacity: 0.5 }}>
                    {t('modal.discharge_date')}
                  </BaseText>
                  <BaseText fontsize={'16px'}>{''}</BaseText>
                </Grid>
                <Grid item container flexDirection={'column'}>
                  <BaseText fontsize={'12px'} sx={{ opacity: 0.5 }}>
                    {t('modal.hour_of_discharge')}
                  </BaseText>
                  <BaseText fontsize={'16px'}>{''}</BaseText>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid
          item
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          minWidth={'730px'}
          maxHeight="365px"
          minHeight="365px"
          overflow={'auto'}
        >
          <TableStocked data={selected?.restock} loading={loadingById} />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid
          item
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          minWidth={'730px'}
          maxHeight="365px"
          minHeight="365px"
        >
          <TableExpense data={selected?.travelExpenses} loading={loadingById} />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Grid
          item
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          minWidth={'730px'}
          maxHeight="365px"
          minHeight="365px"
        >
          <TableDeposit data={selected?.depositMoney} loading={loadingById} />
        </Grid>
      </TabPanel>

      {selected?.status === 'FINISHED' && !loadingById && (
        <Grid container item spacing={2} mt={1} justifyContent="flex-end">
          <Grid container item xs={12} md={3} lg={3}>
            <BaseButton
              background={'#fff'}
              variant="text"
              sx={{
                fontSize: '14px',
                width: '141px',
                height: '49px',
                marginRight: '15px',
                border: '1px solid #F03D3D',
                color: '#000000',
              }}
            >
              {t('modal.disapproved')}
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
                width: '141px',
                height: '49px',
                marginRight: '15px',
              }}
            >
              {t('modal.approved')}
            </BaseButton>
          </Grid>
        </Grid>
      )}
    </BaseModal>
  )
}

export default BaseModalAction
