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
            setLocker: {
                settingTo: null,

                enter: function (id) {
                    if (m.setLocker.settingTo != null)
                        throw new Error('cycle in set value ' + id);
                    if (m.tracker.building != null)
                        throw new Error('Нельзя устанавливать значение в computed function');

                    m.setLocker.settingTo = id;
                },
                exit: function (id) {
                    if (m.setLocker.settingTo != id)
                        throw new Error('setLocker error: enter to ' + m.setLocker.id + ', exit from ' + id);

                    m.setLocker.settingTo = null;
                }
            },

            tracker: {
                building: null,
                dependencies: {},

                start: function (id) {
                    if (m.tracker.building)
                        throw new Error('can`t build computed inside computed function');

                    m.tracker.building = id;
                    m.tracker.dependencies = {};
                },

                trackGet: function (id, subscribe) {
                    if (m.tracker.building == null)
                        return;

                    m.tracker.dependencies[id] = subscribe;
                },

                end: function (id) {
                    if (m.tracker.building != id)
                        throw new Error('Попытка закончить построение другого computed');

                    m.tracker.building = null;
                    return m.utils.toArray(m.tracker.dependencies);
                }
            },

            utils: {
                toArray: function (obj) {
                    var arr = [];

                    for (var i in obj)
                        arr.push(obj[i]);

                    return arr;
                }
            }
        };


        this.buildInterface = function (outer) {
            outer['makeObservable'] = function (value) {
                var constructor = ctx.create('observableConstructor', ++uid);
                return constructor.getObservable(value);
            };

            outer['makeComputed'] = function (f) {
                var constructor = ctx.create('computedConstructor', ++uid);
                return constructor.getComputed(f);
            };
        };


        this.forObservable = {
            enter: {
                getValue: function (id, subscribe) {
                    utils.addLog(id, subscribe, self, '+og');
                    m.tracker.trackGet(id, subscribe);
                },
                setValue: function (id) {
                    utils.addLog(id, undefined, self, '+os');
                    m.setLocker.enter(id);
                }
            },
            exit: {
                setValue: function (id) {
                    utils.addLog(id, undefined, self, '-os');
                    m.setLocker.exit(id);
                }
            }
        };

        this.forComputed = {
            enter: {
                build: function (id) {
                    utils.addLog(id, undefined, self, '+cb');
                    m.tracker.start(id);
                },
                getValue: function (id, subscribe) {
                    utils.addLog(id, subscribe, self, '+cg');
                    m.tracker.trackGet(id, subscribe);
                },
                calculation: f
            },
            exit: {
                build: function (id) {
                    utils.addLog(id, undefined, self, '-cb');
                    return m.tracker.end(id);
                },
                calculation: f
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
