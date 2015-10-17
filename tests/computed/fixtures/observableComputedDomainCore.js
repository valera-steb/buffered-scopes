/**
 * Created on 09.10.2015.
 */
define(['c/Observable'], function () {
    function ObservableComputedDomainCore(p) {
        var self = this,
            uid = 0;

        this.log = '';
        this.addUid = false;


        function makeLogger(key) {
            return function (uid, f) {
                console.log(key);
                self.log += key;

                if (!self.addUid)
                    return;

                self.log += uid;
                if (f)
                    self.log += 'f';
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
            var constructor = p.ctx.create('observableConstructor', ++uid);
            return constructor.getObservable(value);
        };
    }

    return {
        name: 'IDomain',
        c: ObservableComputedDomainCore,
        subTypes: arguments,
        getScope: true
    }
});
