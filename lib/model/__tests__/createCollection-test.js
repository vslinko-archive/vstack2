/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.autoMockOff();

describe('createModel', function() {
    var s = require("../schema");
    var createModel = require("../createModel");
    var createCollection = require("../createCollection");
    var UserSchema, User, UserCollection, userObject, collection;

    beforeEach(function() {
        UserSchema = s.struct({
            id: s.maybe(s.Num),
            nil: s.Nil,
            str: s.Str,
            num: s.Num,
            bool: s.Bool,
            arr: s.Arr,
            func: s.Func,
            err: s.Err,
            re: s.Re,
            dat: s.Dat,
            any: s.Any
        });

        User = createModel(UserSchema, function User(proto) {
            proto.getDefaultProps = function() {
                return {
                    any: 'default any'
                };
            };
        });

        UserCollection = createCollection(User, function UserCollection() {

        });

        userObject = {
            id: 1,
            nil: null,
            str: '',
            num: 0,
            bool: false,
            arr: [],
            func: function() {},
            err: new Error(),
            re: /./,
            dat: new Date(),
            any: {}
        };

        collection = UserCollection([userObject]);
    });

    it('should have displayName', function() {
        expect(UserCollection.displayName).toEqual('UserCollection');
    });

    it('should clone object', function() {
        expect(collection.length).toEqual(1);

        var newCollection = collection.push(userObject);

        expect(collection.length).toEqual(1);
        expect(newCollection.length).toEqual(2);

        var newNewCollection = newCollection.update({0: {id: {$set: 2}}});

        expect(collection[0].id).toEqual(1);
        expect(newCollection[0].id).toEqual(1);
        expect(newNewCollection[0].id).toEqual(2);
    });

    it('should return json', function() {
        expect(collection.toJSON()).toEqual([userObject]);
    });

    it('should validate', function() {
        expect(collection.isValid()).toBeTruthy();
        collection = collection.update({0: {num: {$set: 'a'}}});
        expect(collection.isValid()).toBeFalsy();
        expect(collection.getInvalidProperties()).toEqual([
            '0.num'
        ]);
    });
});
