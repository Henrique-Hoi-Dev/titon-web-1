import React from 'react';
import { Paper, TableContainer } from '@mui/material';
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody
} from 'components/atoms/BaseTable/BaseTable';
import { useTranslation } from 'react-i18next';

import BaseNotFound from 'components/molecules/BaseNotFound/BaseNotFound';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import RowStocked from './rowStocked';

export default function TableStocked({ data, loading }) {
  const { t } = useTranslation();

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          background: '#3A3A3A',
          borderRadius: '16px'
        }}
      >
        <STable>
          <SHead>
            <SRow alternatingcolors={0}>
              <SCell>{t('modal.data')}</SCell>
              <SCell>{t('modal.hour')}</SCell>
              <SCell>{t('modal.location')}</SCell>
              <SCell>{t('modal.quantity')}</SCell>
              <SCell>{t('modal.price_per_liter')}</SCell>
              <SCell>{t('modal.total_price')}</SCell>
              <SCell>{t('modal.payment')}</SCell>
            </SRow>
          </SHead>
          {!loading && data && data?.length > 0 && (
            <STableBody>
              {data?.map((item, i) => (
                <RowStocked key={i} data={item} index={i} />
              ))}
            </STableBody>
          )}
        </STable>

        {loading && <BaseLoading />}

        {data?.length === 0 && !loading && <BaseNotFound />}
      </TableContainer>
    </>
  );
}
