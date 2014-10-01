/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.autoMockOff();

describe('DependencyGraph', function() {
    var DependencyGraph = require("../DependencyGraph");

    it('should throw error on circular dependency', function() {
        var graph = DependencyGraph();

        graph.addPath('a', 'b');
        graph.addPath('b', 'c');

        expect(function() {
            graph.addPath('c', 'a');
        }).toThrow('Invariant Violation: Circular dependency between "c" and "a"');
    });
});
