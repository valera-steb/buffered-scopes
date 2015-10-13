/**
 * Created by steb on 12.10.15.
 */
define(['require_for_di-lite/privateScopeWrapper'], function(Wrapper){
    function IDomain(ctx){
        var m;

        this.buildInterface = function (outer) {
            outer['makeObservable'] = function (value) {
                var constructor = ctx.create('observableConstructor', ++m.uid);
                return constructor.getObservable(value);
            };

            outer['makeComputed'] = function (f) {
                var constructor = ctx.create('computedConstructor', ++m.uid);
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
                build: m.tracker.start(id),
                getValue: m.tracker.trackGet
            },
            exit: {
                build: m.tracker.end(id)
            },
            finalizeBuild: m.finalizer.complete
        };
    }

    return new Wrapper('IDomain', {
        name: 'IDomain',
        c: IDomain,
        subTypes: arguments
    })
});
