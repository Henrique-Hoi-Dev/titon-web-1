import React from 'react';
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable';
import { formatDate } from 'utils/formatDate';

const RowStocked = (props) => {
  const { data, index } = props;

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell>{formatDate(data?.date) ?? '---'}</SCell>
        <SCell>{data?.time ?? '---'}</SCell>
        <SCell>{data?.local}</SCell>
        <SCell>{data?.liters_fuel ?? '---'} L</SCell>
        <SCell>{data?.value_fuel}</SCell>
        <SCell>{data?.payment?.value ?? '---'}</SCell>
        <SCell>{data?.payment?.modo ?? '---'}</SCell>
      </SRow>
    </>
  );
};

export default RowStocked;
