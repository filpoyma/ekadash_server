import os from 'os';

export const clearArray = (array = []) => {
  while (array.length > 0) array.pop();
};

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
export const getMonthStrByNum = (monthNumber = 1) => {
  return months[monthNumber - 1];
};

export const getLocalIP = () => {
  const interfaces = os.networkInterfaces();

  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
};
