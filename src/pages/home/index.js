import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { IconAdd } from 'assets/icons/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getFinancialsRequest } from 'store/modules/financial/financialSlice';

import BaseGraphic from 'components/molecules/BaseGraphic/BaseGraphic';
import BaseInputSearches from '@/components/atoms/BaseInputSearches/BaseInputSearches';
import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseMenuHomeFilterFinancial from 'components/molecules/BaseMenuHomeFilterFinancial/BaseMenuHomeFilterFinancial';
import BaseCardInfoFinancial from 'components/molecules/BaseCardInfoFinancial/BaseCardInfoFinancial';
import BaseModalAddFinancial from 'components/molecules/BaseModalAddFinancial/BaseModalAddFinancial';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showModalFicha, setShowModalFicha] = useState(false);
  const [showModalAddFinancial, setShowModalAddFinancial] = useState(false);

  const [search, setSearch] = useState('');
  const [searchOrder, setSearchOrder] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const { data, loadingGet: loading } = useSelector((state) => state.financial);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        getFinancialsRequest({
          search,
          status_check: searchStatus,
          sort_order: searchOrder
        })
      );
    }, 1200);

    return () => clearTimeout(timer);
  }, [dispatch, search, searchOrder, searchStatus]);

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        minHeight="88vh"
        padding={1}
        spacing={2}
        alignContent="flex-start"
      >
        <Grid item container pl={2} mr={4} justifyContent="space-between">
          <Grid
            item
            container
            xs={4}
            md={4}
            lg={4}
            mt={0.6}
            justifyContent="flex-start"
          >
            <BaseMenuHomeFilterFinancial
              setSearchOrder={setSearchOrder}
              setSearchStatus={setSearchStatus}
            />
          </Grid>

          <Grid
            item
            container
            xs={6}
            md={6}
            lg={6}
            flexWrap="nowrap"
            justifyContent="flex-end"
          >
            <BaseButton
              onClick={() => setShowModalAddFinancial(true)}
              background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
              sx={{
                fontSize: '14px',
                color: 'white',
                minWidth: '248px',
                marginRight: '15px'
              }}
              disabled={loading}
            >
              {t('button.add_new_listing')}{' '}
              <IconAdd sx={{ mb: '4px', ml: '10px' }} />
            </BaseButton>

            <BaseInputSearches
              searches
              searchesType="searches"
              styles={{ minWidth: '350px' }}
              placeholder={t('placeholder.search_financial')}
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          spacing={2}
          mb={1}
          pb={2}
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{ color: '#fff', borderBottom: '1px solid #F1F3F9' }}
        >
          <BaseCardInfoFinancial
            search={search}
            searchOrder={searchOrder}
            searchStatus={searchStatus}
            showModalFicha={showModalFicha}
            setShowModalFicha={setShowModalFicha}
            financials={data}
            loading={loading}
          />
        </Grid>

        <Grid item container height="430px">
          <BaseGraphic />
        </Grid>
      </Grid>

      <BaseModalAddFinancial
        showModal={showModalAddFinancial}
        setShowModal={setShowModalAddFinancial}
      />
    </>
  );
};

export default Home;
