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


## [vstack/lib/orm/Model]:

Model instance is immutable object which could contain invalid state
and could be extended.

### Usage

```js
function Model() {
}

implement(Model, {
});

function User() {}

implement(User, Model, {
    getReferences: function() {
        return {
            post: Post
        };
    },

    getSchema: function() {
        return schema.structure({
            username: schema.String,
            posts: schema.list(this._referenceSchema('post'))
        });
    }
});

function Post() {}

implement(Post, Model, {
    getReferences: function() {
        return {
            user: User
        };
    },

    getSchema: function() {
        return schema.structure({
            title: schema.String,
            author: this._referenceSchema('user')
        });
    }
});
```


[vstack/lib/orm/schema]: https://github.com/vslinko/vstack/blob/master/lib/orm/schema.js
[vstack/lib/orm/Model]: https://github.com/vslinko/vstack/blob/master/lib/orm/Model.js
[tcomb]: https://www.npmjs.org/package/tcomb
