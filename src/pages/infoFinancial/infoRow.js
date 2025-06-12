import React from 'react';
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable';
import { formatDate } from 'utils/formatDate';

import BaseTypeStatus from '@components/molecules/BaseTypeStatus/BaseTypeStatus';

const InfoRow = (props) => {
  const { data, setFreightId, setShowModalAction } = props;

  const handleAction = (ev, id) => {
    ev.preventDefault();
    setFreightId(id);
    setShowModalAction(true);
  };

  return (
    <>
      <SRow
        key={data.id}
        sx={{
          cursor: 'pointer',
          '&:hover': { border: '2px solid #545454' },
        }}
        onClick={(ev) => handleAction(ev, data?.id)}
      >
        <SCell>
          <BaseTypeStatus props={data} statusTable />
        </SCell>
        <SCell>{data?.finalFreightCity.toUpperCase() ?? '---'}</SCell>
        <SCell>{data?.locationTruck?.toUpperCase()}</SCell>
        <SCell>{formatDate(data?.date)}</SCell>
        <SCell>{data?.totalFreight}</SCell>
      </SRow>
    </>
  );
};

export default InfoRow;
