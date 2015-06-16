/*global describe, expect, it, jasmine, require*/
(function () {
    'use strict';

    var futile;

    futile = require('../');

    describe('isArray', function () {
        it('returns true on functions', function () {
            expect(futile.isFunction(function () {
                return false;
            })).toBe(true);
        });
        it('returns false on objects', function () {
            expect(futile.isFunction({})).toBe(false);
        });
        it('returns false on undefined', function () {
            expect(futile.isFunction()).toBe(false);
        });
        it('returns false on null', function () {
            expect(futile.isFunction(null)).toBe(false);
        });
        it('returns false on numbers', function () {
            expect(futile.isFunction(1)).toBe(false);
        });
    });
}());
