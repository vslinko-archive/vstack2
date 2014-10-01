/**
 * vstack by @vslinko
 */

function parent(SuperConstructor, newContext) {
    var superContext = SuperConstructor.bind(newContext);

    for (var key in SuperConstructor.prototype) {
        if (SuperConstructor.prototype.hasOwnProperty(key)) {
            superContext[key] = SuperConstructor.prototype[key].bind(newContext);
        }
    }

    return superContext;
}

module.exports = parent;
