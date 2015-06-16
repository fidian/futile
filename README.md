futile.js
=========

Welcome to fidian's utilities for ECMAScript.  These are a few extremely useful functions that native JavaScript seems to lack, yet are found over and over in various projects.  Instead of rewriting them every time, why not just include a library that has it all for you?


Function List
-------------

### `each(thing, callback, [context=null])`

Used for iteration across objects and arrays.  Calls `callback` with the given context for each item it comes across.  The callback should have a function signature like this:

    function yourCallback(value, key) { ... }

* When `thing` is an Object, calls `callback` once for each property that isn't inherited from the prototype.
* When `thing` is an Array, calls `callback` once for each item in the array and does not iterate across additional properties.
* When `thing` is a number, string, boolean or `null`, calls `callback` once with `thing` as the value and `undefined` as the key.
* When `thing` is undefined, no calls are made to `callback`.


### `isArray(thing)`

Returns `true` when `thing` is an instance of Array.


### `isFunction(thing)`

Returns `true` when `thing` is an instance of Function or when it is otherwise callable.  This was adapted from [is-callable].


### `isObject(thing)`

Returns `true` when `thing` is an object.  This excludes Arrays and null and really means "it's an object".


Including in Your Project
-------------------------

This is an `npm` package:

    npm install --save futile

It's also able to be loaded directly into a browser, thanks to [fid-umd].  This example loads the minified version.

    <script src="path/to/futile.min.js"></script>


[fid-umd]: https://github.com/fidian/fid-umd
[is-callable]: https://github.com/ljharb/is-callable
