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

    it('parses multiple', () =>
    {
        const f = frequencyParse([3, 5]);

        expect(f.matches(2)).toBeFalsy();
        expect(f.matches(3)).toBeTruthy();
        expect(f.matches(4)).toBeFalsy();
        expect(f.matches(5)).toBeTruthy();
        expect(f.matches(6)).toBeFalsy();
    });

});