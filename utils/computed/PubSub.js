/**
 * Created on 17.09.2015.
 */
define([], function () {
    return function PubSub() {
        var
            container = [];


        function buildDisposer(key) {
            return function () {
                container.splice(key, 1);
            };
        }

        function tryNotify(handler, data) {
            try {
                handler(data);
            }
            catch (e) {
                console.error(e);
            }
        }


        return {
            'subscribe': function (listener) {
                var key = container.length;

                container.push(listener);

                return buildDisposer(key);
            },

            'notify': function (data) {
                for (var i in container) {
                    tryNotify(container[i], data);
                }
            },
            'clear':function(){
                container = [];
            }
        }
    }
});