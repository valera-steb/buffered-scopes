/**
 * Created on 07.10.2015.
 */
define(['./PubSub'], function (PubSub) {
    function ComputedConstructor(uid) {
        var self = this, m, core;


        m = {
            value: undefined,
            f: undefined,

            subs: new PubSub(),
            dependencies: undefined,

            calculate: function () {
                core.enter.calculation(uid);
                var newValue = m.f();
                core.exit.calculation(uid);

                m.setValue(newValue);
            },

            setValue: function(newValue){
                var oldValue = m.value;

                m.subs['notify'](newValue);
                m.value = newValue;

                m.subsAfter['notify'](oldValue);
            },

            init: {
                start: function (f) {
                    m.f = f;

                    m.getDependencies();
                    m.subscribe();
                },
                getDependencies: function () {
                    core.enter.init(uid);
                    m.calculate();

                    m.dependencies = core.exit.init(uid);
                    m.subscribe();
                },
                subscribe: function(){
                    for(var i in m.dependencies){
                        m.dependencies[i]['subscribeAfter'](m.calculate);
                    }
                }
            }
        };


        this.dependencies = "core=computedDomainCore";


        this.getComputed = function (f) {
            core = self.core.forComputed;
            m.init(f);

            function Computed() {
                core.enter.getValue(uid, Computed['subscribeAfter']);

                return m.value;
            }

            Computed['subscribe'] = function (handler) {
                return m.subs['subscribe'](function (newValue) {
                    handler(newValue, m.value);
                });
            };
            Computed['subscribeAfter'] = function (handler) {
                return m.subsAfter['subscribe'](function (oldValue) {
                    handler(m.value, oldValue);
                });
            };

            Computed['clear'] = m.subs.clear;

            Computed['destroy'] = function () {
            };

            return Computed;
        }
    }

    return {
        'name': 'computedConstructor',
        'c': ComputedConstructor,
        'strategy': di.strategy.proto
    };
});
