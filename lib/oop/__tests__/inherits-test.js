/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.dontMock('../inherits');

describe('inherits', function() {
    var _inherits = require("inherits");
    var inherits = require("../inherits");

    _inherits.mockImpl(function(ctor, superCtor) {
        ctor.super_ = superCtor;
    });

    it('should not define super_ property in constructor', function() {
        function A() {}
        function B() {}

        inherits(B, A);

        expect(_inherits).toBeCalledWith(B, A);
        expect(B.super_).not.toBeDefined();
    });
});
