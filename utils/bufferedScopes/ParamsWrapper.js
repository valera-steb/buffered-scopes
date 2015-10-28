/**
 * Created on 27.10.2015.
 */
define([], function(){
    function ParamsWrapper(){
        this.dependencies = "core=IDomain";


        this.wrapInterface = function(outer, scope){

        };
    }

    return {
        'name': 'ParamsWrapper',
        'c': ParamsWrapper,
        'strategy': di.strategy.singleton
    }
});
