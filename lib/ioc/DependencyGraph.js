/**
 * vstack by @vslinko
 */

var DepGraph = require("dep-graph");
var implement = require("../oop/implement");
var idempotent = require("../oop/idempotent");
var invariant = require("../util/invariant");

function DependencyGraph(props) {
    return idempotent(DependencyGraph, props, function() {
        this._realDependencyGraph = new DepGraph();
    }, this);
}

implement(DependencyGraph, {
   addPath: function(source, destination) {
        this._realDependencyGraph.add(source, destination);

        try {
            this._realDependencyGraph.descendantsOf(source);
        } catch (e) {
            invariant(!e, 'Circular dependency between "%s" and "%s"', source, destination);
        }
    }
});

module.exports = DependencyGraph;
