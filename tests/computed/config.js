/**
 * Created on 17.09.2015.
 */

require.config({
    paths: {
        'c': '../../utils/computed'
    },
    deps: [],
    callback: function () {
        var specs = [
            'domain',
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
