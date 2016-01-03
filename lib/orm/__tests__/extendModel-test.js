/**
 * vstack by @vslinko
 */
/* global afterEach beforeEach describe it jest pit xdescribe xit */
/* global expect */

jest.autoMockOff();

describe('Model', function() {
    var schema = require("../schema");
    var extendModel = require("../extendModel");
    var User, Post;

    beforeEach(function() {
        User = extendModel({
            getReferences: function() {
                return {
                    post: Post
                };
            },

            getDefaultProps: function() {
                return {
                    posts: []
                };
            },

            getSchema: function() {
                return schema.structure({
                    username: schema.String,
                    posts: schema.list(this._referenceSchema('post'))
                });
            }
        });

        Post = extendModel({
            getDefaultProps: function() {
                return {
                    title: 'Example'
                };
            },

            getSchema: function() {
                return schema.structure({
                    title: schema.String
                });
            }
        });
    });

    it('should use default props', function() {
        expect(Post().title).toEqual('Example');
    });

    it('should be immutable', function() {
        var post = Post();
        post.title = '';
        expect(post.title).toEqual('Example');
    });

    it('should validate', function() {
        expect(Post().isValid()).toBeTruthy();
        expect(Post({title: ''}).isValid()).toBeTruthy();
        expect(Post({title: 1}).isValid()).toBeFalsy();
        expect(Post({title: 1}).getInvalidProperties()).toEqual(['title']);
        expect(User({posts: 1}).getInvalidProperties()).toEqual(['username', 'posts']);
    });

    it('should update immutable object', function() {
        var userA = User();
        expect(userA.username).toBeUndefined();

        var userB = userA.set('username', 'admin');
        expect(userA.username).toBeUndefined();
        expect(userB.username).toEqual('admin');
        expect(userB.getInvalidProperties()).toEqual([]);

        var userC = userB.update({posts: {$push: [{title: 1}]}});
        expect(userB.posts.length).toEqual(0);
        expect(userC.posts.length).toEqual(1);
        expect(userC.getInvalidProperties()).toEqual(['posts.0.title']);

        var userD = userC.update({posts: {0: {title: {$set: ''}}}});
        expect(userD.getInvalidProperties()).toEqual([]);
    });
});
