# vstack/lib/orm

## [vstack/lib/orm/schema]

This module provides simple API to define schemas for any JavaScript structures.
Based on [tcomb] but with different API.

### Usage

```js
var User = schema.structure({
    id: schema.optional(schema.Number),
    username: schema.String,
    password: schema.String
});

var user = User({
    id: 1,
    username: 'admin',
    password: 'password'
});

expect(schema.Number.match(1)).toBeTruthy();

expect(function() {
    User({username: 1});
}).toThrow();
```

### Pros

* You could define any schema you want using `.struct()`, `.union()`, etc.
* You could check that any variable is matched to schema.
* You could create immutable structures based on schema.

### Cons

* Immutable structure are not extendable.
* Immutable structure could not store invalid state.


[vstack/lib/orm/schema]: https://github.com/vslinko/vstack/blob/master/lib/orm/schema.js
[tcomb]: https://www.npmjs.org/package/tcomb
