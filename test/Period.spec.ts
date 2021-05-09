import { DEFAULT_OPTIONS, Period, Periods } from '../src';


describe('Period', () =>
{

    const D = (y: number, m: number = 0, d: number = 1, h: number = 0, min: number = 0, sec: number = 0, mil: number = 0): Date => new Date(y, m, d, h, min, sec, mil);

    const get = (period: Period, date: Date): number => Periods[period].get(date, DEFAULT_OPTIONS);

    const next = (period: Period, date: Date, current: number): Date => (Periods[period].next(date, current, DEFAULT_OPTIONS), date);

    const expectDate = (date: Date, y: number, m: number = 0, d: number = 1, h: number = 0, min: number = 0, sec: number = 0, mil: number = 0) => {
        expect(date.toLocaleString()).toBe(D(y, m, d, h, min, sec, mil).toLocaleString())
    };

    it('century', () =>
    {
        // get
        expect( get( 'century', D(2000, 11, 31, 23, 59, 59, 999) ) ).toBe(20);
        expect( get( 'century', D(2001) ) ).toBe(21);
        expect( get( 'century', D(2100) ) ).toBe(21);
        expect( get( 'century', D(2100, 11, 31, 23, 59, 59, 999) ) ).toBe(21);
        expect( get( 'century', D(2101) ) ).toBe(22);

        // next
        expectDate( next('century', D(2000), 20 ), 1901 );
        expectDate( next('century', D(2000), 21 ), 2001 );
        expectDate( next('century', D(2000), 22 ), 2101 );
    });

    it('decade', () =>
    {
        // get
        expect( get( 'decade', D(2000) ) ).toBe(200);
        expect( get( 'decade', D(2001) ) ).toBe(200);
        expect( get( 'decade', D(2009, 11, 31, 23, 59, 59, 999) ) ).toBe(200);
        expect( get( 'decade', D(2010) ) ).toBe(201);

        // next
        expectDate( next('decade', D(2000), 200 ), 2000 );
        expectDate( next('decade', D(2000), 201 ), 2010 );
        expectDate( next('decade', D(2000), 202 ), 2020 );
    });

    it('year', () =>
    {
        // get
        expect( get( 'year', D(2000) ) ).toBe(2000);
        expect( get( 'year', D(2001) ) ).toBe(2001);
        expect( get( 'year', D(2009, 11, 31, 23, 59, 59, 999) ) ).toBe(2009);
        expect( get( 'year', D(2010) ) ).toBe(2010);

        // next
        expectDate( next('year', D(2000), 2000 ), 2000 );
        expectDate( next('year', D(2000), 2010 ), 2010 );
        expectDate( next('year', D(2000), 2020 ), 2020 );
    });

    it('quarter', () =>
    {
        // get
        expect( get( 'quarter', D(2000, 0) ) ).toBe(0);
        expect( get( 'quarter', D(2000, 1) ) ).toBe(0);
        expect( get( 'quarter', D(2000, 2) ) ).toBe(0);
        expect( get( 'quarter', D(2000, 3) ) ).toBe(1);
        expect( get( 'quarter', D(2000, 4) ) ).toBe(1);
        expect( get( 'quarter', D(2000, 5) ) ).toBe(1);
        expect( get( 'quarter', D(2000, 6) ) ).toBe(2);
        expect( get( 'quarter', D(2000, 7) ) ).toBe(2);
        expect( get( 'quarter', D(2000, 8) ) ).toBe(2);
        expect( get( 'quarter', D(2000, 9) ) ).toBe(3);
        expect( get( 'quarter', D(2000, 10) ) ).toBe(3);
        expect( get( 'quarter', D(2000, 11) ) ).toBe(3);
        expect( get( 'quarter', D(2000, 11, 31, 23, 59, 59, 999) ) ).toBe(3);
        expect( get( 'quarter', D(2001, 0) ) ).toBe(0);

        // next
        expectDate( next('quarter', D(1999, 11, 31, 23, 59, 59, 999), 0 ), 2000, 0 );
        expectDate( next('quarter', D(2000, 0), 0 ), 2001, 0 );
        expectDate( next('quarter', D(2000, 1), 0 ), 2001, 0 );
        expectDate( next('quarter', D(2000, 2), 0 ), 2001, 0 );
        expectDate( next('quarter', D(2000, 0), 1 ), 2000, 3 );
        expectDate( next('quarter', D(2000, 0), 2 ), 2000, 6 );
        expectDate( next('quarter', D(2000, 0), 3 ), 2000, 9 );
    });

    it('month', () =>
    {
        // get
        expect( get( 'month', D(2000, 0) ) ).toBe(0);
        expect( get( 'month', D(2000, 1) ) ).toBe(1);
        expect( get( 'month', D(2000, 2) ) ).toBe(2);
        expect( get( 'month', D(2000, 3) ) ).toBe(3);
        expect( get( 'month', D(2000, 4) ) ).toBe(4);
        expect( get( 'month', D(2000, 5) ) ).toBe(5);
        expect( get( 'month', D(2000, 6) ) ).toBe(6);
        expect( get( 'month', D(2000, 7) ) ).toBe(7);
        expect( get( 'month', D(2000, 8) ) ).toBe(8);
        expect( get( 'month', D(2000, 9) ) ).toBe(9);
        expect( get( 'month', D(2000, 10) ) ).toBe(10);
        expect( get( 'month', D(2000, 11) ) ).toBe(11);

        // next
        expectDate( next('month', D(1999, 11, 31, 23, 59, 59, 999), 0 ), 2000, 0 );
        expectDate( next('month', D(2000, 0), 0 ), 2001, 0 );
        expectDate( next('month', D(2000, 0), 1 ), 2000, 1 );
        expectDate( next('month', D(2000, 0), 2 ), 2000, 2 );
        expectDate( next('month', D(2000, 2), 2 ), 2001, 2 );
    });

    it('weekOfYear', () =>
    {
        // get
        expect( get( 'weekOfYear', D(2016, 0, 1) ) ).toBe(0);
        expect( get( 'weekOfYear', D(2016, 0, 2) ) ).toBe(0);
        expect( get( 'weekOfYear', D(2016, 0, 3) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2016, 0, 9) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2016, 0, 10) ) ).toBe(2);

        expect( get( 'weekOfYear', D(2017, 0, 1) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2017, 0, 7) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2017, 0, 8) ) ).toBe(2);
        expect( get( 'weekOfYear', D(2017, 0, 14) ) ).toBe(2);
        expect( get( 'weekOfYear', D(2017, 0, 15) ) ).toBe(3);

        expect( get( 'weekOfYear', D(2019, 0, 1) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2019, 0, 5) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2019, 0, 6) ) ).toBe(2);
        expect( get( 'weekOfYear', D(2019, 0, 12) ) ).toBe(2);
        expect( get( 'weekOfYear', D(2019, 0, 13) ) ).toBe(3);

        expect( get( 'weekOfYear', D(2020, 0, 1) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2020, 0, 2) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2020, 0, 3) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2020, 0, 4) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2020, 0, 5) ) ).toBe(2);
        expect( get( 'weekOfYear', D(2020, 0, 11) ) ).toBe(2);
        expect( get( 'weekOfYear', D(2020, 0, 12) ) ).toBe(3);

        expect( get( 'weekOfYear', D(2021, 0, 1) ) ).toBe(0);
        expect( get( 'weekOfYear', D(2021, 0, 2) ) ).toBe(0);
        expect( get( 'weekOfYear', D(2021, 0, 3) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2021, 0, 9) ) ).toBe(1);
        expect( get( 'weekOfYear', D(2021, 0, 10) ) ).toBe(2);

        // next
        expectDate( next( 'weekOfYear', D(2021, 0, 1), 1 ), 2021, 0, 3 );
    });

    it('weekOfYearFull', () =>
    {
        // get
        expect( get( 'weekOfYearFull', D(2016, 0, 1) ) ).toBe(0);
        expect( get( 'weekOfYearFull', D(2016, 0, 2) ) ).toBe(0);
        expect( get( 'weekOfYearFull', D(2016, 0, 3) ) ).toBe(1);
        expect( get( 'weekOfYearFull', D(2016, 0, 9) ) ).toBe(1);
        expect( get( 'weekOfYearFull', D(2016, 0, 10) ) ).toBe(2);

        expect( get( 'weekOfYearFull', D(2017, 0, 1) ) ).toBe(1);
        expect( get( 'weekOfYearFull', D(2017, 0, 7) ) ).toBe(1);
        expect( get( 'weekOfYearFull', D(2017, 0, 8) ) ).toBe(2);
        expect( get( 'weekOfYearFull', D(2017, 0, 14) ) ).toBe(2);
        expect( get( 'weekOfYearFull', D(2017, 0, 15) ) ).toBe(3);

        expect( get( 'weekOfYearFull', D(2018, 0, 1) ) ).toBe(0);
        expect( get( 'weekOfYearFull', D(2018, 0, 6) ) ).toBe(0);
        expect( get( 'weekOfYearFull', D(2018, 0, 7) ) ).toBe(2);
        expect( get( 'weekOfYearFull', D(2018, 0, 13) ) ).toBe(2);
        expect( get( 'weekOfYearFull', D(2018, 0, 14) ) ).toBe(3);

        expect( get( 'weekOfYearFull', D(2019, 0, 1) ) ).toBe(0);
        expect( get( 'weekOfYearFull', D(2019, 0, 5) ) ).toBe(0);
        expect( get( 'weekOfYearFull', D(2019, 0, 6) ) ).toBe(1);
        expect( get( 'weekOfYearFull', D(2019, 0, 12) ) ).toBe(1);
        expect( get( 'weekOfYearFull', D(2019, 0, 13) ) ).toBe(2);

        expect( get( 'weekOfYearFull', D(2020, 0, 1) ) ).toBe(0);
        expect( get( 'weekOfYearFull', D(2020, 0, 4) ) ).toBe(0);
        expect( get( 'weekOfYearFull', D(2020, 0, 5) ) ).toBe(1);
        expect( get( 'weekOfYearFull', D(2020, 0, 11) ) ).toBe(1);
        expect( get( 'weekOfYearFull', D(2020, 0, 12) ) ).toBe(2);

        expect( get( 'weekOfYearFull', D(2021, 0, 1) ) ).toBe(0);
        expect( get( 'weekOfYearFull', D(2021, 0, 2) ) ).toBe(0);
        expect( get( 'weekOfYearFull', D(2021, 0, 3) ) ).toBe(1);
        expect( get( 'weekOfYearFull', D(2021, 0, 9) ) ).toBe(1);
        expect( get( 'weekOfYearFull', D(2021, 0, 10) ) ).toBe(2);

        // next
        expectDate( next( 'weekOfYearFull', D(2021, 0, 1), 1 ), 2021, 0, 3 );
    });

});




