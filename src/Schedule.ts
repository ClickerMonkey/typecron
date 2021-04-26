import { Frequency, FrequencyInput, frequencyParse } from './Frequency';
import { CalendarOptions } from './Options';
import { Period, PeriodDefinition, Periods } from './Period';


export type ScheduleInput = Record<Period, FrequencyInput>;

export class Schedule
{

  public input: ScheduleInput;
  public frequency: [PeriodDefinition, Frequency][];
  public options: CalendarOptions;

  public constructor(input: ScheduleInput, options: CalendarOptions = { weekStartsOn: 0, firstWeekContainsDate: 4 })
  {
    this.input = input;
    this.options = options;

    this.frequency = Object.entries(input).map(([period, frequency]) => [Periods[period], frequencyParse(frequency)]);
    this.frequency.sort(([a], [b]) => b.priority - a.priority);
  }

  public matches(date: Date): boolean
  {
    return !this.frequency.some(([ period, frequency ]) => !frequency.matches((period.get(date, this.options))));
  }

  public next(date: Date, maxTries: number = 100): Date
  {
    const next = new Date(date.getTime());

    do
    {
      for (const [period, frequency] of this.frequency)
      {
        const current = period.get(next, this.options);

        if (!frequency.matches(current))
        {
          period.next(next, frequency.next(current), this.options);
        }
      }

    } while (!this.matches(next))

    return next;
  }

}