const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

//returns the name of the month
export const getMonthName = index => monthNames[index];

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//checks if year is a leap year
const isLeapYear = year => year % 4 === 0;

//creates 2D arrays with a length of 42
const getEmptyRows = () => {
    return Array.from({ length: 42 }).map(() => []);
  };

//returns the days in the month: if index !== 1; return monthDays[index]
const getMonthDays = (index, year) => {
    return index !== 1 ? monthDays[index] : isLeapYear(year) ? 29 : 28;
};

//returns month[month], total # of days in the month
const getMonthStats = (monthIndex, year) => {
    const today = new Date(year, monthIndex, 1);
    const index = today.getMonth();
    return {
      name: index[index],
      days: getMonthDays(index, year)
    };
  };

export const getDateRows = (monthIndex, year) => {
  const { days } = getMonthStats(monthIndex, year);
  const rows = getEmptyRows();
  const startIndex = new Date(year, monthIndex, 1).getDay();
  Array.from({ length: days }).forEach((_, i) => {
    const index = startIndex + i;
    rows[index] = i + 1;
  });
  const filled = rows.map(i => (Array.isArray(i) ? undefined : i));
  
  return filled[35] ? filled : filled.slice(0, -7);
};



