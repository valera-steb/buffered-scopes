/**
 * Created on 17.09.2015.
 */

require.config({
    paths: {
        'c': '../../utils/computed'
    },
    map: {
        '*': {'when': '../../bower_components/when/when'}
    },
    deps: ['../../utils/require_for_di-lite'],

    callback: function () {
        var specs = [
            'domain',
            'domainProto',
            'computed',
            'observable',
            'pubSub'
        ];

        (function getSpec(id) {
            if (id == specs.length) {
                window.onload();
                return;
            }

            require(['specs/' + specs[id]], function () {
                getSpec(id + 1);
            });
        })(0);
    }
});
