import { differenceInDays, parse } from 'date-fns';

export function isValidDate(dateStr: string): boolean {
  const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
  return dateRegex.test(dateStr);
}


export const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  
  export const getDaysBetweenDates = (dateStr1: string, dateStr2: string) => {  
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2)

    
    // Calculate the difference in days
    const differenceInDaysResult = differenceInDays(date2, date1);
    
    console.log({differenceInDaysResult})
    return Math.abs(differenceInDaysResult);
  }
  