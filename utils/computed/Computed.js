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
                m.value = m.f();
            },

            init: {
                start: function (f) {
                    m.f = f;

                    m.getDependencies();
                    m.subscribe();
                },
                getDependencies: function () {
                    core.enter.calculation(uid);
                    m.calculate();
                    m.dependencies = core.exit.calculation(uid);
                },
                subscribe: function(){
                    for(var i in m.dependencies){
                        m.dependencies[i]['subscribeAfter']
                    }
                }
            }
        };


        this.dependencies = "core=computedDomainCore";


        this.getComputed = function (f) {
            core = self.core.forComputed;
            m.init(f);

            function Computed() {
                core.enter.getValue(uid);

                return m.value;
            }

            Computed['subscribe'] = function (handler) {
                return m.subs['subscribe'](function (newValue) {
                    handler(newValue, m.value);
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
