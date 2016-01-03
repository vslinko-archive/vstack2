/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.autoMockOff();
jest.mock('store');

describe('Storage', function() {
    var Storage = require("../Storage");
    var store = require("store");
    var storage, dateNow;

    beforeEach(function() {
        storage = new Storage({
            namespace: 'test',
            timeout: 100
        });
        dateNow = Date.now;
        Date.now = jest.genMockFn().mockReturnValue(10000);
    });

    afterEach(function() {
        Date.now = dateNow;
    });

    it('should save payload', function() {
        storage.set('a', 'b');

        expect(store.set).toBeCalled();
        expect(store.set.mock.calls[0][0]).toEqual('test:a');
        expect(store.set.mock.calls[0][1].value).toEqual('b');
        expect(store.set.mock.calls[0][1].createdAt).toEqual(10000);
    });

    it('should not return expired values', function() {
        store.get.mockReturnValue({
            value: 'b',
            createdAt: 10000 - 100
        });

        expect(storage.get('a')).toEqual('b');

        store.get.mockReturnValue({
            value: 'b',
            createdAt: 10000 - 101
        });

        expect(storage.get('a')).toBeNull();
    });
});
