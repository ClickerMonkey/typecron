import { CalendarOptions } from './Options';
import { getAddend, getNext } from './util';


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
  get(date: Date, options: CalendarOptions): number;

  /**
   * Sets the period value of the given date to the next date & time at the start of the given period.
   * 
   * @param date The date to move to the next period start.
   * @param value The period to move the date to the start of.
   * @param options The calendar options.
   */
  next(date: Date, value: number, options: CalendarOptions): void;

  /**
   * Sets the period value of the given date to the date & time at the end of the given period (exclusive).
   * 
   * @param date The date to move to the next period end.
   * @param value The period to move the date to the end of (exclusive).
   * @param options The calendar options.
   */
  after(date: Date, value: number, options: CalendarOptions): void;

}


export const Periods: Record<Period, PeriodDefinition> = 
{
  century: {
    priority: 3155760000000,
    get: (date) => Math.ceil(date.getFullYear() / 100),
    next: (date, value) => {
      date.setHours(0, 0, 0, 0);
      date.setFullYear(value * 100 - 99, 0, 1);
    },
  },
  decade: {
    priority: 315360000000,
    get: (date) => Math.floor(date.getFullYear() / 10),
    next: (date, value) => {
      date.setHours(0, 0, 0, 0);
      date.setFullYear(value * 10, 0, 1);
    },
  },
  year: {
    priority: 31556952000,
    get: (date) => date.getFullYear(),
    next: (date, value) => {
      date.setHours(0, 0, 0, 0);
      date.setFullYear(value, 0, 1);
    },
  },
  quarter: {
    priority: 7884000000,
    get: (date) => Math.floor(date.getMonth() / 3),
    next: (date, value) => {
      date.setHours(0, 0, 0, 0);
      date.setMonth(getNext(Math.floor(date.getMonth() / 3), value, 4) * 3);
    },
  },
  month: {
    priority: 2629800000,
    get: (date) => date.getMonth(),
    next: (date, value) => {
      date.setHours(0, 0, 0, 0);
      date.setMonth(getNext(date.getMonth(), value, 12));
    },
  },
  weekOfYear: {
    priority: -1,
    get: () => { throw new Error('not yet implemented') },
    next: () => { throw new Error('not yet implemented') },
  },
  weekOfYearFull: {
    priority: -1,
    get: () => { throw new Error('not yet implemented') },
    next: () => { throw new Error('not yet implemented') },
  },
  weekOfYearFromFirst: {
    priority: -1,
    get: () => { throw new Error('not yet implemented') },
    next: () => { throw new Error('not yet implemented') },
  },
  weekOfMonth: {
    priority: 86400002,
    get: (date) => date.getMonth(),
    next: (date, value) => {
      date.setHours(0, 0, 0, 0);
      date.setMonth(getNext(date.getMonth(), value, 12));
    },
  },
  weekOfMonthFull: {
    priority: -1,
    get: () => { throw new Error('not yet implemented') },
    next: () => { throw new Error('not yet implemented') },
  },
  weekOfMonthFromFirst: {
    priority: -1,
    get: () => { throw new Error('not yet implemented') },
    next: () => { throw new Error('not yet implemented') },
  },
  dayOfWeek: {
    priority: 86400001,
    get: (date) => date.getDay(),
    next: (date, value) => {
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + getAddend(date.getDay(), value, 7));
    },
  },
  dayOfYear: {
    priority: -1,
    get: () => { throw new Error('not yet implemented') },
    next: () => { throw new Error('not yet implemented') },
  },
  dayOfMonth: {
    priority: 86400000,
    get: (date) => date.getDate(),
    next: (date, value) => {
      const month = date.getFullYear();
      const current = date.getDate();
      const nextMonth = current <= value ? month + 1 : month;
      date.setHours(0, 0, 0, 0);
      date.setMonth(nextMonth, value);
    },
  },
  dayOfMonthFromEnd: {
    priority: -1,
    get: () => { throw new Error('not yet implemented') },
    next: () => { throw new Error('not yet implemented') },
  },
  hour: {
    priority: 3600000,
    get: (date) => date.getHours(),
    next: (date, value) => {
      date.setHours(getNext(date.getHours(), value, 24), 0, 0, 0);
    },
  },
  minute: {
    priority: 60000,
    get: (date) => date.getMinutes(),
    next: (date, value) => {
      date.setMinutes(getNext(date.getMinutes(), value, 60), 0, 0);
    },
  },
  second: {
    priority: 1000,
    get: (date) => date.getSeconds(),
    next: (date, value) => {
      date.setSeconds(getNext(date.getSeconds(), value, 60), 0);
    },
  },
  millisecond: {
    priority: 1000,
    get: (date) => date.getMilliseconds(),
    next: (date, value) => { 
      date.setMilliseconds(getNext(date.getMilliseconds(), value, 1000));
    },
  },
};

