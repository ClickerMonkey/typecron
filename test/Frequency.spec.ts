import { frequencyParse } from '../src';


describe('Frequency', () =>
{

    it('parses single', () =>
    {
        const f = frequencyParse(3);

        expect(f.matches(2)).toBeFalsy();
        expect(f.matches(3)).toBeTruthy();
        expect(f.matches(4)).toBeFalsy();
    });

    it('parses single string', () =>
    {
        const f = frequencyParse('3');

        expect(f.matches(2)).toBeFalsy();
        expect(f.matches(3)).toBeTruthy();
        expect(f.matches(4)).toBeFalsy();
    });

    it('single next', () =>
    {
        const f = frequencyParse(3);

        expect(f.next(2)).toBe(3);
        expect(f.next(3)).toBe(3);
        expect(f.next(4)).toBe(3);
    });

    it('parses multiple', () =>
    {
        const f = frequencyParse([3, 5]);

        expect(f.matches(2)).toBeFalsy();
        expect(f.matches(3)).toBeTruthy();
        expect(f.matches(4)).toBeFalsy();
        expect(f.matches(5)).toBeTruthy();
        expect(f.matches(6)).toBeFalsy();
    });

    it('parses multiple string', () =>
    {
        const f = frequencyParse('3,5');

        expect(f.matches(2)).toBeFalsy();
        expect(f.matches(3)).toBeTruthy();
        expect(f.matches(4)).toBeFalsy();
        expect(f.matches(5)).toBeTruthy();
        expect(f.matches(6)).toBeFalsy();
    });

    it('multiple next', () =>
    {
        const f = frequencyParse([3, 5]);

        expect(f.next(2)).toBe(3);
        expect(f.next(3)).toBe(5);
        expect(f.next(4)).toBe(5);
        expect(f.next(5)).toBe(3);
        expect(f.next(6)).toBe(3);
    });

    it('parses ranges', () =>
    {
        const f = frequencyParse([[1], [3, 5], [-4, -1]]);

        expect(f.matches(-5)).toBeFalsy();
        expect(f.matches(-4)).toBeTruthy();
        expect(f.matches(-3)).toBeTruthy();
        expect(f.matches(-2)).toBeTruthy();
        expect(f.matches(-1)).toBeTruthy();
        expect(f.matches(+0)).toBeFalsy();
        expect(f.matches(+1)).toBeTruthy();
        expect(f.matches(+2)).toBeFalsy();
        expect(f.matches(+3)).toBeTruthy();
        expect(f.matches(+4)).toBeTruthy();
        expect(f.matches(+5)).toBeTruthy();
        expect(f.matches(+6)).toBeFalsy();
    });

    it('parses ranges string', () =>
    {
        const f = frequencyParse('1,3-5,-4--1');

        expect(f.matches(-5)).toBeFalsy();
        expect(f.matches(-4)).toBeTruthy();
        expect(f.matches(-3)).toBeTruthy();
        expect(f.matches(-2)).toBeTruthy();
        expect(f.matches(-1)).toBeTruthy();
        expect(f.matches(+0)).toBeFalsy();
        expect(f.matches(+1)).toBeTruthy();
        expect(f.matches(+2)).toBeFalsy();
        expect(f.matches(+3)).toBeTruthy();
        expect(f.matches(+4)).toBeTruthy();
        expect(f.matches(+5)).toBeTruthy();
        expect(f.matches(+6)).toBeFalsy();
    });

    it('parses ranges string aliases', () =>
    {
        const f = frequencyParse('JAN,APR-JUN', {
            JAN: 0,
            APR: 3,
            JUN: 5,
        });

        expect(f.matches(+0)).toBeTruthy();
        expect(f.matches(+1)).toBeFalsy();
        expect(f.matches(+2)).toBeFalsy();
        expect(f.matches(+3)).toBeTruthy();
        expect(f.matches(+4)).toBeTruthy();
        expect(f.matches(+5)).toBeTruthy();
        expect(f.matches(+6)).toBeFalsy();
    });

    it('ranges next', () =>
    {
        const f = frequencyParse([[1], [3, 5], [-4, -1]]);

        expect(f.next(-5)).toBe(-4);
        expect(f.next(-4)).toBe(-3);
        expect(f.next(-3)).toBe(-2);
        expect(f.next(-2)).toBe(-1);
        expect(f.next(-1)).toBe(1);
        expect(f.next(+0)).toBe(1);
        expect(f.next(+1)).toBe(3);
        expect(f.next(+2)).toBe(3);
        expect(f.next(+3)).toBe(4);
        expect(f.next(+4)).toBe(5);
        expect(f.next(+5)).toBe(-4);
        expect(f.next(+6)).toBe(-4);
    });

    it('parses every', () =>
    {
        const f = frequencyParse({ every: 2 });

        expect(f.matches(0)).toBeTruthy();
        expect(f.matches(1)).toBeFalsy();
        expect(f.matches(2)).toBeTruthy();
        expect(f.matches(3)).toBeFalsy();
        expect(f.matches(4)).toBeTruthy();
    });

    it('parses every string', () =>
    {
        const f = frequencyParse('*/3');

        expect(f.matches(1)).toBeFalsy();
        expect(f.matches(2)).toBeFalsy();
        expect(f.matches(3)).toBeTruthy();
        expect(f.matches(4)).toBeFalsy();
        expect(f.matches(5)).toBeFalsy();
        expect(f.matches(6)).toBeTruthy();
    });

    it('every next', () =>
    {
        const f = frequencyParse({ every: 2 });

        expect(f.next(2)).toBe(4);
        expect(f.next(3)).toBe(4);
        expect(f.next(4)).toBe(6);
        expect(f.next(5)).toBe(6);
        expect(f.next(6)).toBe(8);
        expect(f.next(7)).toBe(8);
        expect(f.next(8)).toBe(10);
        expect(f.next(9)).toBe(10);
    });

    it('parses every offset', () =>
    {
        const f = frequencyParse({ every: 2, offset: 1 });

        expect(f.matches(1)).toBeTruthy();
        expect(f.matches(2)).toBeFalsy();
        expect(f.matches(3)).toBeTruthy();
        expect(f.matches(4)).toBeFalsy();
        expect(f.matches(5)).toBeTruthy();
    });

    it('parses every offset string', () =>
    {
        const f = frequencyParse('1/3');

        expect(f.matches(1)).toBeTruthy();
        expect(f.matches(2)).toBeFalsy();
        expect(f.matches(3)).toBeFalsy();
        expect(f.matches(4)).toBeTruthy();
        expect(f.matches(5)).toBeFalsy();
        expect(f.matches(6)).toBeFalsy();
        expect(f.matches(7)).toBeTruthy();
    });

    it('every offset next', () =>
    {
        const f = frequencyParse({ every: 2, offset: 1 });

        expect(f.next(2)).toBe(3);
        expect(f.next(3)).toBe(5);
        expect(f.next(4)).toBe(5);
        expect(f.next(5)).toBe(7);
        expect(f.next(6)).toBe(7);
        expect(f.next(7)).toBe(9);
        expect(f.next(8)).toBe(9);
        expect(f.next(9)).toBe(11);
    });

});