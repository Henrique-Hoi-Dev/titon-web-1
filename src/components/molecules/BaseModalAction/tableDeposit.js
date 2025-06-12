import React from 'react';
import { Paper, TableContainer } from '@mui/material';
import { SCell, SHead, SRow, STable, STableBody } from 'components/atoms/BaseTable/BaseTable';
import { useTranslation } from 'react-i18next';

import BaseNotFound from 'components/molecules/BaseNotFound/BaseNotFound';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import RowDeposit from './rowDeposit';

export default function TableDeposit({ data, loading }) {
  const { t } = useTranslation();

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          background: '#3A3A3A',
          borderRadius: '16px',
        }}
      >
        <STable>
          <SHead>
            <SRow alternatingcolors={0}>
              <SCell>{t('modal.data')}</SCell>
              <SCell>{t('modal.hour')}</SCell>
              <SCell>{t('modal.location')}</SCell>
              <SCell>{t('modal.payer')}</SCell>
              <SCell>{t('modal.total_price')}</SCell>
              <SCell>{t('modal.payment')}</SCell>
            </SRow>
          </SHead>
          {data && data?.length > 0 && (
            <STableBody>
              {data?.map((item, i) => (
                <RowDeposit key={i} data={item} index={i} />
              ))}
            </STableBody>
          )}
        </STable>

        {data?.length === 0 && !loading && <BaseNotFound />}
        {loading && <BaseLoading />}
      </TableContainer>
    </>
  );
}
