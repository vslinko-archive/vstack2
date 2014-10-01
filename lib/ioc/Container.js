/**
 * vstack by @vslinko
 */

var implement = require("../oop/implement");
var idempotent = require("../oop/idempotent");
var DependencyGraph = require("./DependencyGraph");
var invariant = require("../util/invariant");

function Container(props) {
    return idempotent(Container, props, function() {
        this._graph = DependencyGraph();
        this._tags = {};
        this._factories = {};
        this._values = {};
        this._compilers = [];
    }, this);
}

implement(Container, {
    set: function(name, dependencies, tags, value) {
        invariant(
            !(name in this._values || name in this._factories),
            'Service "%s" already defined',
            name
        );

        if (!value) {
            value = tags;
            tags = [];
        }

        if (!value) {
            value = dependencies;
            dependencies = [];
        }

        dependencies.forEach(function(dependency) {
            this._graph.addPath(name, dependency);
        }, this);

        tags.forEach(function(tag) {
            if (!this._tags[tag]) {
                this._tags[tag] = [];
            }

            this._tags[tag].push(name);
        }, this);

        if (typeof value === 'function') {
            this._factories[name] = {
                dependencies: dependencies,
                factory: value
            };
        } else {
            this._values[name] = value;
        }
    },

    get: function(keys) {
        if (Array.isArray(keys)) {
            return Promise.all(keys.map(this._getter, this));
        } else {
            return this._getter(keys);
        }
    },

    search: function(tag) {
        if (this._tags[tag]) {
            return this.get(this._tags[tag]);
        } else {
            return Promise.resolve([]);
        }
    },

    plugin: function(plugin) {
        plugin(this);
    },

    compile: function(compiler) {
        this._compilers.push(compiler);
    },

    build: function() {
        return Promise.all(this._compilers.map(function(compiler) {
            return compiler();
        }));
    },

    _getter: function(key) {
        if (key in this._values) {
            return Promise.resolve(this._values[key]);
        }

        invariant(key in this._factories, 'Unknown service "%s"', key);

        return this._eval(this._factories[key].dependencies, this._factories[key].factory)
            .then(function(value) {
                this._values[key] = value;
                return this._values[key];
            }.bind(this));
    },

    _eval: function(dependencies, factory) {
        return Promise.all(dependencies.map(this._getter, this))
            .then(function(args) {
                return factory.apply(null, args);
            });
    }
});

module.exports = Container;
