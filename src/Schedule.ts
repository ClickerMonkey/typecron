import { DEFAULT_OPTIONS, Options } from './Options';
import { Pattern, PatternInput } from './Pattern';
import { isArray, isObjectWith } from './util';


export type ScheduleInput = PatternInput | PatternInput[] | { on: PatternInput | PatternInput[], not?: PatternInput | PatternInput[] };



export class Schedule
{

    public input: ScheduleInput;
    public on: Pattern[];
    public not: Pattern[];

    public constructor(input: ScheduleInput, options: Options = DEFAULT_OPTIONS)
    {
        this.input = input;

        this.on = (isArray(input) 
            ? input
            : isObjectWith<{ on: PatternInput | PatternInput[] }>(input, 'on')
                ? isArray(input.on)
                    ? input.on
                    : [input.on]
                : [input]
        ).map(i => new Pattern(i));

        this.not = (isObjectWith<{ not: PatternInput | PatternInput[] }>(input, 'not')
                ? isArray(input.not)
                    ? input.not
                    : [input.not]
                : []
        ).map(i => new Pattern(i));
    }

    public matches(date: Date): boolean
    {
        return this.isOn(date) && !this.isNot(date);
    }

    public isOn(date: Date): boolean
    {
        return this.on.some(p => p.matches(date));
    }

    public isNot(date: Date): boolean
    {
        return this.not.some(p => p.matches(date));
    }

    public next(date: Date, maxTries: number = 100): Date | null
    {
        let next = new Date(date.getTime());

        if (this.matches(next))
        {
            const minNext = this.getMinNext(next, maxTries);

            if (minNext === null)
            {
                return null;
            }

            next = minNext;
        }

        let outerTries = maxTries;

        do
        {
            const minNext = this.getMinNext(next, maxTries);

            if (minNext === null)
            {
                return null;
            }

            next = minNext;

        } while (!this.matches(next) && --outerTries >= 0);

        return outerTries === -1 ? null : next;
    }

    protected getMinNext(date: Date, maxTries: number = 100): Date | null
    {
        let min: Date | null = null;

        for (const pattern of this.on)
        {
            const next = pattern.next(date, maxTries);

            if (next !== null)
            {
                min = min === null || next.getTime() < min.getTime() ? next : min;
            }
        }

        if (min === null || this.not.length === 0)
        {
            return min;
        }

        for (const pattern of this.not)
        {
            if (min !== null && pattern.matches(min))
            {
                min = pattern.after(min, maxTries);
            }
        }

        return min;
    }

}