export const calculateTrialCountdown = (creationDate: string | number) => {
  const startDate = new Date(parseInt(String(creationDate), 10));

  const endDate = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000);

  const currentDate = new Date();

  if (currentDate >= endDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let timeDifference = endDate.getTime() - currentDate.getTime();

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  timeDifference -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  timeDifference -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(timeDifference / (1000 * 60));
  timeDifference -= minutes * (1000 * 60);

  const seconds = Math.floor(timeDifference / 1000);

  return { days, hours, minutes, seconds };
};
