import { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IconAdd } from 'assets/icons/icons';
import { useTranslation } from 'react-i18next';
import { getTrucksRequest } from 'store/modules/truck/truckSlice';

import Table from './table';
import BaseInputSearches from '@/components/atoms/BaseInputSearches/BaseInputSearches';
import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseModalAddTruck from 'components/molecules/BaseModalAddTruck/BaseModalAddTruck';

const Truck = () => {
  const dispatch = useDispatch();
  const [showModalTruck, setShowModalTruck] = useState(false);
  const { t } = useTranslation();

  const INITIAL_STATE_USER = {
    limit: 7,
    page: 1,
    sort_field: 'id',
    sort_order: 'ASC',
  };

  const [truckQuery, setTruckQuery] = useState(INITIAL_STATE_USER);
  const [search, setSearch] = useState('');
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const isMounted = useRef(false);

  const {
    data: trucks,
    loadingGet: loading,
    errorGet: error,
  } = useSelector((state) => state.truck);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      dispatch(getTrucksRequest(truckQuery));
      return;
    }

    const timer = setTimeout(() => {
      if (shouldRefresh || search.length >= 0) {
        const query = {
          ...truckQuery,
          ...(search.trim() ? { search } : {}),
        };
        dispatch(getTrucksRequest(query));
        setShouldRefresh(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [dispatch, search, shouldRefresh, truckQuery]);

  const handleModalClose = () => {
    setShowModalTruck(false);
  };

  return (
    <Grid
      container
      padding={1}
      spacing={2}
      minHeight="88vh"
      justifyContent="center"
      alignContent={'flex-start'}
    >
      <Grid item container xs={12} md={12} lg={12} flexWrap="nowrap" justifyContent="flex-end">
        <Grid item container pl={2} mr={4} justifyContent={'flex-end'}>
          <BaseButton
            onClick={() => setShowModalTruck(true)}
            background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
            sx={{
              fontSize: '14px',
              color: 'white',
              minWidth: '248px',
              marginRight: '15px',
            }}
            disabled={loading}
          >
            {t('button.add_new_truck')} <IconAdd sx={{ mb: '4px', ml: '10px' }} />
          </BaseButton>

          <BaseInputSearches
            searches
            searchesType="searches"
            styles={{ minWidth: '350px' }}
            placeholder={t('placeholder.search_truck')}
            onChange={(ev) => setSearch(ev.target.value)}
          />
        </Grid>
      </Grid>

      <BaseContentHeader>
        <BaseTitle>{t('title.truck')}</BaseTitle>
      </BaseContentHeader>

      <Grid item container mb={5} alignItems="flex-start" justifyContent="flex-start">
        <Grid item container pl={2} mr={4} mt={5} mb={3} justifyContent={'center'}>
          <Table
            data={trucks}
            query={truckQuery}
            setQuery={setTruckQuery}
            error={error}
            loading={loading}
          />
        </Grid>
      </Grid>

      <BaseModalAddTruck
        setShowModal={handleModalClose}
        showModal={showModalTruck}
        onCreated={() => setShouldRefresh(true)}
      />
    </Grid>
  );
};

export default Truck;
