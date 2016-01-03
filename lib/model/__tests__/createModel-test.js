/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.autoMockOff();

describe('createModel', function() {
    var s = require("../schema");
    var createModel = require("../createModel");
    var UserSchema, User, userObject, user;

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

        user = User(userObject);
    });

    it('should have displayName', function() {
        expect(User.displayName).toEqual('User');
    });

    it('should clone object', function() {
        expect(user.num).toEqual(0);

        var newUser = user.update({num: {$set: 1}});

        expect(user.num).toEqual(0);
        expect(newUser.num).toEqual(1);

        var newNewUser = newUser.set('num', 2);

        expect(user.num).toEqual(0);
        expect(newUser.num).toEqual(1);
        expect(newNewUser.num).toEqual(2);
    });

    it('should return json', function() {
        expect(user.toJSON()).toEqual(userObject);
    });

    it('should validate', function() {
        expect(user.isValid()).toBeTruthy();
        user = user.set('num', 'not-num');
        expect(user.isValid()).toBeFalsy();
        expect(user.getInvalidProperties()).toEqual([
            'num'
        ]);
    });

    it('should read id', function() {
        expect(user.getId()).toEqual(1);
        expect(user.toJSON().id).toEqual(1);
        expect(user.isNew()).toBeFalsy();
        user = user.setId(2);
        expect(user.getId()).toEqual(2);
        expect(user.toJSON().id).toEqual(2);
        expect(user.isNew()).toBeFalsy();
        user = user.setId(null);
        expect(user.isNew()).toBeTruthy();
    });

    it('should use defaul props', function() {
        delete userObject.any;
        user = User(userObject);
        expect(user.any).toEqual('default any');
    });
});
