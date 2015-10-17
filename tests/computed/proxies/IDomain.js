/**
 * Created by steb on 17.10.15.
 */
define([], function () {
    function IDomainProxy(p) {
        var self = this;

        this.log = '';
        this.addUid = false;

        function addLog(uid, f, key) {
            console.log(key);
            self.log += key;

            if (!self.addUid)
                return;

            self.log += uid;
            if (f)
                self.log += 'f';
        }

        this.buildInterface = function (outer) {
            p.parent.buildInterface(outer);

            outer.log = function (x) {
                if (x=='')
                    self.log = '';
                return self.log;
            };

            outer.addUid = function (x) {
                self.addUid = x;
            }
        };

        this.forObservable = {
            enter: {
                getValue: function (id, subscribe) {
                    addLog(id, subscribe, '+og');
                    p.parent.forObservable.enter.getValue(id, subscribe);
                },
                setValue: function (id) {
                    addLog(id, undefined, '+os');
                    p.parent.forObservable.enter.setValue(id);
                }
            },
            exit: {
                setValue: function (id) {
                    addLog(id, undefined, '-os');
                    p.parent.forObservable.exit.setValue(id);
                }
            }
        };

        this.forComputed = {
            enter: {
                build: function (id) {
                    addLog(id, undefined, '+cb');
                    p.parent.forComputed.enter.build(id);
                },
                getValue: function (id, subscribe) {
                    addLog(id, subscribe, '+cg');
                    p.parent.forComputed.enter.getValue(id, subscribe);
                }
            },
            exit: {
                build: function (id) {
                    addLog(id, undefined, '-cb');
                    return p.parent.forComputed.exit.build(id);
                }
            },
            finalizeBuild: function () {
                addLog('', undefined, '+fb')
                p.parent.forComputed.finalizeBuild();
            }
        };

    }

    return {
        name: 'IDomainProxy',
        c: IDomainProxy,
        parent: 'IDomain'
    }
});
