export const getDateDiffInDays = (date1, date2) => {
  const diffTime = date2.getTime() - date1.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatDate = (date) => {
  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ', ' + year;
};
