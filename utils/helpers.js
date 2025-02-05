export const clearArray = (array = []) => {
  while (array.length > 0) array.pop();
};

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
export const getMonthStrByNum = (monthNumber = 1) => {
  return months[monthNumber - 1];
};
