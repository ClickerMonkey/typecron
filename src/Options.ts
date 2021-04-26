

export interface Options
{
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  firstWeekContainsDate: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export const DEFAULT_OPTIONS: Options = { weekStartsOn: 0, firstWeekContainsDate: 4 };