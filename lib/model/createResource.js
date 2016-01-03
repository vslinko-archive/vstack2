/**
 * vstack by @vslinko
 */

var createClass = require("../oop/createClass");
var Promise = require("../util/Promise");

var BaseResource = createClass(function BaseResource(proto) {
    proto.init = function(props) {
        this._cacheStorage = props.cacheStorage;
    };

    proto.fetchAll = function() {
        var collection = this._cacheStorage.get('collection');

        if (collection) {
            return Promise.resolve(this.constructor.Collection(collection));
        }
    };
});

function createResource(Collection, definition) {
    var Resource = createClass(BaseResource, definition || {});

    Resource.Collection = Collection;
    Resource.Model = Collection.Model;
    Resource.Schema = Collection.Model.Schema;

    return Resource;
}

module.exports = createResource;
