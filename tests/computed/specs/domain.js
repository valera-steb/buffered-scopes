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


        xit('должен создавать observable', function () {
            //var o = d.makeObservable();
            console.log(domain);

            expect(o).toBeDefined();
            //expect(d.subscribe).toBeDefined();
        });

        xit('должен создавать computed (функция расчёта значения обязательна)');


        describe('при создании', function () {
            xit('должен присваивать уникальный ид объекту observable');

            xit('должен присваивать уникальный ид объекту computed');

        });


        describe('при создании computed', function(){
            xit('должен строить список использованных в нём observable');

            xit('должен строить список использованных в нём computed');

            xit('элементы списка должны быть уникальны (для с1: c2, o2): c1(c2, o2), c2(o1, o2)');

            xit('можно создать другой computed (при этом первый будет зависить ' +
                'от второго, но не от элементов второго, если они не используються напрямую)');

            xit('можно создать observable. Если не запрашивать его значение, ' +
                'то от него не будет зависить создаваемый compute');
        });


        describe('циклические зависимости', function () {
            xit('observable 1->2, 2->1 - связанные по subscribe');

            xit('computed 1->2 2->1');

            xit('computed 1->2 2->3 3->1');

            xit('computed 1->2 observable 2->3 computed 3->1, цикл через 1->2 по subscribe');
        })
    });
});
