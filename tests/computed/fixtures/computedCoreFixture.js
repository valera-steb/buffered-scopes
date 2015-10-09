/**
 * Created by steb on 10.10.15.
 */
define(['c/Computed'], function(){
    var f = function(){};

    function ComputedCoreFixture(ctx){
        var self = this;

        this.forComputed ={
            enter: {
                calculation: f,
                getValue: f,
                setValue: f
            },
            exit: {
                calculation: f,
                setValue: f
            }
        };

        this.itemsList = [];
        this.makeComputed = function(f){
            var constructor = ctx.create('computedConstructor', self.itemsList);
            return constructor.getComputed(f);
        }
    }

    return {
        name: 'computedDomainCore',
        c: ComputedCoreFixture,
        subTypes: arguments,
        getScope: true
    }
});
