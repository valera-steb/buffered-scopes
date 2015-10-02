/**
 * Created on 29.09.2015.
 */
define(['c/Observable'], function (Observable) {
    describe('Computet/Observable', function () {
        var o, iDomain;

        beforeEach(function () {
            iDomain = {};
            o = new Observable(iDomain);
        });

        it('должен отдавать значение по умолчанию', function () {
            expect(o()).toBeUndefined();
        });

        it('должен отдавать предустановленно значение (при его наличии)', function () {
            var t = 'test';
            o = new Observable(iDomain, t);

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

        it('должен оповещать домен о считывании данных', function(){

        });
    });
});
