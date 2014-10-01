# vstack/lib/oop

## [vstack/lib/oop/inherits]

As OOP basis I'm using [inherits] - browser-friendly version of standard Node.js
inheritance function.

### Differences from [inherits]

* My implementation doesn't defines `.super_` property in constructor.

### Pros

* Most natural way to make inheritance in JavaScript.
* Doesn't defines ugly functions like `.extends()` in constructor.

### Cons

* No sugar for access to super constructor and super prototype.


## [vstack/lib/oop/parent]

Copy class constructor and class methods and attach them to different context.

### Usage

```js
function BaseClass(props) {
    this._name = props.name || 'Vyacheslav';
}

function ChildClass(props) {
    parent(BaseClass, this)(props);
    this._surname = props.surname || 'Slinko';
}

var c = new ChildClass({name: 'Slava'});
expect(c._name).toEqual('Slava');
```

## Solved problems

* Added sugar to call super constructor methods.

### Cons

* Speed degradation.


## [vstack/lib/oop/implement]

Group class inheritance and implementation into one helper function call.

### Usage

```js
function BaseClass(props) {
    this._name = props.name || 'Vyacheslav';
}

implement(BaseClass, {
    toString: function() {
        return String(this._name);
    }
});

function ChildClass(props) {
    parent(BaseClass, this)(props);
    this._surname = props.surname || 'Slinko';
}

implement(ChildClass, BaseClass, {
    toString: function() {
        return parent(BaseClass, this).toString() + ' ' + this._surname;
    }
});

var c = new ChildClass({name: 'Slava'});
expect(String(c)).toEqual('Slava Slinko');
```

### Solved problems

* Method definitions grouped into one definition object.


## [vstack/lib/oop/idempotent]

Inspired by [this article] I've created this constructor helper.

### Usage

```js
function User(props) {
    return idempotent(User, props, function(props) {
        this._name = props.name || 'Vyacheslav';
    }, this);
}

var user = User({name: 'Slava'});
expect(user instanceof User).toBeTruthy();
expect(user._name).toEqual('Slava');
expect(User(user)).toBe(user);
```

### Solved problems

* Objects can be created without `new` statement.
* Constructor called with instance of that constructor doesn't create new instance.


[vstack/lib/oop/inherits]: https://github.com/vslinko/vstack/blob/master/lib/oop/inherits.js
[vstack/lib/oop/parent]: https://github.com/vslinko/vstack/blob/master/lib/oop/parent.js
[vstack/lib/oop/implement]: https://github.com/vslinko/vstack/blob/master/lib/oop/implement.js
[vstack/lib/oop/idempotent]: https://github.com/vslinko/vstack/blob/master/lib/oop/idempotent.js
[inherits]: https://www.npmjs.org/package/inherits
[this article]: http://gcanti.github.io/2014/09/25/six-reasons-to-define-constructors-with-only-one-argument.html
