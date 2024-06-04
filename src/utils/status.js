const status = [
  {
    value: 'APPROVAL_PROCESS',
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
    background: ''
  },
  { value: 'DENIED', label: 'NEGADO', color: '#F03D3D', background: '' },
  {
    value: 'FINISHED',
    label: 'FINALIZADO',
    color: '#86878A',
    background: '#D9D9D9'
  },
  {
    value: 'DRAFT',
    label: 'RASCUNHO',
    color: '#86878A',
    background: '#D9D9D9'
  }
]

export const typeStatus = (res) => {
  if (!Array.isArray(res) || res.length === 0) {
    return { label: 'SEM STATUS', color: 'grey' }
  }

  const firstStatus = res.find((item) => item.status === 'STARTING_TRIP') ?? ''
  const firstStatusProps =
    status.find((item) => item.value === firstStatus?.status) ?? ''

  const secondStatus =
    res.find((item) => item.status === 'APPROVAL_PROCESS') ?? ''
  const secondStatusProps =
    status.find((item) => item.value === secondStatus?.status) ?? ''

  const thirdStatus = res.find((item) => item.status === 'APPROVED') ?? ''
  const thirdStatusProps =
    status.find((item) => item.value === thirdStatus?.status) ?? ''

  const fourthStatus = res.find((item) => item.status === 'DENIED') ?? ''
  const fourthStatusProps =
    status.find((item) => item.value === fourthStatus?.status) ?? ''

  const fifthStatus = res.find((item) => item.status === 'DENIED') ?? ''
  const fifthStatusProps =
    status.find((item) => item.value === fifthStatus?.status) ?? ''

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
  } else {
    return ''
  }
}
