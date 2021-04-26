/**
 * A class that stores commonly used values.
 */
 export class Constants
 {
 
   /**
    * The number of milliseconds in a second.
    */
   public static readonly MILLIS_IN_SECOND: number = 1000;
 
   /**
    * The number of seconds in a minute.
    */
   public static readonly SECONDS_IN_MINUTE: number = 60;
 
   /**
    * The number of minutes in an hour.
    */
   public static readonly MINUTES_IN_HOUR = 60;
 
   /**
    * The number of hours in a day (not including DST days).
    */
   public static readonly HOURS_IN_DAY: number = 24;
 
   /**
    * The number of days in a week.
    */
   public static readonly DAYS_IN_WEEK: number = 7;
 
   /**
    * The maximum possible number of days in a year.
    */
   public static readonly DAYS_IN_YEAR_MAX: number = 366;
 
   /**
    * The maximum possible number of days in a year.
    */
   public static readonly DAYS_IN_YEAR_MIN: number = 365;
 
   /**
    * The number of milliseconds in a minute.
    */
   public static readonly MILLIS_IN_MINUTE: number = Constants.MILLIS_IN_SECOND * Constants.SECONDS_IN_MINUTE;
 
   /**
    * The number of milliseconds in an hour.
    */
   public static readonly MILLIS_IN_HOUR: number = Constants.MILLIS_IN_MINUTE * Constants.SECONDS_IN_MINUTE;
 
   /**
    * The number of milliseconds in a day (not including DST days).
    */
   public static readonly MILLIS_IN_DAY: number = Constants.MILLIS_IN_HOUR * Constants.HOURS_IN_DAY;
 
   /**
    * The number of milliseconds in a week (not including ones that include DST).
    */
   public static readonly MILLIS_IN_WEEK: number = Constants.MILLIS_IN_DAY * Constants.DAYS_IN_WEEK;
 
   /**
    * The number of minutes in a day (not including DST days).
    */
   public static readonly MINUTES_IN_DAY = Constants.MINUTES_IN_HOUR * Constants.HOURS_IN_DAY;
 
   /**
    * The number of months in a quarter.
    */
   public static readonly MONTHS_IN_QUARTER = 3;
 
   /**
    * The number of quarters in a year.
    */
   public static readonly QUARTERS_IN_YEAR = 4;
 
   /**
    * The number of months in a year.
    */
   public static readonly MONTHS_IN_YEAR: number = 12;
 
   /**
    * The number of years in a decade.
    */
   public static readonly YEARS_IN_DECADE: number = 10;
 
   /**
    * The number of years in a century.
    */
   public static readonly YEARS_IN_CENTURY: number = 100;
 
   /**
    * The number of weeks in a year.
    */
   public static readonly WEEKS_IN_YEAR: number = 52;
 
   /**
    * The number of weeks in a year.
    */
   public static readonly WEEKS_IN_MONTH: number = 5;

   /**
    * The first month of the year.
    */
   public static readonly MONTH_MIN: number = 0;
 
   /**
    * The last month of the year.
    */
   public static readonly MONTH_MAX: number = 11;
 
   /**
    * The first day of a month.
    */
   public static readonly DAY_MIN: number = 1;
 
   /**
    * The last day of the longest month.
    */
   public static readonly DAY_MAX: number = 31;
 
   /**
    * The first hour of the day.
    */
   public static readonly HOUR_MIN: number = 0;
 
   /**
    * The last hour of the day.
    */
   public static readonly HOUR_MAX: number = 23;
 
   /**
    * The first minute of the hour.
    */
   public static readonly MINUTE_MIN: number = 0;
 
   /**
    * The last minute of the hour.
    */
   public static readonly MINUTE_MAX: number = 59;
 
   /**
    * The first second of the minute.
    */
   public static readonly SECOND_MIN: number = 0;
 
   /**
    * The last second of the minute.
    */
   public static readonly SECOND_MAX: number = 59;
 
   /**
    * The first millisecond of the second.
    */
   public static readonly MILLIS_MIN: number = 0;
 
   /**
    * The last millisecond of the second.
    */
   public static readonly MILLIS_MAX: number = 999;
 
   /**
    * The first day of the week.
    */
   public static readonly WEEKDAY_MIN: number = 0;
 
   /**
    * The last day of the week.
    */
   public static readonly WEEKDAY_MAX: number = 6;
 
   /**
    * The last year of the century.
    */
   public static readonly YEAR_OF_CENTURY_MAX: number = 99;
 
}