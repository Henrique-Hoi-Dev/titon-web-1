import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import pt from 'date-fns/locale/pt';

export const formatDate = (date, local) => {
  if (date) {
    if (local) return format(new Date(date), 'dd/MM/yyyy');
    else {
      return format(utcToZonedTime(new Date(date), ''), 'dd/MM/yyyy');
    }
  } else {
    return '-';
  }
};

export const formatMMMM = (date, local) => {
  if (date) {
    if (local) return format(new Date(date), 'MMMM', { locale: pt });
    else {
      return format(new Date(date), 'MMMM', { locale: pt });
    }
  } else {
    return '-';
  }
};

export const formatDatePicker = (date, local) => {
  if (date) {
    if (local) return format(new Date(date), 'yyyy-MM-dd');
    else {
      return format(utcToZonedTime(new Date(date), 'GMT+0'), 'yyyy-MM-dd');
    }
  } else {
    return '-';
  }
};
