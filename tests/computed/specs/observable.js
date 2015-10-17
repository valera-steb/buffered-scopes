/**
 * Created on 29.09.2015.
 */
define(['c/Observable'], function (Observable) {
    describe('Computed/Observable', function () {
        var o, iDomain;

        beforeEach(function (done) {

            function receiveDomain(ctx) {
                iDomain = ctx.get('IDomain');
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

        it('должен оповещать подписанных о новом значении (new, old), до изменения', function () {
            var
                t1 = 't1', t2 = 't2', called;
            o(t1);

            o.subscribe(function(n, old){
                expect(n).toBe(t2);
                expect(old).toBe(t1);
                expect(o()).toBe(t1);
                called = true;
            });
            o(t2);

            expect(called).toBeTruthy();
        });

        it('должен оповешать после изменения значения (new, old)', function(){
            var
                t1 = 't1', t2 = 't2', called;
            o(t1);

            o.subscribeAfter(function(n, old){
                expect(n).toBe(t2);
                expect(old).toBe(t1);
                expect(o()).toBe(t2);
                called = true;
            });
            o(t2);

            expect(called).toBeTruthy();
        });

        it('при оповещении домена, должен передавать свой uid и при чтении функцию subscribeAfter', function () {
            iDomain.addUid = true;
            expect(iDomain.log).toBe('');

            o();
            var o2 = iDomain.makeObservable();
            o2(10);
            o(1);
            o2();

            expect(iDomain.log).toBe('+g1f+s2-s2+s1-s1+g2f');
        });

        it('должен оповещать домен о считывании данных', function () {
            expect(iDomain.log).toBe('');

            o();

            expect(iDomain.log).toBe('+g');
        });

        it('должен оповещать домен о записи данных (до и после оповещения зависимостей)', function () {
            expect(iDomain.log).toBe('');

            o(10);

            expect(iDomain.log).toBe('+s-s');
        });

        xit('должен позволять отписываться произвольному слушателю');

        xit('должен позволять отписывать всех слушателей');
    });
});
