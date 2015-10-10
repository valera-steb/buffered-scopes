/**
 * Created on 29.09.2015.
 */
define(['./PubSub'], function (PubSub) {
    function ObservableConstructor(uid) {
        var self = this, m, core;

        m = {
            value: undefined,

            subs: new PubSub(),
            subsAfter: new PubSub(),

            setValue: function (newValue) {
                var oldValue = m.value;

                m.subs['notify'](newValue);
                m.value = newValue;


                m.subsAfter['notify'](oldValue);
            }
        };


        this.dependencies = "core=computedDomainCore";


        this.getObservable = function (value) {
            core = self.core.forObservable;
            m.value = value;

            function Observable() {
                if (arguments.length == 0) {
                    core.enter.getValue(uid, Observable['subscribeAfter']);
                    return m.value;
                }

                core.enter.setValue(uid);
                m.setValue(arguments[0]);
                core.exit.setValue(uid);
            }

            Observable['subscribe'] = function (handler) {
                return m.subs['subscribe'](function (newValue) {
                    handler(newValue, m.value);
                });
            };
            Observable['subscribeAfter'] = function (handler) {
                return m.subsAfter['subscribe'](function (oldValue) {
                    handler(m.value, oldValue);
                });
            };

            Observable['clear'] = function () {
                m.subs.clear();
                m.subsAfter.clean();
            };

            return Observable;
        };
    }

    return {
        'name': 'observableConstructor',
        'c': ObservableConstructor,
        'strategy': di.strategy.proto
    };
});