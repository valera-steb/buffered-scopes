/**
 * Created on 28.08.2015.
 */

function Locker(iScope) {
    var value;

    return {
        setV: function (v) {
            value = v;
            iScope.onSet();
        },
        getV: function () {
            return value;
        }
    };
}

function Scope(mainFunction) {

    var local = {
        state: 'waiting',
        q: null
    };

    function start() {
        if (local.q)
            return;

        local.q = Q();
        local.q.then(execute);
    }

    function execute() {
        local.state = 'calculating';
        local.q = null;


        try {
            mainFunction();
        }
        catch (e) {
            console.error(e);
            local.state = 'waiting';
        }
    };


    return {
        getLocker: function () {
            return Locker({onSet: start});
        }
    }
}

(function () {
    function getRes() {
        return document.getElementById('res');
    }

    var
        s = Scope(calculate),
        x1 = s.getLocker(),
        x2 = s.getLocker(),
        sym = s.getLocker();


    window.onX1 = x1.setV;
    window.onX2 = x2.setV;
    window.onSym = sym.setV;

    function getValues() {
        return _.filter([x1.getV(), sym.getV(), x2.getV()], function (x) {
            return x && x !== '';
        });
    }


    function calculate() {

        var v = getValues();
        if (v.length < 3)
            return;

        getRes().textContent = v[0] + v[1];
    }
})();
