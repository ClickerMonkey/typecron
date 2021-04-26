

export function getNext(current: number, next: number, period: number): number
{
  return current + getAddend(current, next, period);
}

export function getAddend(current: number, next: number, period: number): number
{
  const offset = next - current;

  return offset > 0 ? offset : period + offset;
}