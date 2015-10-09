/**
 * Created on 09.10.2015.
 */
define(['c/Observable'], function () {
    function f() {
    };

    function ObservableComputedDomainCore(ctx) {
        var self = this;
        this.log = '';

        function makeLogger(key) {
            return function () {
                console.log(key);
                self.log += key;
            }
        }

        this.forObservable = {
            enter: {
                getValue: makeLogger('+g'),
                setValue: makeLogger('+s')
            },
            exit: {
                getValue: makeLogger('-g'),
                setValue: makeLogger('-s')
            }
        };

        this.makeObservable = function (value) {
            var constructor = ctx.get('observableConstructor');
            return constructor.getObservable(value);
        };
    }

    return {
        name: 'computedDomainCore',
        c: ObservableComputedDomainCore,
        subTypes: arguments,
        getScope: true
    }
});
