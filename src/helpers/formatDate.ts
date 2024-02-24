export const formatDate = (timestamp: any ) => {
  const date = new Date(Number(timestamp));

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Add ordinal suffix to the day
  const dayWithSuffix = day + getOrdinalSuffix(day);

  return `${dayWithSuffix} ${month} ${year}`;
};

const getOrdinalSuffix = (day: any) => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
