const date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

export function getRequestDate(setMonth: number, setYear: number) {
  year = setYear;
  month = setMonth;
  if (setMonth === 11) {
    return `${year + 1}/${1}`;
  }
  return `${year}/${month + 2}`;
}
