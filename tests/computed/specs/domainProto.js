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
                t1 = 't1', t2 = 't2';

            o.subscribe(function () {
                o(t2);
            });
            o(t1);

            expect(proto.log).toBe('+os+os-os');
            expect(o()).toBe(t1);
        });

        it('изменение observable в подписке на самого себя (subscribeAfter) - так-же: ' +
            'ошибка от PubSub и остаётся предыдушее значение', function () {
            var
                o = d.makeObservable(),
                t1 = 't1', t2 = 't2';

            o.subscribeAfter(function () {
                o(t2);
            });
            o(t1);

            expect(proto.log).toBe('+os+os-os');
            expect(o()).toBe(t1);
        });

        it('проблема полуоповещённости - если один из обработчиков недопустимые действия запустит')


        it('в подписке на observable запрещёно менять значение любых observable', function () {
            var
                t1 = 't1', t2 = 't2', t3 = 't3', t4 = 't4',
                o1 = d.makeObservable(t1),
                o2 = d.makeObservable(t2);
            proto.addUid = true;

            o1.subscribe(function () {
                o2(t4);
            });
            o1(t3);

            expect(proto.log).toBe('+os1+os2-os1');
            expect(o1()).toBe(t3);
            expect(o2()).toBe(t2);
        });

        it('создание computed - core должен выстроить список зависимых', function(){
            var
                t1 = 't1', t2 = 't2', t3 = 't3', t4 = 't4',
                o1 = d.makeObservable(t1),
                o2 = d.makeObservable(t2);
            proto.addUid = true;

            var c1 = d.makeComputed(function(){
               return o1() + o2();
            });

            expect(proto.log).toBe('+cb3+og1f+og2f-cb3');
            expect(c1()).toBe(t1+t2);
        });

        xit('в функции computed-a, запрещёно менть значение observable');

        xit('в функции computed-a, запрещёно создавать computed');


        describe('computed', function(){
            var t, c1, o1, o2;

            beforeEach(function(){
                t = ['t0', 't1', 't2', 't3', 't4', 't5'];
                o1 = d.makeObservable(t[1]);
                o2 = d.makeObservable(t[2]);
                c1 = d.makeComputed(function(){
                    return o1() + o2();
                });
            });

            it('должен пересчитывать себя при изменении внутреннего observable', function(){
                expect(c1()).toBe(t[1]+t[2]);

                o1(t[0]);
                expect(c1()).toBe(t[0]+t[2]);

                o2(t[3]);
                expect(c1()).toBe(t[0]+t[3]);
            });

            it('должен пересчитывать себя при изменении внутреннего computed', function(){
                var c2 = d.makeComputed(function(){
                    return c1() + o2();
                });
                expect(c2()).toBe(t[1]+t[2]+t[2]);

                o1(t[0]);
                expect(c2()).toBe(t[0]+t[2]+t[2]);

                o2(t[3]);
                expect(c2()).toBe(t[0]+t[3]+t[3]);
            });

            it('в подписке на computed запрещёно менять значение любых observable', function(){

            });
        })
    });
});