/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// Util functions for calculations
// NOTE: THese functions are not imported anywhere, but they are needed while evaluating the expressions
const wf_minimum = (first: number, second: number) => {
  return Math.min(first, second);
};
const wf_maximum = (first: number, second: number) => {
  return Math.max(first, second);
};
const wf_sum = (first: number, second: number) => {
  return first + second;
};
export const wf_sumAll = (values: string | number) => {
  const arr = typeof values === "string" ? values.split(',').map((item) => parseFloat(item)) : [values];
  return arr.reduce((a, b) => a + b, 0.0);
}
export const wf_calculatePercentage = (first: number, second: number) => {
  const result = (first / second) * 100;
  return result.toFixed(2);
}
export const wf_getPercentage = (first: number, second: number) => {
  const result = first * 100 / second;
  return result.toFixed(2);
}
export const wf_calculatePercentageWithValue = (first: number, second: number) => {
  const result = first * second / 100;
  return result.toFixed(2);
}
export const wf_round = (value: number) => {
  return Math.round(value);
}
export const wf_concat = (string1: string, string2: string, isemail = false, sep = ' ') => {
  if (isemail) {
    return `${string1}@${string2}`;
  }
  return `${string1}${sep}${string2}`;
}
export const wf_roundUp = (value: number) => {
  return Math.ceil(value);
}
export const wf_roundDown = (value: number) => {
  return Math.floor(value);
}
export const wf_divide = (first: number, second: number) => {
  if (second == 0) return 0;
  const result = first / second;
  return result.toFixed(2);
}
export const wf_multiply = (first: number, second: number) => {
  const result = first * second;
  return result.toFixed(2);
}
export const wf_averageAll = (values: string | number) => {
  const arr = typeof values === "string" ? values.split(',').map((item) => parseFloat(item)) : [values];
  const sum = arr.reduce((a, b) => a + b, 0.0);
  return (sum / arr.length).toFixed(2);
}
export const wf_getOverallPercentage = (first: string | number, second: string | number) => {
  const result = wf_sumAll(first) * 100 / wf_sumAll(second);
  return result.toFixed(2);
}
export const wf_sub = (first: string | number, second = '') => {
  const result = parseFloat(first.toString()) - parseFloat(second.toString()) || 0;
  return result.toFixed(2);
}
export const wf_power = (first: string | number, second: string | number) => {
  if (first === "") return "";
  if (second === "") return 1;
  const result = Math.pow(parseFloat(first.toString()), parseFloat(second.toString()));
  return result;
}
export const wf_calculateEMI = (monthTerm: number, principal: number, interestRate: number, loanRequest = 'emi') => {
  let monthlyPayment;
  if (loanRequest == 'emi') {
    const annualInterestRate = interestRate / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const power = -(monthTerm);
    const denom = Math.pow((1 + monthlyInterestRate), power);
    monthlyPayment = principal * (monthlyInterestRate / (1 - denom));
  } else if (loanRequest == 'epi' || loanRequest == 'discount') {
    monthlyPayment = principal / monthTerm;
  }
  return monthlyPayment;
}
export const wf_copyValue = (repField: string, repIndex: string) => {
  const repField2 = repField.split(',');
  const index = parseInt(repIndex) - 1;
  const result = (repField2[index]) && repField2[index] ? repField2[index] : 0;
  return result;
}
export const wf_dateDiff = (firstDate: string, secondDate: string, sign = '0') => {
  if (firstDate == '' || secondDate == '' || firstDate.indexOf('NaN') != -1 || secondDate.indexOf('NaN') != -1) {
    return 0;
  }
  const startDay = new Date(firstDate);
  const endDay = new Date(secondDate);
  const diff = endDay.getTime() - startDay.getTime();
  let days = diff / 1000 / 60 / 60 / 24;
  if (sign == '1') {
    if (days > 0) {
      days = Math.round(days);
      return days;
    } else {
      days = Math.round(days);
      return days;
    }
  }
  return Math.round(Math.abs(days));
}
export const wf_last_working_day = (date1: string) => {
  if (date1 == '' || date1.indexOf('NaN') != -1) {
    return 0;
  }
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(date1);
  const y = date.getFullYear(), m = date.getMonth();
  const lastDay = new Date(y, m + 1, 0);
  const monthName = months[lastDay.getMonth()];
  const lastDateofGivenMonth = lastDay.getDate() + '-' + monthName + '-' + lastDay.getFullYear();
  return lastDateofGivenMonth;
}
export const wf_add_year = (date: string, count: string) => {
  if (date == '' || date.indexOf('NaN') != -1) {
    return 0;
  }
  const currentDate = new Date(date);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  currentDate.setFullYear(currentDate.getFullYear() + parseInt(count));
  const day = ('0' + currentDate.getDate()).slice(-2);
  const year = currentDate.getFullYear();
  const monthName = months[currentDate.getMonth()];
  const futureDate = day + "-" + monthName + "-" + year;

  return futureDate;
}
export const wf_sub_year = (date: string, count: string) => {
  if (date == '' || date.indexOf('NaN') != -1) {
    return 0;
  }
  const currentDate = new Date(date);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  currentDate.setFullYear(currentDate.getFullYear() - parseInt(count));
  const day = ('0' + currentDate.getDate()).slice(-2);
  const year = currentDate.getFullYear();
  const monthName = months[currentDate.getMonth()];
  const futureDate = day + "-" + monthName + "-" + year;

  return futureDate;
}
export const wf_calculateYearsInDecimal = (date: string) => {
  if (date == '' || date.indexOf('NaN') != -1) {
    return 0;
  }
  const dateTime1 = (new Date(date)).getTime();
  const dateTime2 = (new Date()).getTime();
  let result = 0;
  if (dateTime2 > dateTime1) {
    const diff = dateTime2 - dateTime1;
    const days = diff / 1000 / 60 / 60 / 24;
    const monthDiff = calculateYearsMonthsDays(Math.round(Math.abs(days)), 'm');
    const yearDiff = calculateYearsMonthsDays(Math.round(Math.abs(days)), 'Y');
    result = yearDiff + (monthDiff / 12);
  }
  return result;
}
export const wf_currentDate = (date = '') => {
  if (date == '' || date.indexOf('NaN') != -1) {
    const currentDate = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = ('0' + currentDate.getDate()).slice(-2);
    const monthName = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const futureDate = day + "-" + monthName + "-" + year;
    return futureDate;
  } else {
    const currentDate = new Date(date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = ('0' + currentDate.getDate()).slice(-2);
    const monthName = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const futureDate = day + "-" + monthName + "-" + year;
    return futureDate;
  }
}
export const calculateYearsMonthsDays = (numberofdays: number, returntype: 'm' | 'Y' | 'd') => {
  const y = 365;
  const y2 = 31;
  const remainder = numberofdays % y;
  const days = remainder % y2;
  const year = (numberofdays - remainder) / y;
  const month = (remainder - days) / y2;
  switch (returntype) {
    case 'm':
      return month;
    case 'Y':
      return year;
    case 'd':
      return days;
  }
}

export const wf_SubString = (param1: string, param2: number, param3 = '') => {
  if (param3 == '') {
    return param1.substring(param2);
  } else {
    return param1.substring(param2, Number(param3));
  }
}

const wf_calculateMonth = (date_str: string) => {
  const date = new Date(date_str);
  const today = new Date();
  return (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) ? 0 : Math.floor(Math.abs(today.getTime() - date.getTime()) / (1000 * 3600 * 24 * 30));
};
const wf_calculate_days = (date_str: string) => {
  const date = new Date(date_str);
  const today = new Date();
  const timeDiff = Math.abs(today.getTime() - date.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
const wf_calculateYears = (timestamp: number) => {
  const date = new Date(timestamp);
  const today = new Date();
  const years = today.getFullYear() - date.getFullYear();
  return Math.max(0, years - ((today.getMonth() < date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())) ? 1 : 0));
};
const calcFunctions = {
  wf_minimum,
  wf_maximum,
  wf_sum,
  wf_calculateMonth,
  wf_calculate_days,
  wf_calculateYears,
  wf_sumAll,
  wf_calculatePercentage,
  wf_getPercentage,
  wf_calculatePercentageWithValue,
  wf_round,
  wf_concat,
  wf_roundUp,
  wf_roundDown,
  wf_divide,
  wf_multiply,
  wf_averageAll,
  wf_getOverallPercentage,
  wf_sub,
  wf_power,
  wf_calculateEMI,
  wf_copyValue,
  wf_dateDiff,
  wf_last_working_day,
  wf_add_year,
  wf_sub_year,
  wf_calculateYearsInDecimal,
  calculateYearsMonthsDays,
  wf_currentDate,
  wf_SubString
}
console.log(Object.keys(calcFunctions))

export const evaluateStringExpression = (
  expression: string | undefined,
  variables: Record<string, string>
) => {
  if (!expression) return null;
  // Replace placeholders with actual values
  const replacedExpression = expression.replace(
    /\{([^}]+)\}/g,
    // @ts-ignore
    (_, variable) => {
      const value = variables[variable.trim()];
      return value;
    }
  );
  return replacedExpression;
}

export const evaluateExpression = (
  expression: string | undefined,
  variables: Record<string, number | string | undefined>
) => {
  if (!expression) return null;
  // Replace placeholders with actual values
  let anyValueIsNan = false;
  let replacedExpression = expression.replace(
    /\{([^}]+)\}/g,
    // @ts-ignore
    (_, variable) => {
      const value = variables[variable.trim()];
      if (value === undefined) return "''";
      if (typeof value === "string") return `'${value}'`; // Surround string values with quotes
      if (isNaN(value)) anyValueIsNan = true;
      return isNaN(value) ? `'${value}'` : value; // Surround non-numeric values with quotes
    }
  );
  replacedExpression = replacedExpression.replace(new RegExp("@", "g"), '"');
  if (anyValueIsNan) return undefined;

  // Use the eval() function to evaluate the expression
  try {
    let result = eval(replacedExpression);
    if (typeof result === "number") result = result.toFixed(2).replace(/[.,]00$/, ""); // show decimal only if non zero
    if (typeof result === "string") result = result.trim();
    return result;
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return null; // or handle the error in a way that makes sense for your application
  }
};
