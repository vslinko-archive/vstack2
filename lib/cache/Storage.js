/**
 * vstack by @vslinko
 */

var store = require("store");
var createClass = require("../oop/createClass");

var Storage = createClass(function Storage(proto) {
    proto.init = function(props) {
        this._namespace = props.namespace || 'vstack:cache:storage';
        this._timeout = props.timeout || 0;
    };

    proto.set = function(key, value) {
        store.set([this._namespace, key].join(':'), {
            value: value,
            createdAt: Date.now()
        });
    };

    proto.get = function(key, defaultValue) {
        var data = store.get([this._namespace, key].join(':'));

        if (!data) {
            return defaultValue || null;
        }

        if (this._timeout > 0 && Date.now() - data.createdAt > this._timeout) {
            return defaultValue || null;
        }

        return data.value;
    }
});

module.exports = Storage;
