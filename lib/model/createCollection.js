/**
 * vstack by @vslinko
 */

var createClass = require("../oop/createClass");
var invariant = require("../util/invariant");
var mergeInto = require("../util/mergeInto");
var update = require("../util/update");
var s = require("./schema");
var validate = require("tcomb-validation").validate;

var BaseCollection = createClass(function BaseCollection(proto) {
    proto.init = function(items) {
        this._items = items;
        this.length = items.length;

        this._isValid = true;
        this._invalidProperties = [];

        for (var i = 0; i < items.length; i++) {
            this[i] = this.constructor.Model(items[i]);

            if (!this[i].isValid()) {
                this._isValid = false;

                this._invalidProperties = this._invalidProperties.concat(this[i].getInvalidProperties().map(function(path) {
                    return [i, path].join('.');
                }));
            }
        }
    };

    proto.toJSON = function() {
        return this._items.concat();
    };

    proto.push = function(item) {
        return new this.constructor(this._items.concat([item]));
    };

    proto.update = function(spec) {
        return new this.constructor(update(this._items, spec));
    };

    proto.isValid = function() {
        return this._isValid;
    };

    proto.getInvalidProperties = function() {
        return this._invalidProperties;
    };
});

function createCollection(Model, definition) {
    var Collection = createClass(BaseCollection, definition || {});

    Collection.Model = Model;
    Collection.Schema = s.list(Model.Schema);

    return Collection;
}

module.exports = createCollection;
