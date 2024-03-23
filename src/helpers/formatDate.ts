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

export const formatDateWithOrdinalSuffix = (inputDate: any) => {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = inputDate.toLocaleDateString("en-GB", options);

  // To add 'th', 'st', 'nd', 'rd' suffix to the day
  const day = inputDate.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  const formattedDateWithSuffix = formattedDate.replace(/\d+/, day + suffix);

  return formattedDateWithSuffix;
};

