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


## [vstack/lib/ioc/Container]

Implementation of "Inversion of Control" container. Service factories could
return promises.

### Usage

```js
var c = Container();

c.plugin(function(c) {
    c.set('collection', function() {
        var collection = [];

        return {
            add: function(item) {
                collection.push(item);
            },

            toArray: function() {
                return collection;
            }
        }
    });

    c.compile(function() {
        return Promise.all([c.get('collection'), c.search('item')])
            .then(function(values) {
                var collection = values[0];
                var items = values[1];

                items.forEach(function(item) {
                    collection.add(item);
                });
            });
    });
});

c.plugin(function(c) {
    c.set('a', [], ['item'], 1);
    c.set('b', [], ['item'], 2);
    c.set('c', [], ['not-item'], 3);
});

c.build()
    .then(function() {
        return c.get('collection');
    })
    .then(function(collection) {
        expect(collection.toArray()).toEqual([1, 2]);
    });
```


[vstack/lib/ioc/DependencyGraph]: https://github.com/vslinko/vstack/blob/master/lib/ioc/DependencyGraph.js
[vstack/lib/ioc/Container]: https://github.com/vslinko/vstack/blob/master/lib/ioc/Container.js
[dep-graph]: http://npmjs.org/package/dep-graph
