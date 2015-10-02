/**
 * Created on 29.09.2015.
 */
define(['./Observable'], function(Observable){
    return function Domain(){
        var toObservable = {

        };

        return {
            'makeObservable' : function(value){
                return new Observable(toObservable, value);
            },
            'makeComputed': function(f){

            }
        }
    };
});
