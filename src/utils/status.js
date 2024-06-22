const status = [
  {
    value: 'PENDING',
    label: 'ANALISE',
    color: '#FFCE52',
    background: '#FFEDB3'
  },
  {
    value: 'APPROVED',
    label: 'APROVADO',
    color: '#0BB07B',
    background: '#C4E7D0'
  },
  {
    value: 'STARTING_TRIP',
    label: 'EM VIAGEM',
    color: '#1877F2',
    background: '#e6ecff'
  },
  { value: 'DENIED', label: 'NEGADO', color: '#F03D3D', background: '#ffeaea' },
  {
    value: 'FINISHED',
    label: 'FINALIZADO',
    color: '#86878A',
    background: '#D9D9D9'
  },
  {
    value: 'DRAFT',
    label: 'RASCUNHO',
    color: '#b590db',
    background: '#f3e2fe'
  }
]

export const typeStatus = (res) => {
  if (!Array.isArray(res) || res.length === 0) {
    return { label: 'SEM STATUS', color: 'grey' }
  }

  const firstStatus = res.find((item) => item.status === 'STARTING_TRIP') ?? ''
  const firstStatusProps =
    status.find((item) => item.value === firstStatus?.status) ?? ''

  const secondStatus = res.find((item) => item.status === 'PENDING') ?? ''
  const secondStatusProps =
    status.find((item) => item.value === secondStatus?.status) ?? ''

  const thirdStatus = res.find((item) => item.status === 'APPROVED') ?? ''
  const thirdStatusProps =
    status.find((item) => item.value === thirdStatus?.status) ?? ''

  const fourthStatus = res.find((item) => item.status === 'DENIED') ?? ''
  const fourthStatusProps =
    status.find((item) => item.value === fourthStatus?.status) ?? ''

  const fifthStatus = res.find((item) => item.status === 'FINISHED') ?? ''
  const fifthStatusProps =
    status.find((item) => item.value === fifthStatus?.status) ?? ''

  const fifthStatus1 = res.find((item) => item.status === 'DRAFT') ?? ''
  const fifthStatusProps1 =
    status.find((item) => item.value === fifthStatus1?.status) ?? ''

  const nonEmptyStatus = status.find((item) => item.value === '') ?? ''

  if (firstStatus) {
    return firstStatusProps
  } else if (secondStatus) {
    return secondStatusProps
  } else if (thirdStatus) {
    return thirdStatusProps
  } else if (fourthStatus) {
    return fourthStatusProps
  } else if (fifthStatus) {
    return fifthStatusProps
  } else if (nonEmptyStatus) {
    return nonEmptyStatus
  } else if (fifthStatusProps1) {
    return fifthStatusProps1
  } else {
    return ''
  }
}

export const typeStatusTable = (res) => {
  const firstStatusProps =
    status.find((item) => item.value === res?.status) ?? ''

  const secondStatusProps =
    status.find((item) => item.value === res?.status) ?? ''

  const thirdStatusProps =
    status.find((item) => item.value === res?.status) ?? ''

  const fourthStatusProps =
    status.find((item) => item.value === res?.status) ?? ''

  const fifthStatusProps =
    status.find((item) => item.value === res?.status) ?? ''

  const fifthStatusProps1 =
    status.find((item) => item.value === res?.status) ?? ''

  const nonEmptyStatus = status.find((item) => item.value === '') ?? ''

  if (firstStatusProps) {
    return firstStatusProps
  } else if (secondStatusProps) {
    return secondStatusProps
  } else if (thirdStatusProps) {
    return thirdStatusProps
  } else if (fourthStatusProps) {
    return fourthStatusProps
  } else if (fifthStatusProps) {
    return fifthStatusProps
  } else if (nonEmptyStatus) {
    return nonEmptyStatus
  } else if (fifthStatusProps1) {
    return fifthStatusProps1
  } else {
    return ''
  }
}
