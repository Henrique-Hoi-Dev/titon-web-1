import React, { useState } from 'react';
import { Paper, TableContainer } from '@mui/material';
import { SCell, SHead, SRow, STable, STableBody } from 'components/atoms/BaseTable/BaseTable';
import { useTranslation } from 'react-i18next';

import BaseNotFound from '@components/molecules/BaseNotFound/BaseNotFound';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import InfoRowNotification from './infoRowNotification';
import BaseModalFreight from '@/components/molecules/BaseModalFreight/BaseModalFreight';

const TableNotification = ({ data, loading, handleRefresh }) => {
  const { t } = useTranslation();

  const [showModalFreight, setShowModalFreight] = useState(false);

  const [freight, setFreight] = useState({});

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
              <SCell></SCell>
              <SCell>{t('info_financial.table.time')}</SCell>
              <SCell>{t('info_financial.table.date')}</SCell>
            </SRow>
          </SHead>
          {!loading && data && data?.length > 0 && (
            <STableBody>
              {data?.map((item, i) => (
                <InfoRowNotification
                  key={i}
                  data={item}
                  setFreight={setFreight}
                  setShowModalFreight={setShowModalFreight}
                />
              ))}
            </STableBody>
          )}
        </STable>

        {data?.length === 0 && !loading && <BaseNotFound />}

        {loading && <BaseLoading />}
      </TableContainer>

      {showModalFreight && (
        <BaseModalFreight
          freight={freight}
          showModal={showModalFreight}
          setShowModal={setShowModalFreight}
          handleRefresh={handleRefresh}
        />
      )}
    </>
  );
};

export default TableNotification;
