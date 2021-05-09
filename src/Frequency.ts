import { isArray, isNumber, isObject } from './util';

/**
 * A frequency is something that can occur on any number of numbers.
 */
export interface Frequency
{

  /**
   * Is the given number found on this frequency?
   * 
   * @param n The number to check.
   */
  matches(n: number): boolean;

  /**
   * What is the next number on the frequency after the given one.
   * 
   * @param n The number to start searching after for the next number.
   */
  next(n: number): number;

}

/**
 * Valid inputs for creating a frequency.
 * 
 * 1. A string is parsed as a cron expression:
 *  - * = means always
 *  - 5 = means on 5 alone
 *  - 1,2,5 = means on 1, 2, and 6
 *  - 5-7 = means 5, 6, and 7
 *  - 1-3,5-7 = means 1, 2, 3, 5, 6, and 7
 *  - *\/2 = means every 2 (0, 2, 4, ...)
 *  - 1\/5 = means every 5 starting on the first (1, 6, 11, 16, ...)
 * 2. A number means only that number
 * 3. An array of numbers means only those numbers in sorted order.
 * 4. 
 * 5. An object with every and other
 */
export type FrequencyInput = string | number | number[] | [number, number?][] | { every: number, offset?: number };

export function frequencyAlways(): Frequency
{
  return {
    matches: (n) => true,
    next: (n) => n + 1,
  };
}

export function frequencySingle(x: number): Frequency
{
  return {
    matches: (n) => n === x,
    next: (n) => x,
  };
}

export function frequencyMultiple(x: number[]): Frequency
{
  const sorted = x.slice().sort((a, b) => a - b);

  return {
    matches: (n) => sorted.indexOf(n) !== -1,
    next: (n) => {
      const i = sorted.findIndex((y) => y > n);
      
      return i === -1 ? sorted[0] : sorted[i];
    },
  };
}

export function frequencyEvery(every: number, offset: number = 0): Frequency
{
  const wrappedOffset = offset % every;
  const adjustment = every - wrappedOffset;

  return {
    matches: (n) => n % every === wrappedOffset,
    next: (n) => n + (every - ((n + adjustment) % every)),
  };
}

export function frequencyRanges(ranges: [number, number?][]): Frequency
{
  const minmax: [number, number][] = ranges.map(([min, max]) => [
    max === undefined ? min : Math.min(min, max),
    max === undefined ? min : Math.max(min, max)
  ]);
  const sorted = minmax.sort(([a], [b]) => a - b);

  const getRangeIndex = (n: number) => sorted.findIndex(([min, max]) => n >= min && n <= max);

  return {
    matches: (n) => getRangeIndex(n) !== -1,
    next: (n) => {
      for (const [min, max] of sorted) {
        if (n < min) {
          return min;
        }
        if (n < max) {
          return n + 1;
        }
      }

      return sorted[0][0];
    },
  };
}

export function frequencyParse(input?: FrequencyInput, aliases?: Record<string, number>): Frequency
{
  if (input === undefined || input === '*')
  {
    return frequencyAlways();
  }
  else if (isNumber(input))
  {
    return frequencySingle(input);
  }
  else if (isArray(input))
  {
    if (isArray(input[0]))
    {
      return frequencyRanges(input as [number, number?][]);
    }
    else
    {
      return frequencyMultiple(input as number[]);
    }
  }
  else if (isObject(input))
  {
    return frequencyEvery(input.every, input.offset);
  }
  else
  {
    const parseNumber = (x: string): number => 
    {
      if (aliases) 
      {
        const key = x.toUpperCase();

        if (isNumber(aliases[key])) 
        {
          return aliases[key];
        }
      }

      const y = parseInt(x, 10);

      if (!isFinite(y)) 
      {
        throw new Error(`${x} is not a valid value.`);
      }

      return y;
    };

    if (input.match(/^\d+$/))
    {
      return frequencySingle(parseNumber(input));
    }
    else if (input.match(/(\*|\d+)\/\d+/))
    {
      const [offset, every] = input.split('/');

      return frequencyEvery(parseNumber(every), offset === '*' ? 0 : parseNumber(offset));
    }
    else if (input.indexOf(',') !== -1)
    {
      if (input.indexOf('-') === -1)
      {
        return frequencyMultiple(input.split(',').map(p => parseNumber(p)));
      }
      else
      {
        return frequencyRanges(input.split(',').map(x => {
          const k = x.indexOf('-', 1);

          return k === -1
            ? [parseNumber(x)]
            : [parseNumber(x.substring(0, k)), parseNumber(x.substring(k + 1))];
        }));
      }
    }
  }

  throw new Error(`Invalid frequency: ${input}`);
}