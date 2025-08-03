import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getFreightByIdRequest } from '@/store/modules/freight/freightSlice';

import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseText from 'components/atoms/BaseText/BaseText';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BaseNestedList from '@/components/atoms/BaseNestedList/BaseNestedList';
import TableStocked from './tableStocked';
import TableExpense from './tableExpense';
import TableDeposit from './tableDeposit';

const BaseModalAction = ({ showModal, setShowModal, freightId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  const { selected, loadingById } = useSelector((state) => state?.freight);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClose = useCallback(() => {
    setShowModal(false);
    isFirstRender.current = true;
  }, [setShowModal]);

  useEffect(() => {
    if (freightId && isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(getFreightByIdRequest(freightId));
    }
  }, [dispatch, freightId]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
        {...other}
      >
        {value === index && (
          <>
            {!loadingById && (
              <Box
                sx={{
                  p: 2,
                  background: `${value === index && '#454545'}`,
                  borderRadius: '8px',
                }}
              >
                <Typography component="div">{children}</Typography>
              </Box>
            )}
            {loadingById && <BaseLoading />}
          </>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      maxWidth="800px"
      maxHeight="750px"
    >
      <BaseContentHeader>
        <BaseTitle sxGridText={{ justifyContent: 'center' }}>
          {selected?.startCity?.toUpperCase()}
          <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />
          {selected?.finalCity?.toUpperCase()}
        </BaseTitle>
      </BaseContentHeader>

      <Box sx={{ width: '100%' }}>
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
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            indicatorColor="primary"
            sx={{ '& .MuiTabs-indicator': { display: 'none' } }}
          >
            <Tab
              sx={{
                fontWeight: 'bold',
                padding: '10px 20px',
                borderTopRightRadius: '8px',
                borderTopLeftRadius: '8px',
                background: `${value === 0 && '#454545'}`,
                color: `${value === 0 ? '#FFF!important' : '#939395'}`,
              }}
              label={t('modal.label_price2')}
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                fontWeight: '700',
                padding: '10px 20px',
                borderTopRightRadius: '8px',
                borderTopLeftRadius: '8px',
                background: `${value === 1 && '#454545'}`,
                color: `${value === 1 ? '#FFF!important' : '#939395'}`,
              }}
              label={t('modal.label_filled_with_fuel')}
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                fontWeight: '700',
                padding: '10px 20px',
                borderTopRightRadius: '8px',
                borderTopLeftRadius: '8px',
                background: `${value === 2 && '#454545'}`,
                color: `${value === 2 ? '#FFF!important' : '#939395'}`,
              }}
              label={t('modal.label_financial_expenses')}
              {...a11yProps(2)}
            />
            <Tab
              sx={{
                fontWeight: '700',
                padding: '10px 20px',
                borderTopRightRadius: '8px',
                borderTopLeftRadius: '8px',
                background: `${value === 3 && '#454545'}`,
                color: `${value === 3 ? '#FFF!important' : '#939395'}`,
              }}
              label={t('modal.label_money_deposit')}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
      </Box>

      <TabPanel value={value} index={0}>
        <Grid container alignItems="center" minWidth={'730px'}>
          <BaseNestedList
            titleHeader={t('modal.price')}
            title={t('modal.total_shipping')}
            valor={selected?.freightTotal}
            titleFooter={t('modal.net_shipping')}
            valorFooter={selected?.totalNetFreight}
          >
            <List sx={{ px: '20px' }}>
              <ListItem>
                <ListItemText
                  sx={{ color: '#939395' }}
                  primary={t('add_freight.label.combustible')}
                />
                <BaseText fontsize={'18px'} color={'#F03D3D'} sx={{ marginRight: '20px' }}>
                  {selected?.totalLiters + ' L'} / {selected?.fuelValueTotal}
                </BaseText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ color: '#939395' }} primary={t('add_freight.label.expenses')} />
                <BaseText fontsize={'18px'} color={'#F03D3D'} sx={{ marginRight: '20px' }}>
                  {selected?.expenses}
                </BaseText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ color: '#939395' }} primary={t('add_freight.label.driver')} />
                <BaseText fontsize={'18px'} color={'#F03D3D'} sx={{ marginRight: '20px' }}>
                  {selected?.totalDriver}
                </BaseText>
              </ListItem>
            </List>
          </BaseNestedList>
          <BaseNestedList
            titleHeader={t('add_freight.label.realized')}
            title={t('add_freight.label.total_freight')}
            valor={selected?.freightTotal}
            titleFooter={t('add_freight.label.net_freight')}
            valorFooter={selected?.totalNetFreight}
            styleHeader={{
              marginTop: '20px',
            }}
          >
            <List sx={{ px: '20px' }}>
              <ListItem>
                <ListItemText
                  sx={{ color: '#939395' }}
                  primary={t('add_freight.label.combustible')}
                />
                <BaseText fontsize={'18px'} color={'#F03D3D'} sx={{ marginRight: '20px' }}>
                  {selected?.totalLiters + ' L'} / {selected?.fuelValueTotal}
                </BaseText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ color: '#939395' }} primary={t('add_freight.label.expenses')} />
                <BaseText fontsize={'18px'} color={'#F03D3D'} sx={{ marginRight: '20px' }}>
                  {selected?.expenses}
                </BaseText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ color: '#939395' }} primary={t('add_freight.label.driver')} />
                <BaseText fontsize={'18px'} color={'#F03D3D'} sx={{ marginRight: '20px' }}>
                  {selected?.totalDriver}
                </BaseText>
              </ListItem>
            </List>
          </BaseNestedList>
          <BaseNestedList
            typeTemplate="list"
            titleHeader={t('add_freight.label.discharge')}
            title={t('add_freight.label.discharge_value')}
            valor={selected?.freightTotal}
            titleFooter={t('add_freight.label.discharge_value')}
            valorFooter={selected?.totalNetFreight}
            styleHeader={{
              marginTop: '20px',
            }}
          >
            <List sx={{ width: '100%' }}>
              <ListItem>
                <ListItemText
                  sx={{ color: '#939395' }}
                  primary={t('add_freight.label.combustible')}
                />
                <BaseText fontsize={'18px'} color={'#F03D3D'} sx={{ marginRight: '20px' }}>
                  {0}
                </BaseText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ color: '#939395' }} primary={t('add_freight.label.location')} />
                <BaseText fontsize={'18px'} color={'#F03D3D'} sx={{ marginRight: '20px' }}>
                  {0}
                </BaseText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ color: '#939395' }} primary={t('add_freight.label.date')} />
                <BaseText fontsize={'18px'} color={'#F03D3D'} sx={{ marginRight: '20px' }}>
                  {0}
                </BaseText>
              </ListItem>
              <ListItem>
                <ListItemText sx={{ color: '#939395' }} primary={t('add_freight.label.hour')} />
                <BaseText fontsize={'18px'} color={'#F03D3D'} sx={{ marginRight: '20px' }}>
                  {0}
                </BaseText>
              </ListItem>
            </List>
          </BaseNestedList>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid
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
        <Grid container spacing={2} mt={1} justifyContent="flex-end">
          <Grid item xs={12} md={3} lg={3}>
            <BaseButton
              background={'linear-gradient(224.78deg, #F03D3D 8.12%, #D32F2F 92.21%)'}
              variant="text"
              sx={{
                fontSize: '14px',
                width: '141px',
                height: '49px',
                marginRight: '15px',
                color: '#FFFFFF',
              }}
            >
              {t('modal.disapproved')}
            </BaseButton>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <BaseButton
              type="submit"
              color="success"
              background={'linear-gradient(224.78deg, #0BB07B 8.12%, #00A676 92.21%)'}
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
  );
};

export default BaseModalAction;
