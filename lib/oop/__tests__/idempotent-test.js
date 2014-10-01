/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.autoMockOff();

describe('idempotent', function() {
    var idempotent = require("../idempotent");

    it('should create idempotent constructor', function() {
        function User(props) {
            return idempotent(User, props, function(props) {
                this._name = props.name || 'Vyacheslav';
            }, this);
        }

        var user = User({name: 'Slava'});
        expect(user instanceof User).toBeTruthy();
        expect(user._name).toEqual('Slava');
        expect(User(user)).toBe(user);
    });
});
