/**
 * Created on 07.10.2015.
 */
define(['./Observable', './Computed'], function () {
    function ComputedDomainCore(p) {
        var f = function(){},
        uid = 0;

        this.buildInterface = function (outer) {
            outer['makeObservable'] = function (value) {
                var constructor = p.ctx.create('observableConstructor', ++uid);
                return constructor.getObservable(value);
            };

            outer['makeComputed'] = function (f) {

            };
        };


        this.forObservable ={
            enter: {
                getValue: f,
                setValue: f
            },
            exit: {
                getValue: f,
                setValue: f
            }
        };

        this.forComputed ={
            enter: {
                getValue: f,
                setValue: f
            },
            exit: {
                getValue: f,
                setValue: f
            }
        };
    }

    return {
        name: 'computedDomainCore',
        c: ComputedDomainCore,
        subTypes: arguments,
        getScope: true
    }
});
