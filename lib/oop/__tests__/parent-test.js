/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.autoMockOff();

describe('parent', function() {
    var parent = require("../parent");

    it('should create super constructor attached to child context', function() {
        function BaseClass(props) {
            this._name = props.name || 'Vyacheslav';
        }

        function ChildClass(props) {
            parent(BaseClass, this)(props);
            this._surname = props.surname || 'Slinko';
        }

        var c = new ChildClass({name: 'Slava'});

        expect(c).toEqual({
            _name: 'Slava',
            _surname: 'Slinko'
        });
    });
});
