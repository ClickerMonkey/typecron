

/**
 * The days in a week.
 */
 export class DayOfWeek
 {
 
   public static SUNDAY: number = 0;
   public static MONDAY: number = 1;
   public static TUESDAY: number = 2;
   public static WEDNESDAY: number = 3;
   public static THURSDAY: number = 4;
   public static FRIDAY: number = 5;
   public static SATURDAY: number = 6;
 
   /**
    * The full list of days in a week.
    */
   public static LIST: number[] = [
     DayOfWeek.SUNDAY,
     DayOfWeek.MONDAY,
     DayOfWeek.TUESDAY,
     DayOfWeek.WEDNESDAY,
     DayOfWeek.THURSDAY,
     DayOfWeek.FRIDAY,
     DayOfWeek.SATURDAY
   ];
 
   /**
    * The list of days starting with Monday and ending on Friday.
    */
   public static WEEK: number[] = [
     DayOfWeek.MONDAY,
     DayOfWeek.TUESDAY,
     DayOfWeek.WEDNESDAY,
     DayOfWeek.THURSDAY,
     DayOfWeek.FRIDAY
   ];
 
   /**
    * The days on the weekend, starting with Saturday and ending with Sunday.
    */
   public static ENDS: number[] = [
     DayOfWeek.SATURDAY,
     DayOfWeek.SUNDAY
   ];

   /**
    * The aliases for the days of the week for cron pattern parsing.
    */
   public static ALIASES: Record<string, number> = {
    SUN: 0,
    SUNDAY: 0,
    MON: 1,
    MONDAY: 0,
    TUE: 2,
    TUESDAY: 2,
    WED: 3,
    WEDNESDAY: 3,
    THU: 4,
    THUR: 4,
    THURS: 4,
    THURSDAY: 4,
    FRI: 5,
    FRIDAY: 5,
    SAT: 6,
    SATURDAY: 6,
   };
 
 }