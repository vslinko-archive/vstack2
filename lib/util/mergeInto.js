/**
 * vstack by @vslinko
 */

var _mergeInto = require("react/lib/mergeInto");

function mergeInto(one, two) {
    _mergeInto(one, two);
    return one;
}

module.exports = mergeInto;
