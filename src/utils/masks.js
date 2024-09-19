export const moneyMask = (value) => {
  if (value) {
    value = value / 100
    const result = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2
    }).format(value)

    if (value == null || result === 0 || result === 'NaN') return 'R$: 0,00'

    if (result) {
      return 'R$: ' + result
    } else {
      return 'R$: 0,00'
    }
  }
}

export const maskCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '')
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

  return cpf
}

export const maskPhone = (phone) => {
  let value = phone?.replace(/\D/g, '')
  value = value?.replace(/^(\d{2})(\d)/, '($1) $2')
  value = value?.replace(/(\d{5})(\d)/, '$1-$2')
  if (value?.length > 15) {
    value = value?.substring(0, 15)
  }
  return value
}

export const formatMoney = (value) => {
  value = value
    ?.toString()
    ?.replace('.', '')
    .replace(',', '')
    .replace(/\D/g, '')

  const options = { minimumFractionDigits: 2 }
  const result =
    new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 100) || 0
  if (result === 0 || result === 'NaN') return 'R$ 0,00'

  if (result) {
    return 'R$ ' + result
  } else {
    return 'R$ 0,00'
  }
}

export const formatMil = (value, status) => {
  const tStatus = status
  value = value
    ?.toString()
    ?.replace('.', '')
    .replace('.', '')
    .replace(/\D/g, '')

  const options = { minimumFractionDigits: 3 }
  const result =
    new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 1000) ||
    0
  if (result === 0 || result === 'NaN') return 0

  if (result) {
    return tStatus ? 'T  ' + result : result
  } else {
    return 0
  }
}

export const formatMédia = (value) => {
  value = value
    ?.toString()
    ?.replace('.', '')
    .replace('.', '')
    .replace(/\D/g, '')

  const options = { minimumFractionDigits: 1 }
  const result =
    new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 100) || 0
  if (result === 0 || result === 'NaN') return 0

  if (result) {
    return 'M  ' + result
  } else {
    return 0
  }
}
