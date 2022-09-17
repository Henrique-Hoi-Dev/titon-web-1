import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const formatDate = (date, local) => {
  if (date) {
    if (local) return format(new Date(date), "dd-MM-yyyy");
    else {
      return format(utcToZonedTime(new Date(date), ""), "dd-MM-yyyy");
    }
  } else {
    return "-";
  }
};


export const formatDatePicker = (date, local) => {
  if (date) {
    if (local) return format(new Date(date), "yyyy-MM-dd");
    else {
      return format(utcToZonedTime(new Date(date), "GMT+0"), "yyyy-MM-dd");
    }
  } else {
    return "-";
  }
};
