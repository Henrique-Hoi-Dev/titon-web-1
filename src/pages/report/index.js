import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getFinancialsRequest } from 'store/modules/financial/financialSlice';
import { Grid } from '@mui/material';
import { IconAdd } from 'assets/icons/icons';

import TableReport from './table';
import BaseInputSearches from '@/components/atoms/BaseInputSearches/BaseInputSearches';
import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';

const Report = () => {
  const [, setShowModalReport] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: financials, loading } = useSelector((state) => state.financial);

  const INITIAL_STATE_FINANCIAL = {
    limit: 10,
    page: 1,
    sort_field: 'id',
    sort_order: 'ASC',
    status: false
  };

  const [financialQuery, setFinancialQuery] = useState(INITIAL_STATE_FINANCIAL);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinancialQuery((state) => ({
        ...state,
        search: search
      }));
    }, 1200);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(getFinancialsRequest(financialQuery));
  }, [dispatch, financialQuery]);

  return (
    <Grid
      item
      container
      padding={1}
      spacing={2}
      minHeight="88vh"
      justifyContent="center"
      alignContent="flex-start"
    >
      <Grid
        item
        container
        pl={2}
        pb={7}
        mr={4}
        mt={-6.5}
        justifyContent="flex-end"
      >
        <BaseButton
          onClick={() => setShowModalReport(true)}
          background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
          sx={{
            fontSize: '14px',
            color: 'white',
            width: '228px',
            height: '40px',
            marginRight: '15px'
          }}
        >
          {t('report.button.title')} <IconAdd sx={{ mt: -0.7 }} />
        </BaseButton>
        <BaseInputSearches
          searches
          searchesType="searches"
          styles={{ minWidth: '350px' }}
          placeholder="Nome, placa..."
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Grid>

      <BaseContentHeader>
        <BaseTitle>{t('report.title')}</BaseTitle>
      </BaseContentHeader>

      <Grid
        item
        container
        mb={5}
        minHeight="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Grid item container mr={4} mt={5} mb={3} justifyContent="center">
          <TableReport
            data={financials}
            query={financialQuery}
            setQuery={setFinancialQuery}
            isFetching={loading}
            error={null}
            loading={loading}
            mutate={() => {}}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Report;
