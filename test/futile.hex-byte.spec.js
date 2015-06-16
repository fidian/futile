/*global describe, expect, it, jasmine, require*/
(function () {
    'use strict';

    var futile;

    futile = require('../');

    describe('hexbyte', function () {
        it('works on zero', function () {
            expect(futile.hexByte(0)).toBe("00");
        });
        it("works on single-digit numbers", function () {
            expect(futile.hexByte(7)).toBe("07");
        });
        it("works on double digit numbers", function () {
            expect(futile.hexByte(17)).toBe("11");
        });
        it("uppercases hex", function () {
            expect(futile.hexByte(255)).toBe("FF");
        });
    });
}());
