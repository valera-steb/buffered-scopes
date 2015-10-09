/**
 * Created on 29.09.2015.
 */
define(['c/Observable'], function (Observable) {
    describe('Computet/Observable', function () {
        var o, iDomain;

        beforeEach(function (done) {

            function receiveDomain(ctx) {
                iDomain = ctx.get('computedDomainCore');
                o = iDomain.makeObservable();
                done();
            }

            require(['require_for_di-lite'], function (Provider) {
                (new Provider).buildCtx(
                    ['fixtures/observableComputedDomainCore'],
                    receiveDomain
                );
            });
        });


        it('должен отдавать значение по умолчанию (undefined)', function () {
            expect(o()).toBeUndefined();
        });


        it('должен отдавать предустановленно значение (при его наличии)', function () {
            var t = 'test';
            o = iDomain.makeObservable(t);

            expect(o()).toBe(t);
        });

        it('должен устанавливать новое значение', function () {
            var t = 'test';

            o(t);
            expect(o()).toBe(t);

            o(null);
            expect(o()).toBe(null);

            o(undefined);
            expect(o()).toBe(undefined);
        });

        it('должен оповещать подписанных о новом значении', function () {
            var t = 'test',
                t2;

            o.subscribe(function (v) {
                t2 = v;
            });

            o(t);

            expect(t2).toBe(t);
        });

        it('должен оповещать домен о считывании данных', function () {
            expect(iDomain.log).toBe('');

            o();

            expect(iDomain.log).toBe('+g');
        });

        it('должен оповещать домен о записи данных (до и после оповещения зависимостей)', function(){
            expect(iDomain.log).toBe('');

            o(10);

            expect(iDomain.log).toBe('+s-s');
        })
    });
});
