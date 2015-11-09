/**
 * Created on 28.10.2015.
 */
require.config({
    paths: {
        'bs':'../../utils/bufferedScopes',
        'computed': '../../utils/computed'
    },
    map: {
        '*': {'when': '../../bower_components/when/when'}
    },
    deps: [
        '../../bower_components/browsered-jasmine-cucumber/index.js',
        '../../utils/require_for_di-lite'
    ],

    callback: function () {
        require([
            'browsered-jasmine-cucumber',
            'spec',
            'steps'
        ], function () {
            var runner = window.GroupsRunner(window.fetureGroups, window.stepsGroups);

            for (var i in window.fetureGroups)
                runner(i);
        });
    }
});