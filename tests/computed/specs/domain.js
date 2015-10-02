/**
 * Created on 29.09.2015.
 */
define(['c/Domain', 'c/Observable'], function (Domain, Observable) {
    describe('Computed/Domain', function () {
        var d;

        beforeEach(function(){
            d = new Domain();
        });


        xit('должен создавать observable', function(){
            var o = d.makeObservable();

            expect(o).toBeDefined();
            expect(d.subscribe).toBeDefined();
        });
    });
});
