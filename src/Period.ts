import { Constants } from './Constants';
import { Options } from './Options';
import { getAddend, getDayOfYear, getDaysInMonth, getDaysInYear, getFullWeekOfMonth, getFullWeekOfYear, getLastDayOfMonth, getNext, getWeekOfMonth, getWeekOfYear, startOfWeek } from './util';


export type Period = 
  'century' | 
  'decade' | 
  'year' | 
  'quarter' | 
  'month' | 
  'weekOfYear' | 
  'weekOfYearFull' | 
  'weekOfYearFromFirst' |
  'weekOfMonth' | 
  'weekOfMonthFull' |
  'weekOfMonthFromFirst' |
  'dayOfYear' | 
  'dayOfMonth' | 
  'dayOfMonthFromEnd' |
  'dayOfWeek' |
  'hour' | 
  'minute' | 
  'second' | 
  'millisecond'
;

export interface PeriodDefinition
{

  /**
   * The priority of the period. These are evaluated largest first - assuming the largest periods
   * result in the largest jumps.
   */
  priority: number;

  /**
   * Gets the current period value from the given date.
   * 
   * @param date The date to get the period value from.
   * @param options The calendar options.
   */
  get(date: Date, options: Options): number;

  /**
   * Sets the period value of the given date to the next date & time at the start of the given period.
   * 
   * @param date The date to move to the next period start.
   * @param value The period to move the date to the start of.
   * @param options The calendar options.
   */
  next(date: Date, value: number, options: Options): void;

}


export const Periods: Record<Period, PeriodDefinition> = 
{

  /**
   * A century value is typically 2 digits, ex: 20 for 20th century.
   * 
   * A century is from xx01-01-01T00:00:00.000 to xy00-12-31T23:59:59.999
   */
  century: 
  {
    priority: 3155760000000,
    get: (date) => Math.ceil(date.getFullYear() / Constants.YEARS_IN_CENTURY),
    next: (date, value) => {
      date.setFullYear(value * Constants.YEARS_IN_CENTURY - Constants.YEAR_OF_CENTURY_MAX, 0, 1);
      date.setHours(0, 0, 0, 0);
    },
  },

  /**
   * A decade value is typically 3 digits, ex: 202 for 2020
   * 
   * A decade value is from xxx0-01-01T00:00:00.000 to xxx9-12-31T23.59.59.999
   */
  decade: 
  {
    priority: 315360000000,
    get: (date) => Math.floor(date.getFullYear() / 10),
    next: (date, value) => {
      date.setFullYear(value * Constants.YEARS_IN_DECADE, 0, Constants.DAY_MIN);
      date.setHours(0, 0, 0, 0);
    },
  },
  /**
   * A year can be any valid year in a Date object.
   */
  year: 
  {
    priority: 31556952000,
    get: (date) => date.getFullYear(),
    next: (date, value) => {
      date.setFullYear(value, 0, Constants.DAY_MIN);
      date.setHours(0, 0, 0, 0);
    },
  },
  /**
   * Valid values: 0-3
   */
  quarter: 
  {
    priority: 7884000000,
    get: (date) => Math.floor(date.getMonth() / Constants.MONTHS_IN_QUARTER),
    next: (date, value) => {
      date.setMonth(getNext(Math.floor(date.getMonth() / Constants.MONTHS_IN_QUARTER), value, Constants.QUARTERS_IN_YEAR) * Constants.MONTHS_IN_QUARTER);
      date.setHours(0, 0, 0, 0);
    },
  },
  /**
   * Valid values: 0-11
   */
  month:
  {
    priority: 2629800000,
    get: (date) => date.getMonth(),
    next: (date, value) => {
      date.setMonth(getNext(date.getMonth(), value, Constants.MONTHS_IN_YEAR));
      date.setHours(0, 0, 0, 0);
    },
  },
  /**
   * Valid values: 0-52 (depending on year)
   */
  weekOfYear: 
  {
    priority: 604800000,
    get: (date, options) => getWeekOfYear(date, options),
    next: (date, value, options) => {
      const current = Periods.weekOfYear.get(date, options);
      date.setDate(date.getDate() + getAddend(current, value, Constants.WEEKS_IN_YEAR) * Constants.DAYS_IN_WEEK);
      startOfWeek(date, options);
    },
  },
  /**
   * Valid values: 0-52 (depending on year)
   */
  weekOfYearFull: 
  {
    priority: 604800000,
    get: (date, options) => getFullWeekOfYear(date, options),
    next: (date, value, options) => {
      const current = Periods.weekOfYearFull.get(date, options);
      date.setDate(date.getDate() + getAddend(current, value, Constants.WEEKS_IN_YEAR) * Constants.DAYS_IN_WEEK);
      startOfWeek(date, options);
    },
  },
  /**
   * Valid values: 0-52 (depending on year)
   */
  weekOfYearFromFirst: 
  {
    priority: 604800000,
    get: (date) => Math.floor(getDayOfYear(date) / Constants.DAYS_IN_WEEK),
    next: (date, value, options) => {
      const current = Periods.weekOfYearFromFirst.get(date, options);
      date.setDate(date.getDate() + getAddend(current, value, Constants.WEEKS_IN_YEAR) * Constants.DAYS_IN_WEEK);
      startOfWeek(date, options);
    },
  },
  /**
   * Valid values: 0-5 (depending om month)
   */
  weekOfMonth: 
  {
    priority: 604800000,
    get: (date, options) => getWeekOfMonth(date, options),
    next: (date, value, options) => {
      const current = Periods.weekOfMonth.get(date, options);
      date.setDate(date.getDate() + getAddend(current, value, Constants.WEEKS_IN_MONTH) * Constants.DAYS_IN_WEEK);
      startOfWeek(date, options);
    },
  },
  /**
   * Valid values: 0-4 (depending om month)
   */
  weekOfMonthFull: 
  {
    priority: 604800000,
    get: (date, options) => getFullWeekOfMonth(date, options),
    next: (date, value, options) => {
      const current = Periods.weekOfMonthFull.get(date, options);
      date.setDate(date.getDate() + getAddend(current, value, Constants.WEEKS_IN_MONTH) * Constants.DAYS_IN_WEEK);
      startOfWeek(date, options);
    },
  },
  /**
   * Valid values: 0-4 (depending om month)
   */
  weekOfMonthFromFirst: 
  {
    priority: 604800000,
    get: (date) => Math.floor((date.getDate() - 1) / Constants.DAYS_IN_WEEK),
    next: (date, value, options) => {
      const current = Periods.weekOfMonthFromFirst.get(date, options);
      date.setDate(date.getDate() + getAddend(current, value, Constants.WEEKS_IN_MONTH) * Constants.DAYS_IN_WEEK);
      startOfWeek(date, options);
    },
  },
  /**
   * Valid values: 0-366 (depending on year)
   */
  dayOfYear: 
  {
    priority: 86400000,
    get: (date, options) => getDayOfYear(date),
    next: (date, value, options) => {
      const current = Periods.dayOfYear.get(date, options);
      date.setDate(date.getDate() + getAddend(current, value, getDaysInYear(date.getFullYear())));
      date.setHours(0, 0, 0, 0);
    },
  },
  /**
   * Valid values: 0-6
   */
  dayOfWeek: 
  {
    priority: 86400000,
    get: (date) => date.getDay(),
    next: (date, value) => {
      date.setDate(date.getDate() + getAddend(date.getDay(), value, Constants.DAYS_IN_WEEK));
      date.setHours(0, 0, 0, 0);
    },
  },
  /**
   * Valid values: 1-31 (depending on month)
   */
  dayOfMonth: 
  {
    priority: 86400000,
    get: (date) => date.getDate(),
    next: (date, value) => {
      const current = date.getDate();
      date.setDate(getNext(current, value, getDaysInMonth(date)));
      date.setHours(0, 0, 0, 0);
    },
  },
  /**
   * Valid values: 1-31 (depending on month, 1 = last day)
   */
  dayOfMonthFromEnd: 
  {
    priority: 86400000,
    get: (date) => getLastDayOfMonth(date),
    next: (date, value, options) => {
      const current = Periods.dayOfMonthFromEnd.get(date, options);
      date.setDate(date.getDate() - getAddend(current, value, getDaysInMonth(date)));
      date.setHours(0, 0, 0, 0);
    },
  },
  /**
   * Value values: 0-23
   */
  hour: 
  {
    priority: 3600000,
    get: (date) => date.getHours(),
    next: (date, value) => {
      date.setHours(getNext(date.getHours(), value, Constants.HOURS_IN_DAY), 0, 0, 0);
    },
  },
  /**
   * Value values: 0-59
   */
  minute: 
  {
    priority: 60000,
    get: (date) => date.getMinutes(),
    next: (date, value) => {
      date.setMinutes(getNext(date.getMinutes(), value, Constants.MINUTES_IN_HOUR), 0, 0);
    },
  },
  /**
   * Value values: 0-59
   */
  second: 
  {
    priority: 1000,
    get: (date) => date.getSeconds(),
    next: (date, value) => {
      date.setSeconds(getNext(date.getSeconds(), value, Constants.SECONDS_IN_MINUTE), 0);
    },
  },
  /**
   * Value values: 0-999
   */
  millisecond: 
  {
    priority: 1000,
    get: (date) => date.getMilliseconds(),
    next: (date, value) => { 
      date.setMilliseconds(getNext(date.getMilliseconds(), value, Constants.MILLIS_IN_SECOND));
    },
  },
};

