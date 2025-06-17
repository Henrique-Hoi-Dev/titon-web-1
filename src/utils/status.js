const status = [
  {
    value: 'PENDING',
    label: 'ANALISE',
    color: '#FFCE52',
    background: '#FFEDB3',
  },
  {
    value: 'APPROVED',
    label: 'APROVADO',
    color: '#0BB07B',
    background: '#C4E7D0',
  },
  {
    value: 'STARTING_TRIP',
    label: 'EM VIAGEM',
    color: '#1877F2',
    background: '#e6ecff',
  },
  { value: 'DENIED', label: 'NEGADO', color: '#F03D3D', background: '#ffeaea' },
  {
    value: 'FINISHED',
    label: 'FINALIZADO',
    color: '#86878A',
    background: '#D9D9D9',
  },
  {
    value: 'DRAFT',
    label: 'RASCUNHO',
    color: '#b590db',
    background: '#f3e2fe',
  },
];

export const typeStatus = (res) => {
  if (!res?.status) {
    return { label: 'SEM STATUS', color: 'grey' };
  }

  const statusProps = status.find((item) => item.value === res?.status) ?? '';

  return statusProps;
};

export const typeStatusTable = (res) => {
  const firstStatusProps = status.find((item) => item.value === res?.status) ?? '';

  const secondStatusProps = status.find((item) => item.value === res?.status) ?? '';

  const thirdStatusProps = status.find((item) => item.value === res?.status) ?? '';

  const fourthStatusProps = status.find((item) => item.value === res?.status) ?? '';

  const fifthStatusProps = status.find((item) => item.value === res?.status) ?? '';

  const fifthStatusProps1 = status.find((item) => item.value === res?.status) ?? '';

  const nonEmptyStatus = status.find((item) => item.value === '') ?? '';

  if (firstStatusProps) {
    return firstStatusProps;
  } else if (secondStatusProps) {
    return secondStatusProps;
  } else if (thirdStatusProps) {
    return thirdStatusProps;
  } else if (fourthStatusProps) {
    return fourthStatusProps;
  } else if (fifthStatusProps) {
    return fifthStatusProps;
  } else if (nonEmptyStatus) {
    return nonEmptyStatus;
  } else if (fifthStatusProps1) {
    return fifthStatusProps1;
  } else {
    return '';
  }
};
