/**
 * vstack by @vslinko
 */

var inherits = require("./inherits");

function implement(Constructor, SuperConstructor, definition) {
    if (!definition) {
        definition = SuperConstructor;
        SuperConstructor = null;
    }

    if (SuperConstructor) {
        inherits(Constructor, SuperConstructor);
    }

    for (var key in definition) {
        if (definition.hasOwnProperty(key)) {
            Constructor.prototype[key] = definition[key];
        }
    }
}

module.exports = implement;
