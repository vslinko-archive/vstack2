/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.autoMockOff();

describe('implement', function() {
    var parent = require("../parent");
    var implement = require("../implement");

    it('should create inheritance and define methods', function() {
        function A(a) {
            this._a = a;
        }
        implement(A, {
            toString: function() {
                return this._a;
            }
        });

        function B(a, b) {
            parent(A, this)(a);
            this._b = b;
        }
        implement(B, A, {
            toString: function() {
                return parent(A, this).toString() + this._b;
            }
        });

        function C(a, b, c) {
            parent(B, this)(a, b);
            this._c = c;
        }
        implement(C, B, {
            toString: function() {
                return parent(B, this).toString() + this._c;
            }
        });

        var c = new C('a', 'b', 'c');
        expect(String(c)).toEqual('abc');
    });
});
