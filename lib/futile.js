// fid-umd {"name":"futile","jslint":1}
/* global module, exports, define, modulejs, YUI */
(function (name, root, factory) {
    "use strict";
    function isObject(x) { return typeof x === "object"; }
    if (isObject(root.module) && isObject(root.module.exports)) {
        root.module.exports = factory();
    } else if (isObject(root.exports)) {
        root.exports[name] = factory();
    } else if (isObject(root.define) && root.define.amd) {
        root.define(name, [], factory);
    } else if (isObject(root.modulejs)) {
        root.modulejs.define(name, factory);
    } else if (isObject(root.YUI)) {
        root.YUI.add(name, function (Y) { Y[name] = factory(); });
    } else {
        root[name] = factory();
    }
}("futile", this, function () {
    "use strict";
    // fid-umd end
    var clone, each, hexByte, isArray, isFunction, isObject, isObjectType, futile;

    /**
     * Perform a deep copy of something.
     *
     * For Arrays this copies the elements, not additional properties.
     *
     * @param {*} thing
     * @return {*} A copy of the thing
     */
    clone = function (thing) {
        var copy;

        function cloneItem(value, index) {
            copy[index] = clone(value);
        }

        if (isArray(thing)) {
            copy = [];
            each(thing, cloneItem);
        } else if (futile.isObject(thing)) {
            copy = {};
            each(thing, cloneItem);
        } else {
            copy = thing;
        }

        return copy;
    };

    /**
     * Iterate across an object or an array.  Uses a native iterator when
     * one is available.
     *
     * When `thing` is undefined, no calls are made to the callback.
     * When `thing` is not an object nor an array, this calls the callback
     * once with `thing` and an undefined index value.
     * When `thing` is an array, the callback is called once for each item
     * in the array and for any additional properties set on the Array.
     *
     * @param {*} thing
     * @param {Function} callback
     * @param {Object} [context=null]
     */
    each = function (thing, callback, context) {
        var key, length;

        context = context || null;

        if (! isFunction(callback)) {
            throw new TypeError('Callback must be a function');
        }

        // Do not call anything if thing is undefined
        if (thing !== undefined) {
            if (typeof thing !== 'object' || thing === null) {
                // Call the callback once for non-objects and nulls
                // typeof null === 'object', so be careful here
                callback.call(null, thing);
            } else if (isFunction(thing.forEach)) {
                // Use a native implementation if possible
                thing.forEach(callback);
            } else if (isArray(thing)) {
                // Array
                length = thing.length;

                for (key = 0; key < length; key += 1) {
                    callback.call(context, thing[key], key);
                }
            } else {
                // Object
                for (key in thing) {
                    if (thing.hasOwnProperty(key)) {
                        callback.call(context, thing[key], key);
                    }
                }
            }
        }
    };

    /**
     * Writes one byte as hex
     *
     * @param {number} inByte Only lower 8 bits are used
     * @return {String} Two hex characters, uppercase
     */
    hexByte = function (inByte) {
        function hexChar(c) {
            return (c & 0x0F).toString(16).toUpperCase();
        }

        return hexChar(inByte >> 4) + hexChar(inByte);
    };

    /**
     * Determine if this is an array
     *
     * @param {*} thing
     * @return {boolean} True if this is an array
     */
    isArray = Array.isArray || function (thing) {
        return isObjectType('Array', thing);
    };

    /**
     * Determine if something is a function or a generator function
     *
     * Adapted from https://github.com/ljharb/is-callable
     *
     * @param {*} thing
     * @return {boolean} True if this is a function
     */
    isFunction = function (thing) {
        if (typeof thing !== "function") {
            return false;
        }

        /*global Symbol*/
        if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
            try {
                Function.prototype.toString.call(thing);
                return true;
            } finally {
                return false;
            }
        }

        return isObjectType('Function', thing) || isObjectType('GeneratorFunction', thing);
    };

    /**
     * Determine if something is an object.
     * NOTE:  This excludes null and Arrays!
     *
     * @param {*} thing
     * @return {boolean} True if this is an object
     */
    isObject = function (thing) {
        // Testing that thing is truthy eliminates null
        return typeof thing === "object" && thing && !isArray(thing);
    };

    /**
     * Determine if the "Object.prototype.toString.call(target)" matches the
     * expected type.
     *
     * @param {string} expected
     * @param {*} thing
     * @return {boolean} True if it matches
     */
    isObjectType = function (expected, thing) {
        return Object.prototype.toString.call(thing) === '[object ' + expected + ']';
    };

    // Define our export
    futile = {
        clone: clone,
        each: each,
        hexByte: hexByte,
        isArray: isArray,
        isFunction: isFunction,
        isObject: isObject,
        isObjectType: isObjectType
    };

    return futile;
    // fid-umd post
}));
// fid-umd post-end
