import { format } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

import pt from 'date-fns/locale/pt'

export const formatDate = (date, local) => {
  if (date) {
    if (local) return format(new Date(date), 'dd/MM/yyyy')
    else {
      return format(utcToZonedTime(new Date(date), ''), 'dd/MM/yyyy')
    }
  } else {
    return '-'
  }
}

export const formatMMMM = (date, local) => {
  if (date) {
    if (local) return format(new Date(date), 'MMMM', { locale: pt })
    else {
      return format(new Date(date), 'MMMM', { locale: pt })
    }
  } else {
    return '-'
  }
}

export const formatDatePicker = (date, local) => {
  if (!date) return ''

  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) return ''

    if (local) return format(dateObj, 'yyyy-MM-dd')
    return format(utcToZonedTime(dateObj, 'GMT+0'), 'yyyy-MM-dd')
  } catch (error) {
    return ''
  }
}

export const formatDatePickerToUTC = (date) => {
  if (!date) return ''

  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) return ''
    return zonedTimeToUtc(dateObj, 'UTC')
  } catch (error) {
    return ''
  }
}
