/**
 * Created on 29.09.2015.
 */
define(['require_for_di-lite', 'c/Domain', 'c/Observable'], function (CtxProvider, Domain, Observable) {
    describe('Computed/Domain', function () {
        var d,
            domain;

        beforeEach(function (done) {
            //d = new Domain();

            (new CtxProvider())
                .buildCtx(['c/Domain'], function (ctx) {
                    ctx.get('ComputedDomain')
                        .ready.then(function (d) {
                            domain = d;
                            done();
                        })
                });
        });


        it('должен создавать observable', function () {
            //var o = d.makeObservable();
            console.log(domain);

            expect(o).toBeDefined();
            //expect(d.subscribe).toBeDefined();
        });

        xit('должен создавать computed');


        describe('при создании', function () {
            xit('computed должен запоминать список использованных в нём observable');

            xit('при создении computed должен запоминать список использованных в нём computed');
        });


        describe('при изменении', function () {
            xit('дочернего observable пересчитать computed');

            xit('дочернего computed пересчитать данный computed');
        });


        describe('циклические зависимости', function () {
            xit('observable 1->2, 2->1 - связанные по subscribe');

            xit('computed 1->2 2->1');

            xit('computed 1->2 2->3 3->1');

            xit('computed 1->2 observable 2->3 computed 3->1, цикл через 1->2 по subscribe');
        })
    });
});
