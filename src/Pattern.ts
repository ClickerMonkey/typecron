import { Frequency, FrequencyInput, frequencyParse } from './Frequency';
import { Options, DEFAULT_OPTIONS } from './Options';
import { Period, PeriodDefinition, Periods } from './Period';


export type PatternInput = Record<Period, FrequencyInput>;

export class Pattern
{

  public input: PatternInput;
  public frequency: [PeriodDefinition, Frequency][];
  public options: Options;

  public constructor(input: PatternInput, options: Options = DEFAULT_OPTIONS)
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

  public next(date: Date, maxTries: number = 100): Date | null
  {
    const next = new Date(date.getTime());

    if (this.matches(next))
    {
      const [lastPeriod, lastFrequency] = this.frequency[this.frequency.length - 1]
      const last = lastPeriod.get(next, this.options);

      if (lastFrequency.matches(last))
      {
        lastPeriod.next(next, lastFrequency.next(last), this.options);
      }
    }
    
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

    } while (!this.matches(next) && --maxTries >= 0)

    return maxTries === -1 ? null : next;
  }

  public after(date: Date, maxTries: number = 100): Date | null
  {
    const after = new Date(date.getTime());
    
    do
    {
      for (const [period, frequency] of this.frequency)
      {
        const current = period.get(after, this.options);

        if (frequency.matches(current))
        {
          const afterNext = frequency.next(current) + 1;

          period.next(after, afterNext, this.options);
        }
      }

    } while (this.matches(after) && --maxTries >= 0)

    return maxTries === -1 ? null : after;
  }

}