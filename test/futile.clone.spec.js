/*global describe, expect, it, jasmine, require*/
(function () {
    'use strict';

    var futile;

    futile = require('../');

    describe('clone', function () {
        it('copies numbers', function () {
            expect(futile.clone(7)).toBe(7);
        });
        it('copies strings', function () {
            expect(futile.clone('a')).toBe('a');
        });
        it('works with null', function () {
            expect(futile.clone(null)).toBe(null);
        });
        it('works with undefined', function () {
            expect(futile.clone(undefined)).toBe(undefined);
        });
        it('works with objects making a deep copy', function () {
            var clone, original;

            original = {
                'one': 1,
                'nested': {
                    'two': 2
                }
            };
            clone = futile.clone(original);
            expect(clone).not.toBe(original);
            expect(clone.nested).not.toBe(original.nested);
            expect(clone).toEqual(original);
        });
        it('works with arrays making a deep copy', function () {
            var clone, original;

            original = [
                'one',
                [
                    'two'
                ]
            ];
            clone = futile.clone(original);
            expect(clone).not.toBe(original);
            expect(clone[1]).not.toBe(original[1]);
            expect(clone).toEqual(original);
        });
    });
}());
