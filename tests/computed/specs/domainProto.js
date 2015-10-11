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

        it('в подписке на observable запрещёно менять значение любых observable (прервёт выполнение обработчика)', function () {
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

        it('создание computed - core должен выстроить список зависимых', function () {
            var
                t1 = 't1', t2 = 't2', t3 = 't3', t4 = 't4',
                o1 = d.makeObservable(t1),
                o2 = d.makeObservable(t2);
            proto.addUid = true;

            var c1 = d.makeComputed(function () {
                return o1() + o2();
            });

            expect(proto.log).toBe('+cb3+og1f+og2f-cb3');
            expect(c1()).toBe(t1 + t2);
        });

        it('в функции computed-a, запрещено менять значение observable (прервёт пересчёт)', function () {
            var
                t = ['t0', 't1', 't2', 't3', 't4', 't5'],
                o1 = d.makeObservable(t[1]),
                o2 = d.makeObservable(t[2]);

            var c1 = d.makeComputed(function () {
                var key = o1();
                if (key == t[3])
                    o2(t[4]);
                return key;
            });
            proto.addUid = true;
            proto.log = '';

            o1(t[3]);

            expect(proto.log).toBe('+os1+og1f+os2-os1');
            expect(c1()).toBe(t[1]);
        });

        it('в функции computed-a, запрещено создавать computed (выкинет исключение)', function(){
            var
                t = ['t0', 't1', 't2'],
                c1, c2;
            proto.addUid = true;

            function test() {
                c1 = d.makeComputed(function () {
                    c2 = d.makeComputed(function () {
                        return t[2];
                    });
                    return t[1];
                });
            };

            expect(test).toThrow();
            expect(proto.log).toBe('+cb1+cb2');
        });


        describe('computed', function () {
            var t, c1, o1, o2;

            beforeEach(function () {
                t = ['t0', 't1', 't2', 't3', 't4', 't5'];
                o1 = d.makeObservable(t[1]);
                o2 = d.makeObservable(t[2]);
                c1 = d.makeComputed(function () {
                    return o1() + o2();
                });
            });

            it('должен пересчитывать себя при изменении внутреннего observable', function () {
                expect(c1()).toBe(t[1] + t[2]);

                o1(t[0]);
                expect(c1()).toBe(t[0] + t[2]);

                o2(t[3]);
                expect(c1()).toBe(t[0] + t[3]);
            });

            it('должен пересчитывать себя при изменении внутреннего computed', function () {
                var c2 = d.makeComputed(function () {
                    return c1() + o2();
                });
                expect(c2()).toBe(t[1] + t[2] + t[2]);

                o1(t[0]);
                expect(c2()).toBe(t[0] + t[2] + t[2]);

                o2(t[3]);
                expect(c2()).toBe(t[0] + t[3] + t[3]);
            });

            it('в подписке на computed запрещёно менять значение любых observable', function () {
                proto.addUid = true;
                proto.log = '';
                c1.subscribe(function (v) {
                    o1(t[0]);
                });

                o2(t[3]);

                expect(proto.log).toBe('+os2+og1f+og2f+os1-os2');
                expect(o1()).toBe(t[1]);
                expect(c1()).toBe(t[1] + t[3]);
            });
        });


        describe('после изменения', function(){

        });
    });
});