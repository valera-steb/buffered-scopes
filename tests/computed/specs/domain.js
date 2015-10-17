/**
 * Created on 29.09.2015.
 */
define(['require_for_di-lite'], function (CtxProvider) {
    describe('Computed/IDomain', function () {
        var domain;

        beforeEach(function (done) {
            (new CtxProvider())
                .buildCtx(['c/IDomain'], function (ctx) {
                    domain = ctx.get('ComputedDomain');
                    done();
                });
        });

        xdescribe('примечание', function () {
            it('версия 0.x');
            it('даёт минимум - максимально ограничивая функцию в compute');

            describe('уточнить', function () {
            });
        });

        it('должен создавать observable', function () {
            var o = domain.makeObservable();
            console.log(domain);

            expect(o).toBeDefined();
            expect(o.subscribe).toBeDefined();
            expect(o.subscribeAfter).toBeDefined();
        });

        xit('должен создавать computed (функция расчёта значения обязательна)');


        xit('в подписке на observable запрещёно менять значение любых observable');

        xit('в подписке на computed запрещёно менять значение любых observable');


        describe('при создании', function () {
            xit('должен присваивать уникальный ид объекту observable');

            xit('должен присваивать уникальный ид объекту computed');

        });


        describe('при создании computed', function () {
            xit('должен строить список использованных в нём observable');

            xit('должен строить список использованных в нём computed');

            xit('элементы списка должны быть уникальны (для с1: c2, o2): c1(c2, o2), c2(o1, o2)');

            xit('нельзя создать другой computed');

            xit('можно создать observable. Если не запрашивать его значение, ' +
                'то от него не будет зависить создаваемый compute');

            xit('нельзя устанавливать значения других observable');
        });

    });
});
