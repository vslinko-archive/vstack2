/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.autoMockOff();

describe('schema', function() {
    var schema = require("../schema");

    it('should match native types', function() {
        var positiveTests = [
            [schema.Nothing, null],
            [schema.Nothing, void 0],
            [schema.String, ''],
            [schema.Number, 1],
            [schema.Number, -1],
            [schema.Boolean, true],
            [schema.Boolean, false],
            [schema.Array, []],
            [schema.Object, {}],
            [schema.Function, function() {}],
            [schema.Error, new Error()],
            [schema.RegExp, /./],
            [schema.Date, new Date()],
            [schema.Any, null]
        ];

        var negativeTests = [
            [schema.Nothing, 1],
            [schema.Nothing, ''],
            [schema.Nothing, false],
            [schema.String, 1],
            [schema.Number, ''],
            [schema.Boolean, null],
            [schema.Array, {}],
            [schema.Object, []],
            [schema.Function, void 0],
            [schema.Error, /./],
            [schema.RegExp, new Error()],
            [schema.Date, '']
        ];

        positiveTests.forEach(function(test) {
            expect(test[0].match(test[1])).toBeTruthy();
        });

        negativeTests.forEach(function(test) {
            expect(test[0].match(test[1])).toBeFalsy();
        });
    });

    it('should create schema constructor', function() {
        expect(schema.Number.match(1)).toBeTruthy();

        var Password = schema.subtype(schema.String, function(password) {
            return /\d/.test(password);
        });

        var User = schema.structure({
            id: schema.optional(schema.Number),
            username: schema.String,
            password: Password,
            coords: schema.tuple([schema.Number, schema.Number]),
            type: schema.enumeration({
                Admin: 'Admin',
                User: 'User'
            }),
            meta: schema.dictionary(schema.Any)
        });

        var Users = schema.list(User);

        expect(function() {
            Users([{
                id: 1,
                username: 'admin',
                password: 'password1',
                coords: [1, 2],
                type: 'Admin',
                meta: {
                    prop: 1
                }
            }]);
        }).not.toThrow();

        expect(function() {
            Users([{}]);
        }).toThrow();
    });
});
