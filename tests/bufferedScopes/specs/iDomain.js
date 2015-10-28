/**
 * Created by steb on 17.10.15.
 */
describe('bufferedScopes - сценарии использования', function () {
    var bsDomain, CtxProvider;

    beforeAll(function (done) {
        require(['require_for_di-lite'], function (_CtxProvider) {
            CtxProvider = _CtxProvider;
            done();
        });
    });

    describe('вводит', function () {

        beforeEach(function (done) {
            (new CtxProvider())
                .buildCtx(['bs/IDomain'], function (ctx) {
                    bsDomain = ctx.get('BufferedScopes');
                    done();
                });
        });


        xit('свой computed');

        xit('свой observable');

        xit('свою оббёртку над функцией - для интерфейсов');

        it('scope', function () {
            var s = bsDomain.buildScope(); // type | function ?
        });
    });


    describe('должен уметь разпознать', function () {

        xit('свои введённые объекты');

        xit('чьему скоупу принадлежит объект');
    });


    describe('должен "хитро" оборачивать передаваемые параметры', function () {

        xit('если они приходят через computed');

        xit('если они приходят через observable');

        xit('если они приходят через оббёрнутую функцию');

        xit('если их устанавливают из скоупа своего');

        xit('если их устанавливают из скоупа чужого');

        xit('если их устанавливают не из скоупа');
    });


    describe('при вызове/переходе_к_исполнению скоупа', function () {

        xit('должен в начале дёрнуть функцию фиксированую (при наличии), со списком устанавливаемых значений');

        xit('должен вызвать набор изменённых функций - если не отменили');
    });


    describe('при вызове интерфейсной функции', function () {

        xit('если в обработке скоупа - запомнить, поставить в очередь');

        xit('если извне и force action - запомнить и тут-же запустить выполнение');

        xit('если извне без force action - запомнить и вернуть каллбэк на запуск действия');

        xit('если в своём скоупе, свою интерфейсную фнукцию - пропустить прямой вызов обернув его');
    });


    describe('результаты вызовов из внешнего скоупа оборачиваються', function () {

        xit('для observable');

        xit('для computed');

        xit('интерфейсной функции: коллбэк на старт либо ничего не возвращает');
    });


    describe('примеры', function () {
        it('загружать тип со скоупом', function (done) {
            (new CtxProvider())
                .buildCtx(['demo/typeWithScope'], function (ctx) {
                    bsDomain = ctx.get('typeWithScope');
                    done();
                });
        });
    })
});