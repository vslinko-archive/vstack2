/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.autoMockOff();

describe('es6-promise', function() {
    it('should define Promise', function() {
        expect(window.Promise).toBeUndefined();
        require("../es6-promise");
        expect(window.Promise).toBeDefined();
    });
});
