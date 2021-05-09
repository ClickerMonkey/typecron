



/**
 * The months of the year
 */
export class Month
{

    public static JANUARY: number = 0;
    public static FEBRUARY: number = 1;
    public static MARCH: number = 2;
    public static APRIL: number = 3;
    public static MAY: number = 4;
    public static JUNE: number = 5;
    public static JULY: number = 6;
    public static AUGUST: number = 7;
    public static SEPTEMBER: number = 8;
    public static OCTOBER: number = 9;
    public static NOVEMBER: number = 10;
    public static DECEMBER: number = 11;

   /**
    * The aliases for the months of the year for cron pattern parsing.
    */
    public static ALIASES: Record<string, number> = {
        JAN: 0,
        JANUARY: 0,
        FEB: 1,
        FEBRUARY: 1,
        MAR: 2,
        MARCH: 2,
        APR: 3,
        APRIL: 3,
        MAY: 4,
        JUN: 5,
        JUNE: 5,
        JUL: 6,
        JULY: 6,
        AUG: 7,
        AUGUST: 7,
        SEP: 8,
        SEPT: 8,
        SEPTEMBER: 8,
        OCT: 9,
        OCTOBER: 9,
        NOV: 10,
        NOVEMBER: 10,
        DEC: 11,
        DECEMBER: 11,
    };

}
