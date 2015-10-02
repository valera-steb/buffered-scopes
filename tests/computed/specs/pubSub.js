/**
 * Created on 17.09.2015.
 */
define(['c/PubSub'], function (PubSub) {
    describe('Computed/PubSub', function () {

        var subs;

        beforeEach(function () {
            subs = new PubSub;
        });


        it('должен передавать сообщения', function () {
            var test;

            subs.subscribe(function (data) {
                test = data;
            });
            subs.notify('test');


            expect(test).toBe('test');
        });

        it('должен отписываться', function () {
            var test;

            var u = subs.subscribe(function (data) {
                test = data;
            });
            u();
            subs.notify('test');


            expect(test).toBeUndefined();
        });

        it('должен уметь очищать всех слушателей', function () {
            var test;

            subs.subscribe(function (data) {
                test = data;
            });

            subs.clear();

            subs.notify('test');
            expect(test).toBeUndefined();
        });

        it('должен отписывать корректно (только вызванных)', function () {
            var test = [];

            function h(data) {
                test.push(data);
            }
            subs.subscribe(h);
            var u = subs.subscribe(h);
            subs.subscribe(h);

            u();

            subs.notify('test');


            expect(test.length).toBe(2);
        });

        xit('должен перехватывать исключение в обработчиках')
    });
});