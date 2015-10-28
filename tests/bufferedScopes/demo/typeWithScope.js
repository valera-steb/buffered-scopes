/**
 * Created on 27.10.2015.
 */
define(['bs/wrapper'], function(Wrapper){

    function TypeWithScope() {
        this.buildInterface = function (outer, scope) {
            console.log(arguments);
        }
    }

    return new Wrapper('typeWithScope', {
        name: 'ITypeWithScope',
        c:TypeWithScope,
        strategy: di.strategy.proto
    });
});
