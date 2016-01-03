/**
 * vstack by @vslinko
 */

var createClass = require("../oop/createClass");
var mergeInto = require("../util/mergeInto");
var update = require("../util/update");
var s = require("./schema");
var validate = require("tcomb-validation").validate;

var BaseModel = createClass(function BaseModel(proto) {
    proto.init = function(props) {
        this._idProperty = 'id';
        this._props = props;

        mergeInto(this, this.getDefaultProps());
        mergeInto(this, props);

        var validationResult = this.constructor.validate(props);
        this._isValid = validationResult.isValid;
        this._invalidProperties = validationResult.invalidProperties;
    };

    proto.getDefaultProps = function() {
        return {};
    };

    proto.isNew = function() {
        return s.Nil.is(this.getId());
    };

    proto.setIdProperty = function(idProperty) {
        this._idProperty = idProperty;
        return this;
    };

    proto.getIdProperty = function() {
        return this._idProperty;
    };

    proto.getId = function() {
        return this[this._idProperty];
    };

    proto.setId = function(id) {
        return this.set(this._idProperty, id);
    };

    proto.update = function(spec) {
        return new this.constructor(update(this._props, spec));
    };

    proto.set = function(key, value) {
        var props = mergeInto({}, this._props);
        props[key] = value;
        return new this.constructor(props);
    };

    proto.toJSON = function() {
        return mergeInto({}, this._props);
    };

    proto.isValid = function() {
        return this._isValid;
    };

    proto.getInvalidProperties = function() {
        return this._invalidProperties;
    };
});

function createModel(Schema, definition) {
    var Model = createClass(BaseModel, definition || {});

    Model.Schema = Schema;

    Model.validate = function(props) {
        var invalidProperties = [];
        var validationResult = validate(props, Schema);

        if (validationResult.errors) {
            invalidProperties = validationResult.errors.map(function(err) {
                return err.path.join('.');
            });
        }

        return {
            isValid: validationResult.isValid(),
            invalidProperties: invalidProperties
        };
    };

    return Model;
}

module.exports = createModel;
