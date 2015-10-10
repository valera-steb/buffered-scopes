/**
 * Created by steb on 10.10.15.
 */
define(['c/Observable', 'c/Computed'], function () {
    var utils = {
        addLog: function (uid, f, self, key) {
            console.log(key);
            self.log += key;

            if (!self.addUid)
                return;

            self.log += uid;
            if (f)
                self.log += 'f';
        },
        makeLogger: function (self, key) {
            return function (uid, f) {
                utils.addLog(uid, f, self, key);
            }
        }

    };

    function SetLocker() {
        var items = new Set();


        this.enter = function (id) {
            if (items.has(id))
                throw new Error('cycle dependence for element ' + id);

            items.add(id);
        };
        this.exit = function (id) {
            items.delete(id);
        };
        this.clean = function () {
            items = new Set();
        };
    }

    function ComputedDomainCore(ctx) {
        var f = function () {
            },
            uid = 0, self = this;

        this.log = '';
        this.addUid = false;


        var m = {
            setLocker: new SetLocker(),
            afterNotifyLocker: new SetLocker()
        };


        this.buildInterface = function (outer) {
            outer['makeObservable'] = function (value) {
                var constructor = ctx.create('observableConstructor', ++uid);
                return constructor.getObservable(value);
            };

            outer['makeComputed'] = function (f) {
                var constructor = ctx.create('computedConstructor', self.itemsList);
                return constructor.getComputed(f);
            };
        };


        this.forObservable = {
            enter: {
                getValue: utils.makeLogger(self, '+og'),
                setValue: function (id) {
                    utils.addLog(id, undefined, self, '+os');
                    m.setLocker.enter(id);
                }
            },
            exit: {
                getValue: utils.makeLogger(self, '-og'),
                setValue: function (id) {
                    utils.addLog(id, undefined, self, '-os');
                    m.setLocker.exit(id);
                }
            }
        };

        this.forComputed = {
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
