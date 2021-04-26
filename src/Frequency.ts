import { isArray, isNumber, isObject } from './util';

export interface Frequency
{
  matches(n: number): boolean;
  next(n: number): number;
}

export type FrequencyInput = string | number | number[] | { every: number, other?: number };

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
  const adjustment = every - offset;

  return {
    matches: (n) => n % every === offset,
    next: (n) => n + (every - ((n + adjustment) % every)),
  };
}

export function frequencyParse(input?: FrequencyInput): Frequency
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
    return frequencyMultiple(input);
  }
  else if (isObject(input))
  {
    return frequencyEvery(input.every, input.other);
  }
  else
  {
    if (input.match(/^\d+$/))
    {
      return frequencySingle(parseInt(input, 10));
    }
    else if (input.match(/\*\/\d+/))
    {
      return frequencyEvery(parseInt(input.substring(1 + 1)));
    }
    else if (input.indexOf(',') !== -1)
    {
      return frequencyMultiple(input.split(',').map(p => parseInt(p, 10)));
    }
  }

  throw new Error(`Invalid frequency: ${input}`);
}