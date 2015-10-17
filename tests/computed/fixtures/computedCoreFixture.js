/**
 * Created by steb on 10.10.15.
 */
define(['c/Computed'], function(){
    var f = function(){};

    function ComputedCoreFixture(p){
        var self = this;

        this.forComputed ={
            enter: {
                calculation: f,
                getValue: f, // нужен для оповещения других о том что этот прослушивается
                init: f // нужен для отслеживания зависимостей создаваемого
            },
            exit: {
                calculation: f,
                init: f
            }
        };

        this.itemsList = [];
        this.makeComputed = function(f){
            var constructor = p.ctx.create('computedConstructor', self.itemsList);
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
