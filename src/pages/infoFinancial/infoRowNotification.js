import React from 'react';
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable';
import { formatDateOnly, formatTimeOnly } from 'utils/formatDate';
import { Divider, Box } from '@mui/material';

import BaseText from '@/components/atoms/BaseText/BaseText';

const InfoRowNotification = ({ data, setFreight, setShowModalFreight }) => {
  const handleAction = (ev, freightId, driverId) => {
    ev.preventDefault();
    setFreight({ freightId, driverId });
    setShowModalFreight(true);
  };

  return (
    <>
      <SRow
        key={data.id}
        sx={{
          cursor: `${!data?.freightId || !data?.driverId ? '' : 'pointer'}`,
          '&:hover': { backgroundColor: '#545454' },
        }}
        onClick={(ev) => handleAction(ev, data?.freightId, data?.driverId)}
      >
        <SCell width="100px">
          <Box sx={{ display: 'flex' }}>
            <BaseText fontsize="16px" font_weight="600">
              {data?.title}
            </BaseText>
          </Box>
          <Divider sx={{ backgroundColor: '#545454', margin: '7px 0' }} />
          <Box sx={{ display: 'flex' }}>
            <BaseText fontsize="16px" font_weight="400">
              {data?.content}
            </BaseText>
          </Box>
        </SCell>
        <SCell>{formatTimeOnly(data?.createdAt)}</SCell>
        <SCell>{formatDateOnly(data?.createdAt)}</SCell>
      </SRow>
    </>
  );
};

export default InfoRowNotification;
