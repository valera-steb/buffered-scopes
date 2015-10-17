/**
 * Created by steb on 12.10.15.
 */
define(['require_for_di-lite/privateScopeWrapper', './DomainModel',
    './Observable', './Computed'], function (Wrapper) {
    function IDomain(p) {
        var m = p.ctx.get('domainModel');

        this.buildInterface = function (outer) {
            outer['makeObservable'] = function (value) {
                var constructor = p.ctx.create('observableConstructor', ++m.uid);
                return constructor.getObservable(value);
            };

            outer['makeComputed'] = function (f) {
                var constructor = p.ctx.create('computedConstructor', ++m.uid);
                return constructor.getComputed(f);
            };

            outer['afterActiveChanges'] = m.finalizer.then;
        };


        this.forObservable = {
            enter: {
                getValue: m.tracker.trackGet,
                setValue: m.setLocker.enter
            },
            exit: {
                setValue: function (id) {
                    m.setLocker.exit(id);
                    m.finalizer.complete();
                }
            }
        };

        this.forComputed = {
            enter: {
                build: m.tracker.start,
                getValue: m.tracker.trackGet
            },
            exit: {
                build: m.tracker.end
            },
            finalizeBuild: m.finalizer.complete
        };
    }

    return new Wrapper('ComputedDomain', {
        name: 'IDomain',
        c: IDomain,
        subTypes: arguments,
        getScope: true
    })
});
