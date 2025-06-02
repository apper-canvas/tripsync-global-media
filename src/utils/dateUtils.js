import { format, formatDistanceToNow, differenceInDays, parseISO } from 'date-fns';

export const formatTripDate = (dateString) => {
  return format(parseISO(dateString), 'MMM dd, yyyy');
};

export const formatTripDateRange = (startDate, endDate) => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  
  if (format(start, 'yyyy') === format(end, 'yyyy')) {
    return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd, yyyy')}`;
  }
  
  return `${format(start, 'MMM dd, yyyy')} - ${format(end, 'MMM dd, yyyy')}`;
};

export const getTripDuration = (startDate, endDate) => {
  return differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;
};

export const getRelativeTime = (dateString) => {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
};

export const formatActivityTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};