# vstack/lib/ioc

## [vstack/lib/ioc/DependencyGraph]

Utility class to find circular dependencies. Depends on [dep-graph].

### Usage

```js
var graph = DependencyGraph();

graph.addPath('a', 'b');
graph.addPath('b', 'c');

expect(function() {
    graph.addPath('c', 'a');
}).toThrow();
```


[vstack/lib/ioc/DependencyGraph]: https://github.com/vslinko/vstack/blob/master/lib/ioc/DependencyGraph.js
[dep-graph]: http://npmjs.org/package/dep-graph
