/*global beforeEach, describe, expect, it, jasmine, require*/
(function () {
    'use strict';

    var futile;

    futile = require('../');

    describe('each', function () {
        var callback, calls;

        beforeEach(function () {
            calls = [];
            callback = function (value, key) {
                calls.push({
                    key: key,
                    value: value
                });
            };
        });
        it('does not iterate with undefined', function () {
            futile.each(undefined, callback);
            expect(calls).toEqual([]);
        });
        it('iterates once with null', function () {
            futile.each(null, callback);
            expect(calls).toEqual([
                {
                    key: undefined,
                    value: null
                }
            ]);
        });
        it('iterates once with a number', function () {
            futile.each(1, callback);
            expect(calls).toEqual([
                {
                    key: undefined,
                    value: 1
                }
            ]);
        });
        it('iterates once with booleans', function () {
            futile.each(false, callback);
            expect(calls).toEqual([
                {
                    key: undefined,
                    value: false
                }
            ]);
        });
        it('iterates once with strings', function () {
            futile.each('string', callback);
            expect(calls).toEqual([
                {
                    key: undefined,
                    value: "string"
                }
            ]);
        });
        it('iterates over an array skipping extra properties', function () {
            var arr;

            arr = [1, '2', false];
            arr.extraProperty = 'skip me';
            futile.each(arr, callback);
            expect(calls).toEqual([
                {
                    key: 0,
                    value: 1
                },
                {
                    key: 1,
                    value: '2'
                },
                {
                    key: 2,
                    value: false
                }
            ]);
        });
        it('iterates over an object skipping ones from the prototype', function () {
            futile.each({
                one: 1
            }, callback);
            expect(calls).toEqual([
                {
                    key: 'one',
                    value: 1
                }
            ]);
        });
    });
}());
