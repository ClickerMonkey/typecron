import { Constants } from './Constants';
import { DEFAULT_OPTIONS, Options } from './Options';
import { Weekday } from './Weekday';


export function getNext(current: number, next: number, period: number): number
{
  return current + getAddend(current, next, period);
}

export function getAddend(current: number, next: number, period: number): number
{
  const offset = next - current;

  return offset > 0 ? offset : period + offset;
}

export function isArray<T = any>(x: any): x is T[]
{
  return Array.isArray(x);
}

export function isNumber(x: any): x is number
{
  return typeof x === 'number' && isFinite(x);
}

export function isObject<T extends object = Record<string, any>>(x: any): x is T
{
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}

export function isObjectWith<T extends object = Record<string, any>>(x: any, prop: string): x is T
{
  return isObject(x) && prop in x;
}

const daysInMonth = [
  // tslint:disable-next-line: no-magic-numbers
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  // tslint:disable-next-line: no-magic-numbers
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
];

export function getDaysInMonth(x: Date): number
{
  return daysInMonth[isLeapYear(x.getFullYear()) ? 1 : 0][x.getMonth()];
}

export function isLeapYear(year: number): boolean
{
  // tslint:disable-next-line: no-magic-numbers
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

export function getLastDayOfMonth(x: Date): number
{
  return getDaysInMonth(x) - x.getDate() + 1;
}

export function getFullWeekOfMonth(x: Date, options: Options = DEFAULT_OPTIONS): number
{
  return getFullWeekOf(mutate(x, startOfMonth), x.getDate(), options);
}

export function getFullWeekOfYear(x: Date, options: Options = DEFAULT_OPTIONS): number
{
  return getFullWeekOf(mutate(x, startOfYear), getDaysInYear(x.getFullYear()), options);
}

export function getWeekOfYear(x: Date, options: Options = DEFAULT_OPTIONS): number
{
  return getWeek(mutate(x, startOfYear), getDayOfYear(x), options);
}

export function getWeekOfMonth(x: Date, options: Options = DEFAULT_OPTIONS): number
{
  return getWeek(mutate(x, startOfMonth), x.getDate(), options);
}

export function getWeek(start: Date, dayOfStart: number, options: Options = DEFAULT_OPTIONS): number
{
  const { firstWeekContainsDate } = options;
  const dayOfWeekFirst = getDayOfWeek(start, options);
  const hasWeekZero = Constants.DAYS_IN_WEEK - dayOfWeekFirst < firstWeekContainsDate;
  const offset = hasWeekZero
    ? dayOfWeekFirst - 1
    : dayOfWeekFirst - 1 + Constants.DAYS_IN_WEEK;

  return Math.floor((dayOfStart + offset) / Constants.DAYS_IN_WEEK);
}

export function getDayOfWeek(x: Date, options: Options = DEFAULT_OPTIONS): number
{
  const { weekStartsOn } = options;
  const day = x.getDay();

  return day < weekStartsOn 
    ? day - weekStartsOn + Constants.DAYS_IN_WEEK
    : day - weekStartsOn;
}

export function getAbsoluteTimestamp(a: Date): number
{
  return a.getTime() - getTimezoneOffsetInMilliseconds(a);
}

export function getTimezoneOffsetInMilliseconds(a: Date): number
{
  const b = new Date(a.getTime());
  const offsetMinutes = b.getTimezoneOffset();

  b.setSeconds(0, 0);

  const offsetMilliseconds = b.getTime() % Constants.MILLIS_IN_MINUTE;

  return offsetMinutes * Constants.MILLIS_IN_MINUTE + offsetMilliseconds;
}

export function getFullWeekOf(start: Date, dayOfStart: number, options: Options = DEFAULT_OPTIONS): number
{
  const dayOfWeekFirst = getDayOfWeek(start, options);
  const hasWeekZero = dayOfWeekFirst !== Weekday.SUNDAY;
  const offset = hasWeekZero
    ? dayOfWeekFirst - 1
    : dayOfWeekFirst - 1 + Constants.DAYS_IN_WEEK;

  return Math.floor((dayOfStart + offset) / Constants.DAYS_IN_WEEK);
}

export function getDayOfYear(a: Date): number
{
  return Math.round(diffDays(a, mutate(a, startOfYear))) + 1;
}

export function getDaysInYear(year: number): number
{
  return isLeapYear(year) ? Constants.DAYS_IN_YEAR_MAX : Constants.DAYS_IN_YEAR_MIN;
}

export function diffDays(a: Date, b: Date): number 
{
  const leftTimestamp = getAbsoluteTimestamp(a);
  const rightTimestamp = getAbsoluteTimestamp(b);

  return (leftTimestamp - rightTimestamp) / Constants.MILLIS_IN_DAY;
}

export function mutate(a: Date, mutator: (a: Date, options?: Options) => void, options?: Options): Date
{
  const b = new Date(a.getTime());

  mutator(b, options);

  return b;
}

export function startOfYear(x: Date): void
{
  const year = x.getFullYear();

  x.setTime(0);
  x.setFullYear(year, 0, 1);
  x.setHours(0, 0, 0, 0);
}

export function startOfMonth(x: Date): void
{
  x.setDate(Constants.DAY_MIN);
  x.setHours(0, 0, 0, 0);
}

export function startOfWeek(x: Date, options: Options = DEFAULT_OPTIONS): void
{
  const dayOfWeek = getDayOfWeek(x, options);

  x.setDate(x.getDate() - dayOfWeek);
  x.setHours(0, 0, 0, 0);
}