/**
 * Created on 17.09.2015.
 */

require.config({
    paths: {
        'bs':'../../utils/bufferedScopes',
        'computed': '../../utils/computed'
    },
    map: {
        '*': {'when': '../../bower_components/when/when'}
    },
    deps: ['../../utils/require_for_di-lite'],

    callback: function () {
        var specs = [
            'iDomain'
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
