/**
 * Created on 29.09.2015.
 */
define(['./PubSub'], function (PubSub) {

    return function (iDomain, value) {

        var subs = new PubSub();


        function setValue(newValue) {
            subs.notify(newValue);
            value = newValue;
        }

        function getValue() {
            return value;
        }


        function Observable() {
            if (arguments.length > 0)
                setValue(arguments[0]);
            else
                return getValue();
        };

        Observable['subscribe'] = function (handler) {
            return subs.subscribe(function(newValue){
                handler(newValue, value);
            });
        };

        Observable['clear'] = subs.clear;

        return Observable;
    };
});