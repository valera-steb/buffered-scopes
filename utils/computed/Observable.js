/**
 * Created on 29.09.2015.
 */
define(['./PubSub'], function (PubSub) {
    function ObservableConstructor() {
        var self = this, m, core;

        m = {
            value: undefined,

            subs: new PubSub(),

            setValue: function (newValue) {
                core.enter.setValue();

                m.subs.notify(newValue);
                m.value = newValue;

                core.exit.setValue();
            },

            getValue: function () {
                core.enter.getValue();

                return m.value;
            }
        };


        this.dependencies = "computedDomainCore=core";


        this.getObservable = function () {
            core = self.core.forObservable;

            function Observable() {
                if (arguments.length > 0)
                    setValue(arguments[0]);
                else
                    return getValue();
            }

            Observable['subscribe'] = function (handler) {
                return m.subs.subscribe(function (newValue) {
                    handler(newValue, m.value);
                });
            };

            Observable['clear'] = m.subs.clear;
        };
    }

    return {
        'name': 'observableConstructor',
        'c': ObservableConstructor,
        'strategy': di.strategy.proto
    };
});