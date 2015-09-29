/**
 * Created on 17.09.2015.
 */

require.config({
    paths: {
        'c': '../../utils/computed'
    },
    deps: [
    ],
    callback: function () {
        var specs = [
            'specs/pubSub'
        ];

        (function getSpec(id) {
            if (id == specs.length) {
                setTimeout(function(){
                    window.onload();
                }, 1000);
                return;
            }

            require([specs[id]], function () {
                getSpec(id + 1);
            });
        })(0);
    }
});
