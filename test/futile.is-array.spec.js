/*global describe, expect, it, jasmine, require*/
(function () {
    'use strict';

    var futile;

    futile = require('../');

    describe('isArray', function () {
        it('returns true on arrays', function () {
            expect(futile.isArray([])).toBe(true);
        });
        it('returns false on objects', function () {
            expect(futile.isArray({})).toBe(false);
        });
        it('returns false on undefined', function () {
            expect(futile.isArray()).toBe(false);
        });
        it('returns false on null', function () {
            expect(futile.isArray(null)).toBe(false);
        });
        it('returns false on numbers', function () {
            expect(futile.isArray(1)).toBe(false);
        });
    });
}());
