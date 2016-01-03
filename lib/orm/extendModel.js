/**
 * vstack by @vslinko
 */

var tcomb = require("tcomb-validation");
var schema = require("./schema");
var implement = require("../oop/implement");
var idempotent = require("../oop/idempotent");
var mergeInto = require("../util/mergeInto");
var update = require("../util/update");

function Model(props) {
    return idempotent(Model, props, function() {
        this._model = this.getDefaultProps();
        mergeInto(this._model, props);
        mergeInto(this, this._model);

        var validationResult = tcomb.validate(this._model, this.getSchema()._nativeType);

        this._isValid = validationResult.isValid();
        this._invalidProperties = [];

        if (!this._isValid) {
            this._invalidProperties = validationResult.errors.map(function(err) {
                return err.path.join('.');
            });
        }

        Object.freeze(this);
    }, this);
}

implement(Model, {
    getDefaultProps: function() {
        return {};
    },

    getReferences: function() {
        return {};
    },

    isValid: function() {
        return this._isValid;
    },

    getInvalidProperties: function() {
        return this._invalidProperties;
    },

    set: function(key, value) {
        var spec = {};
        spec[key] = {$set: value};
        return this.update(spec);
    },

    update: function(spec) {
        return new this.constructor(update(this._model, spec));
    },

    _referenceSchema: function(name) {
        return this.getReferences()[name].prototype.getSchema();
    }
});

function extendModel(BaseModel, definition) {
    if (!definition) {
        definition = BaseModel;
        BaseModel = Model;
    }

    var NewModel = function(props) {
        return idempotent(NewModel, props, function() {
            BaseModel.call(this, props);
        }, this);
    };

    implement(NewModel, BaseModel, definition);

    return NewModel;
}

module.exports = extendModel;
