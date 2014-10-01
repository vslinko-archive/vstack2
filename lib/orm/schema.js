/**
 * vstack by @vslinko
 */

var tcomb = require("tcomb");

function wrapType(type) {
    var wrappedType = function(value) {
        return type(value);
    };

    wrappedType._nativeType = type;
    wrappedType.match = type.is;

    return wrappedType;
}

function unwrapType(type) {
    return type._nativeType;
}

function unwrapTypeStructure(structure) {
    return Object.keys(structure).reduce(function(newStructure, key) {
        newStructure[key] = unwrapType(structure[key]);
        return newStructure;
    }, {});
}

function unwrapTypeArray(types) {
    return types.map(unwrapType);
}

var schema = {
    Nothing: wrapType(tcomb.Nil),
    String: wrapType(tcomb.Str),
    Number: wrapType(tcomb.Num),
    Boolean: wrapType(tcomb.Bool),
    Array: wrapType(tcomb.Arr),
    Object: wrapType(tcomb.Obj),
    Function: wrapType(tcomb.Func),
    Error: wrapType(tcomb.Err),
    RegExp: wrapType(tcomb.Re),
    Date: wrapType(tcomb.Dat),
    Any: wrapType(tcomb.Any),

    optional: function(type) {
        return wrapType(tcomb.maybe(unwrapType(type)));
    },

    structure: function(props) {
        return wrapType(tcomb.struct(unwrapTypeStructure(props)));
    },

    list: function(type) {
        return wrapType(tcomb.list(unwrapType(type)));
    },

    tuple: function(types) {
        return wrapType(tcomb.tuple(unwrapTypeArray(types)));
    },

    dictionary: function(type) {
        return wrapType(tcomb.dict(unwrapType(type)));
    },

    subtype: function(type, predicate) {
        return wrapType(tcomb.subtype(unwrapType(type), predicate));
    },

    enumeration: function(map) {
        return wrapType(tcomb.enums(map));
    }

    // Unusable
    // union: function (types) {
    //     return wrapType(tcomb.union(unwrapTypeArray(types)));
    // }
};

module.exports = schema;
