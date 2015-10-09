/**
 * Created on 09.10.2015.
 */
define(['c/Observable'], function () {
    function ObservableComputedDomainCore(ctx) {
        var self = this,
            uid = 0;

        this.log = '';
        this.addUid = false;


        function makeLogger(key) {
            return function (uid) {
                console.log(key);
                self.log += key;

                if (self.addUid)
                    self.log += uid;
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
            var constructor = ctx.create('observableConstructor', ++uid);
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
