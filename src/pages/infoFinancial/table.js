import React, { useState } from 'react';
import { Paper, TableContainer } from '@mui/material';
import { SCell, SHead, SRow, STable, STableBody } from 'components/atoms/BaseTable/BaseTable';
import { useTranslation } from 'react-i18next';

import BaseModalAction from '@/components/molecules/BaseModalAction/BaseModalAction';
import BaseNotFound from '@components/molecules/BaseNotFound/BaseNotFound';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import InfoRow from './infoRow';

const Table = ({ data, loading }) => {
  const { t } = useTranslation();

  const [showModalAction, setShowModalAction] = useState(false);

  const [freightId, setFreightId] = useState();

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          background: '#3A3A3A',
          borderRadius: '16px',
          boxShadow: 'none!important',
        }}
      >
        <STable>
          <SHead>
            <SRow>
              <SCell>{t('info_financial.table.status')}</SCell>
              <SCell>{t('info_financial.destiny')}</SCell>
              <SCell>{t('info_financial.table.current_location')}</SCell>
              <SCell>{t('info_financial.table.creation_date')}</SCell>
              <SCell>{t('info_financial.table.gross_value')}</SCell>
            </SRow>
          </SHead>
          {!loading && data && data?.freight?.length > 0 && (
            <STableBody>
              {data?.freight?.map((item, i) => (
                <InfoRow
                  key={i}
                  data={item}
                  index={i}
                  setFreightId={setFreightId}
                  setShowModalAction={setShowModalAction}
                />
              ))}
            </STableBody>
          )}
        </STable>

        {data?.freight?.length === 0 && !loading && <BaseNotFound />}

        {loading && <BaseLoading />}
      </TableContainer>

      {showModalAction && (
        <BaseModalAction
          setShowModal={setShowModalAction}
          showModal={showModalAction}
          freightId={freightId}
        />
      )}
    </>
  );
};

export default Table;
