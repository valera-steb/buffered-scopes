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

    function ComputedDomainCore(p) {
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

            finalizer: {
                isInFinalization: false,
                completions: [],
                executed: [],
                cycleNumber: 0,
                maxCycle: 10,

                complete: function () {
                    if (m.finalizer.isInFinalization)
                        return;

                    if (m.finalizer.completions.length == 0)
                        return;

                    console.info('start finalization ', m.finalizer.completions.length);
                    m.finalizer.isInFinalization = true;

                    while (m.finalizer.completions.length > 0) {
                        console.info('enter finalizer ', m.finalizer.completions.length);
                        m.finalizer.enterNext();

                        try {
                            var f = m.finalizer.completions.splice(0, 1)[0];
                            f();
                            m.finalizer.executed.push(f.toString());
                        }
                        catch (e) {
                            console.error('error in finalizer', e);
                        }
                    }

                    console.info('done finalization ', m.finalizer.executed);

                    m.finalizer.cycleNumber = 0;
                    m.finalizer.isInFinalization = false;
                    m.finalizer.executed = [];
                },

                enterNext: function () {
                    if (m.finalizer.cycleNumber >= m.finalizer.maxCycle)
                        throw new Error('Слишком много продолжений ',
                            m.finalizer.executed,
                            m.finalizer.completions);

                    m.finalizer.cycleNumber++;
                },

                then: function (f) {
                    if (m.tracker.building == null
                        && m.setLocker.settingTo == null)
                        throw new Error('Нельзя создавать продолжения вне действия');

                    m.finalizer.completions.push(f);
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
                var constructor = p.ctx.create('observableConstructor', ++uid);
                return constructor.getObservable(value);
            };

            outer['makeComputed'] = function (f) {
                var constructor = p.ctx.create('computedConstructor', ++uid);
                return constructor.getComputed(f);
            };

            outer['afterActiveChanges'] = m.finalizer.then;
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
                    m.finalizer.complete();
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
            },
            finalizeBuild: m.finalizer.complete
        };
    }

    return {
        name: 'computedDomainCore',
        c: ComputedDomainCore,
        subTypes: arguments,
        getScope: true
    }
});
