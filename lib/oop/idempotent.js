/**
 * vstack by @vslinko
 */

function idempotent(Constructor, props, callback, context) {
    if (props instanceof Constructor) {
        return props;
    }

    if (!(context instanceof Constructor)) {
        return new Constructor(props);
    }

    callback.call(context, props);
}

module.exports = idempotent;
