/**
 * Created by steb on 10.10.15.
 */
define(['require_for_di-lite'], function (CtxProvider) {
    describe('Computed/CorePrototype - сценарии использования', function () {
        var d, proto;

        beforeEach(function (done) {
            function receiveCtx(ctx) {
                proto = ctx.get('computedDomainCore');
                d = {}, proto.buildInterface(d);
                done();
            }

            (new CtxProvider)
                .buildCtx(['fixtures/domainCorePrototype'],
                receiveCtx);
        });

        it('изменение observable в подписке на самого себя (ошибка от PubSub и остаётся предыдушее значение)', function () {
            var
                o = d.makeObservable(),
                t1 = 't1', t2='t2';

            o.subscribe(function(){
                o(t2);
            });
            o(t1);

            expect(o()).toBe(t1);
        });

        it('изменение observable в подписке на самого себя (subscribeAfter) - так-же: ' +
            'ошибка от PubSub и остаётся предыдушее значение', function () {
            var
                o = d.makeObservable(),
                t1 = 't1', t2='t2';

            o.subscribeAfter(function(){
                o(t2);
            });
            o(t1);

            expect(o()).toBe(t1);
        });

        it('проблема полуоповещённости')
    });
});