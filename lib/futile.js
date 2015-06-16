// fid-umd {"name":"futile","jslint":1}
/* global module, exports, define, modulejs, YUI */
(function (name, root, factory) {
    "use strict";
    function isObject(x) { return typeof x === "object"; }
    if ((typeof module)[0] === "o" && isObject(module.exports)) {
        module.exports = factory();
    } else if ((typeof exports)[0] === "o") {
        exports[name] = factory();
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
    var futile, functionToString, objectToString;

    // Reference data and things that can be minimized
    functionToString = Function.prototype.toString;
    objectToString = Object.prototype.toString;

    // Define our export
    futile = {};

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
    futile.each = function (thing, callback, context) {
        var key, length;

        context = context || null;

        if (! futile.isFunction(callback)) {
            throw new TypeError('Callback must be a function');
        }

        // Do not call anything if thing is undefined
        if (thing === undefined) {
            return;
        }

        // Call the callback once for non-objects and nulls
        // typeof null === 'object', so be careful here
        if (typeof thing !== 'object' || thing === null) {
            return callback.call(null, thing);
        }

        // Use a native implementation if possible
        if (futile.isFunction(thing.forEach)) {
            return thing.forEach(callback);
        }

        if (futile.isArray(thing)) {
            length = thing.length;

            for (key = 0; key < length; key += 1) {
                callback.call(context, thing[key], key);
            }
        } else {
            for (key in thing) {
                if (thing.hasOwnProperty(key)) {
                    callback.call(context, thing[key], key);
                }
            }
        }
    };

    /**
     * Determine if this is an array
     *
     * @param {*} thing
     * @return {boolean} True if this is an array
     */
    futile.isArray = Array.isArray || function (thing) {
        return objectToString.call(thing) === '[object Array]';
    };

    /**
     * Determine if something is a function or a generator function
     *
     * Adapted from https://github.com/ljharb/is-callable
     *
     * @param {*} thing
     * @return {boolean} True if this is a function
     */
    futile.isFunction = function (thing) {
        var str;

        if (typeof thing !== "function") {
            return false;
        }

        /*global Symbol*/
        if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
            try {
                functionToString.call(thing);
                return true;
            } finally {
                return false;
            }
        }

        str = objectToString.call(thing);

        return str === '[object Function]' || str === '[object GeneratorFunction]';
    };

    /**
     * Determine if something is an object.
     * NOTE:  This excludes null and Arrays!
     *
     * @param {*} thing
     * @return {boolean} True if this is an object
     */
    futile.isObject = function (thing) {
        return typeof thing === "object" && thing !== null && !futile.isArray(thing);
    };

    return futile;
    // fid-umd post
}));
// fid-umd post-end
