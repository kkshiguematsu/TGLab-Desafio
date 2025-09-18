import { formatInTimeZone } from 'date-fns-tz';

export const dateFormatter = (date: string) => {
  if (!date) {
    return '';
  }

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return formatInTimeZone(date, userTimezone, 'dd/MM/yyyy HH:mm');
};
