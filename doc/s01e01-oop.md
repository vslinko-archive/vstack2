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
except(c._name).toEqual('Slava');
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
except(String(c)).toEqual('Slava Slinko');
```

### Solved problems

* Method definitions grouped into one definition object.


[vstack/lib/oop/inherits]: https://github.com/vslinko/vstack/blob/master/lib/oop/inherits.js
[vstack/lib/oop/parent]: https://github.com/vslinko/vstack/blob/master/lib/oop/parent.js
[vstack/lib/oop/implement]: https://github.com/vslinko/vstack/blob/master/lib/oop/implement.js
[inherits]: https://www.npmjs.org/package/inherits
