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


[vstack/lib/oop/inherits]: https://github.com/vslinko/vstack/blob/master/lib/oop/inherits.js
[inherits]: https://www.npmjs.org/package/inherits
