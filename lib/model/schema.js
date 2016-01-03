/**
 * vstack by @vslinko
 */

var update = require("../util/update");
var tcomb = require("tcomb");

tcomb.options.update = function(object, spec) {
    return update(object, spec);
};

module.exports = tcomb;
